# Design System – Cinematic Tourism

**Project example:** Odontotos Railway / Vouraikos Gorge

## Philosophy
Large photography, minimal UI, storytelling layout.

**Inspired by:**
- National Geographic
- Apple storytelling pages
- Travel documentaries

## Colors

### Palette
- **Primary (Forest)** `#1F3D2B`
- **River Blue** `#2C6E8F`
- **Stone Grey** `#6B6E6A`
- **Warm Sand** `#E9E2D3`
- **Train Red** `#9E3B2C`

### UI Colors
- **Text Dark** `#2B2B2B`
- **Text Light** `#FFFFFF`
- **Background** `#FFFFFF`
- **Section Background** `#F7F6F3`

### Color Usage
- Forest → headers / footer
- River → links
- Train Red → CTA buttons
- Sand → section backgrounds

## Typography

### Font Families
- **Headlines** Playfair Display
- **Body** Inter
- **Labels / UI** Montserrat

### Font Sizes
- **H1** 72px (hero titles)
- **H2** 44px (section titles)
- **H3** 26px (cards)
- **Body** 18px
- **Small text** 14px

### Line Height
- **Headings** 1.2
- **Body** 1.6

## 3. Layout System

### Max Content Width
1200px

### Text Width
720px

### Spacing Scale
- **XS** 8px
- **S** 16px
- **M** 32px
- **L** 64px
- **XL** 120px

### Section Padding
```css
padding: 100px 20px
```

## 4. Grid System

### Responsive Grid
- **Desktop:** 3 columns
- **Tablet:** 2 columns
- **Mobile:** 1 column

### Example Uses
- Experience cards
- Village highlights
- Museum info

## 5. Image Philosophy

Images are the main storytelling element.

### Rules
- Full width cinematic photos
- Large landscape images
- Minimal overlays
- No small thumbnails

### Hero Image
Train crossing the gorge

### Image Height
- **Hero** 90vh
- **Section images** 60–70vh

## 6. Components

### Buttons

#### Primary CTA
```css
background: Train Red (#9E3B2C)
color: white
padding: 14px 26px
border-radius: 4px
```

#### Hover
- Lift effect
- Shadow

### Cards

#### Used For
- Experience
- Stations
- Village highlights

#### Style
- Background white
- Soft shadow
- Rounded corners
- Hover lift

### Timeline

#### Used For
Railway history

#### Style
- Vertical line
- Year markers
- Short text

## 7. Animation System

Travel sites need subtle motion.

### Allowed Animations
- Fade up
- Parallax images
- Scroll reveal
- Map highlight

### Duration
600ms – 1s

### Avoid
- Bouncing
- Spinning
- Excessive motion

## 8. Map System

### Interactive Map Using
Leaflet.js

### Features
- Station markers
- Route line
- Train icons
- Station popups

### Stations
- Diakopto
- Niamata
- Zachlorou
- Kalavryta

## 9. Breakpoints

- **Mobile** 480px
- **Large Mobile** 576px
- **Tablet** 768px
- **Laptop** 1024px
- **Desktop** 1280px
- **Wide** 1440px

## 10. Section Structure

Landing page sections:

1. Hero
2. Experience
3. UNESCO Gorge
4. Railway History
5. Diakopto
6. Route Map
7. Visitor Info
8. Final CTA

## 11. UX Principles

### Rules
- Short text
- Large photos
- Clear navigation
- Storytelling scroll

### Goal
Visitor imagines the train journey

## 12. SEO Structure

### Main Keywords
- Odontotos Railway
- Vouraikos Gorge Train
- Diakopto Kalavryta Railway
- Rack Railway Greece
