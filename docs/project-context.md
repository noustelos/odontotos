You are a senior frontend developer helping build a cinematic tourism landing page.

PROJECT
Odontotos Railway Landing Page
Location: Diakopto, Greece
Theme: Historic rack railway crossing the Vouraikos Gorge UNESCO Global Geopark.

SITE PHILOSOPHY
This is NOT a generic tourist website.
It is a cinematic storytelling landing page focused on the train journey through the gorge.

Design inspiration:
- National Geographic travel pages
- Apple storytelling pages
- minimal UI, large photography, cinematic atmosphere

TECH STACK
HTML
CSS
Vanilla JavaScript
Leaflet.js for map
No frameworks

FOLDER STRUCTURE

project
│
├── index.html
├── styles.css
├── map.js
│
├── assets
│   ├── video
│   │   └── hero-video.mp4
│   ├── images
│   └── icons
│
└── docs
    ├── design-system.md
    ├── wireframe.md
    └── project-context.md


DESIGN SYSTEM

Colors

Forest Green  #1F3D2B
River Blue    #2C6E8F
Stone Grey    #6B6E6A
Warm Sand     #E9E2D3
Train Red     #9E3B2C

Typography

Headlines: Playfair Display
Body: Inter
UI labels: Montserrat

Layout

max width: 1200px
text width: 720px

Spacing scale

XS 8px
S 16px
M 32px
L 64px
XL 120px


PAGE STRUCTURE

Hero
Experience section
UNESCO Gorge
Railway history timeline
Diakopto starting point
Interactive railway route map
Visitor info
Final CTA


HERO DESIGN REQUIREMENT

The hero must support a portrait cinematic video.

Video properties

aspect ratio: 9:16
duration: 21 seconds
resolution: 1080x1920
format: MP4 (H264)

The video plays silently, loops, and autoplays.

Hero layout:

Left side:
Title
Subtitle
CTA buttons

Right side:
Vertical video

Desktop layout

TEXT | VIDEO

Mobile layout

VIDEO
TEXT
CTA


VIDEO HTML REQUIREMENTS

Use HTML5 video (not YouTube iframe).

Attributes

autoplay
muted
loop
playsinline


Example structure

<section class="hero-split">

<div class="hero-text">
<h1>Odontotos Railway</h1>

<p>
Ride one of Europe's most scenic railways
through the Vouraikos Gorge UNESCO Geopark
</p>

<a class="button">Explore the Journey</a>
</div>

<div class="hero-video">

<video autoplay muted loop playsinline>
<source src="assets/video/hero-video.mp4" type="video/mp4">
</video>

</div>

</section>


INTERACTIVE MAP

Use Leaflet.js.

Stations

Diakopto
Niamata
Zachlorou
Kalavryta

The map should show

station markers
railway polyline route
popup info for each station


UX REQUIREMENTS

Large cinematic imagery
Minimal text
Smooth scroll animations
Cards with hover lift
Responsive layout


SEO REQUIREMENTS

Target keywords

Odontotos Railway
Vouraikos Gorge Train
Diakopto Kalavryta Railway
Rack Railway Greece


CODING RULES

Use semantic HTML
Keep CSS modular
Avoid unnecessary libraries
Code must be readable and commented


TASK

Improve the existing project and implement:

1. cinematic hero split layout
2. responsive video container
3. section layout system
4. Leaflet railway map
5. scroll reveal animations

Return clean, production-ready code.
