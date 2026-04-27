"use strict";

var fs = require("fs");
var path = require("path");
var http = require("http");
var https = require("https");

var root = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : process.cwd();
var pages = ["index.html", "privacy-policy.html"];
var strictExternal = process.env.LINK_CHECK_STRICT_EXTERNAL === "1";
var localMissing = [];
var anchorMissing = [];
var externalLinks = {};
var externalIgnoredHosts = {
  "fonts.googleapis.com": true,
  "fonts.gstatic.com": true
};

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Cannot read file:", filePath);
    process.exitCode = 1;
    return "";
  }
}

function extractIds(html) {
  var ids = {};
  var idRegex = /\sid\s*=\s*"([^"]+)"/g;
  var match;

  while ((match = idRegex.exec(html))) {
    ids[match[1]] = true;
  }

  return ids;
}

function extractLinks(html) {
  var links = [];
  var attrRegex = /\b(?:href|src)\s*=\s*"([^"]+)"/g;
  var match;

  while ((match = attrRegex.exec(html))) {
    links.push(match[1]);
  }

  return links;
}

function isExternal(link) {
  return /^https?:\/\//i.test(link);
}

function getHost(link) {
  try {
    return new URL(link).hostname;
  } catch (error) {
    return "";
  }
}

function isIgnored(link) {
  return /^mailto:|^tel:|^data:|^javascript:/i.test(link);
}

function normalizeLocal(link) {
  var clean = link.split("#")[0].split("?")[0];
  return clean;
}

function checkExternalLink(url, callback) {
  var client = /^https:/i.test(url) ? https : http;
  var req = client.request(url, { method: "HEAD", timeout: 8000 }, function (res) {
    var status = res.statusCode || 0;
    if (status >= 200 && status < 400) {
      callback(null, status);
      return;
    }

    var getReq = client.request(url, { method: "GET", timeout: 10000 }, function (getRes) {
      callback(null, getRes.statusCode || 0);
    });

    getReq.on("error", function (error) {
      callback(error, 0);
    });

    getReq.on("timeout", function () {
      getReq.abort();
      callback(new Error("timeout"), 0);
    });

    getReq.end();
  });

  req.on("error", function (error) {
    callback(error, 0);
  });

  req.on("timeout", function () {
    req.abort();
    callback(new Error("timeout"), 0);
  });

  req.end();
}

pages.forEach(function (page) {
  var pagePath = path.join(root, page);
  var html = readFileSafe(pagePath);
  if (!html) {
    return;
  }

  var ids = extractIds(html);
  var links = extractLinks(html);

  links.forEach(function (link) {
    if (!link || isIgnored(link)) {
      return;
    }

    if (link.charAt(0) === "#") {
      var anchorId = link.slice(1);
      if (anchorId && !ids[anchorId]) {
        anchorMissing.push(page + " -> " + link);
      }
      return;
    }

    if (isExternal(link)) {
      var host = getHost(link);
      if (externalIgnoredHosts[host]) {
        return;
      }
      externalLinks[link] = true;
      return;
    }

    var localPath = normalizeLocal(link);
    if (!localPath) {
      return;
    }

    var fullPath = path.resolve(root, localPath);
    if (!fs.existsSync(fullPath)) {
      localMissing.push(page + " -> " + link);
    }
  });
});

var urls = Object.keys(externalLinks);
var externalProblems = [];

function printAndExit() {
  if (localMissing.length) {
    console.error("Local missing links:");
    localMissing.forEach(function (item) {
      console.error(" -", item);
    });
  }

  if (anchorMissing.length) {
    console.error("Missing anchors:");
    anchorMissing.forEach(function (item) {
      console.error(" -", item);
    });
  }

  if (externalProblems.length) {
    console.error(strictExternal ? "External link issues:" : "External link warnings:");
    externalProblems.forEach(function (item) {
      console.error(" -", item.url + " (" + item.status + ")");
    });
  }

  if (!localMissing.length && !anchorMissing.length && !externalProblems.length) {
    console.log("Link check passed.");
    return;
  }

  if (localMissing.length || anchorMissing.length || (strictExternal && externalProblems.length)) {
    process.exitCode = 1;
  }
}

if (!urls.length) {
  printAndExit();
} else {
  var pending = urls.length;
  urls.forEach(function (url) {
    checkExternalLink(url, function (error, status) {
      if (error || status < 200 || status >= 400) {
        externalProblems.push({ url: url, status: status || "error" });
      }

      pending -= 1;
      if (pending === 0) {
        printAndExit();
      }
    });
  });
}
