document.addEventListener("DOMContentLoaded", function () {
    initMap();
    initRevealAnimations();
});

function initMap() {
    var mapElement = document.getElementById("map");
    if (!mapElement || typeof L === "undefined") {
        return;
    }

    var map = L.map("map").setView([38.18, 22.2], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
    }).addTo(map);

    var stations = [
        {
            name: "Diakopto",
            coords: [38.192, 22.201],
            text: "Start of the Odontotos Railway",
        },
        {
            name: "Niamata",
            coords: [38.191, 22.262],
            text: "Small stop inside the gorge",
        },
        {
            name: "Zachlorou",
            coords: [38.083, 22.207],
            text: "Mountain village and railway stop",
        },
        {
            name: "Kalavryta",
            coords: [37.972, 22.111],
            text: "End of the route",
        },
    ];

    var trainIcon = L.icon({
        iconUrl: "assets/icons/train-icon.png",
        iconSize: [32, 32],
    });

    stations.forEach(function (station) {
        L.marker(station.coords, { icon: trainIcon })
            .addTo(map)
            .bindPopup("<b>" + station.name + "</b><br>" + station.text);
    });

    var route = [
        [38.192, 22.201],
        [38.191, 22.262],
        [38.083, 22.207],
        [37.972, 22.111],
    ];

    var line = L.polyline(route, {
        color: "#9e3b2c",
        weight: 4,
    }).addTo(map);

    map.fitBounds(line.getBounds(), { padding: [20, 20] });
}

function initRevealAnimations() {
    var revealElements = document.querySelectorAll("section, .card, .timeline-item, footer");

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
}
