---
name: lighthouse-static-site-speed
description: 'Improve Lighthouse and PageSpeed performance for static websites. Use when diagnosing or fixing Speed Index, First Contentful Paint, Largest Contentful Paint, Cumulative Layout Shift, and Total Blocking Time, especially on HTML/CSS/vanilla JS landing pages with hero video, Google Fonts, Leaflet, large images, or motion-heavy UI.'
argument-hint: 'Paste the page, current metrics, device context, and any suspected bottlenecks.'
user-invocable: true
---

# Lighthouse Static Site Speed

## What This Skill Produces

This skill turns a raw Lighthouse or PageSpeed report into a focused optimization pass for a static site.

It is designed for projects like Odontotos that use plain HTML, CSS, and vanilla JavaScript with media-heavy storytelling sections. The workflow prioritizes root-cause fixes instead of generic score chasing.

## When to Use

- The user shares Lighthouse or PageSpeed metrics and asks to improve speed or performance.
- A static landing page has acceptable TBT but weaker Speed Index, FCP, or LCP.
- The page uses hero video, large photography, remote fonts, or below-the-fold third-party libraries.
- The goal is to improve perceived load without flattening the visual design.

## Inputs

Collect these before changing code:

- URL or local page entry point
- Current metrics: Speed Index, FCP, LCP, CLS, TBT
- Device context: mobile or desktop
- Build path or deployment path if a dist build exists
- Any known heavy assets: hero video, slideshow images, map libraries, font bundles

Example baseline for this repo:

- Speed Index: 2.2 s
- First Contentful Paint: 1.3 s
- Largest Contentful Paint: 1.6 s
- Cumulative Layout Shift: 0.008
- Total Blocking Time: 0 ms

Interpretation of that baseline:

- JavaScript blocking is already under control.
- Layout stability is already good.
- The first optimization wave should target earlier visual completeness and hero rendering.

## Procedure

1. Confirm the rendering path.

Inspect the above-the-fold experience and identify the likely LCP candidate. On static storytelling pages this is usually one of:

- the hero poster image
- the hero video container
- the main headline block
- a large first-section image

2. Classify the report by weakest metric.

Use this branching logic:

- If TBT is high, reduce synchronous JavaScript work first.
- If CLS is high, reserve space and stabilize media dimensions first.
- If FCP is slow but TBT is low, reduce render-blocking work and font cost.
- If LCP is slow, optimize the exact LCP element and any assets needed before it can paint.
- If Speed Index is the main lagging metric while other vitals are acceptable, prioritize perceived completeness: fewer competing above-the-fold assets, lighter fonts, fewer paint-heavy effects, and delayed below-the-fold work.

3. Audit above-the-fold network cost.

Check for these common causes:

- multiple font families or too many font weights
- eager loading of hero video on devices that do not need it immediately
- unnecessary preload of non-critical assets
- remote CSS or JS needed for below-the-fold sections, such as map libraries
- oversized poster or hero imagery

4. Apply the smallest high-impact fixes first.

Prefer this order:

- reduce font families and weights before redesigning layout
- optimize hero poster and LCP imagery before touching unrelated sections
- defer below-the-fold libraries and media initialization
- reduce expensive blur, filter, parallax, and fixed-position paint work on constrained devices
- only inline or split CSS if simpler asset and font fixes are not enough

5. Rebuild and verify.

Run the project build, check for broken layout or interaction regressions, and compare the new metrics against the baseline.

6. Report outcome in metric terms.

Summarize:

- which element was the LCP candidate
- which resources blocked earlier paint
- what changed in HTML, CSS, and JS
- which metric improved and which ones were intentionally left alone

## Metric-Specific Playbook

### When Speed Index is the main issue

Focus on how quickly the viewport feels complete.

Priorities:

- simplify above-the-fold font loading
- avoid loading autoplay video bytes before the initial composition is readable
- delay non-hero imagery and slideshow logic until visible
- reduce fixed overlays, backdrop blur, heavy box-shadows, and animated filters on first paint
- keep the hero readable from poster plus text before enhanced media starts

### When FCP is the main issue

Focus on what blocks the first visible pixels.

Priorities:

- trim remote font requests
- make sure the primary stylesheet is the only critical blocking stylesheet
- remove or defer any head resources not needed before first paint
- verify that the hero text can render with fallback fonts cleanly

### When LCP is the main issue

Focus on the exact largest painted element.

Priorities:

- preload only the true LCP image or poster
- compress or resize the LCP asset appropriately
- avoid delaying LCP behind JavaScript hydration or late source swaps
- ensure the LCP asset is not hidden behind effects that delay compositing

### When CLS is the main issue

Focus on reserved space and predictable layout.

Priorities:

- add width and height attributes or aspect-ratio
- reserve space for embeds, maps, and video skeletons
- avoid late font swaps that dramatically reflow headings

### When TBT is the main issue

Focus on long tasks and initialization order.

Priorities:

- move below-the-fold setup behind IntersectionObserver
- postpone non-critical DOM work until idle or user interaction
- split large startup handlers into smaller steps

## Odontotos-Specific Heuristics

For this repo, inspect these hotspots early:

- `index.html` font bundle size and number of families
- hero video loading strategy and poster behavior
- Leaflet CSS and JS loading for the route map
- slideshow and section initialization timing in `map.js`
- paint-heavy CSS such as fixed overlays, blur, filters, and animated decorative UI

Given the current baseline, prefer changes that improve Speed Index and perceived hero completeness without sacrificing CLS or introducing JavaScript work.

## Quality Bar

The task is complete when all of the following are true:

- the likely LCP element is explicitly identified
- at least one root-cause optimization is implemented, not just minification or score commentary
- no regression is introduced in CLS or interaction behavior
- lazy/deferred loading only affects below-the-fold or enhancement content
- the final report ties each code change to a metric hypothesis

## Default Recommendations for Similar Reports

If metrics look like this repo's baseline, start with:

1. Reduce Google Font families and weights.
2. Keep a lightweight hero poster as the primary first paint and make video enhancement conditional.
3. Defer Leaflet assets or map initialization until the route section approaches the viewport.
4. Trim first-paint CSS effects on fixed UI chrome for mobile or perf-safe contexts.

## Example Prompts

- Improve this static site's Lighthouse metrics: Speed Index 2.2 s, FCP 1.3 s, LCP 1.6 s, CLS 0.008, TBT 0 ms.
- Audit why perceived loading is slower than the other vitals on this landing page.
- Optimize the hero video, font loading, and map loading strategy without breaking the design.