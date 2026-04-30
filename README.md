# De Voetwinkel Eindhoven — Website Redesign

Static HTML redesign of [devoetwinkel.nl](https://www.devoetwinkel.nl), a specialist in comfort shoes, pedicure and podology in Eindhoven, the Netherlands.

**Live preview:** https://julian08100.github.io/devoetwinkel-redesign/

---

## Overview

A full redesign of the existing WordPress site as a self-contained static website — no build tools, no dependencies, no CMS. Every page loads instantly and the entire site can be deployed anywhere that serves HTML files.

## Structure

```
/
├── index.html                  # Homepage
├── merken.html                 # Brand overview
├── wandelschoenen.html         # Walking shoes
├── sokken.html                 # Socks
├── voetverzorging.html         # Foot care / pedicure
├── podoloog.html               # Podology
├── gratis-voetscandag.html     # Free foot scan day
├── tarieven.html               # Pricing
├── openingstijden.html         # Opening hours
├── route.html                  # Route & contact
├── historie.html               # History
├── vacatures.html              # Vacancies
├── privacy-policy.html         # Privacy policy
├── [brand].html                # 22 individual brand pages
├── style.css                   # Global stylesheet
├── main.js                     # Nav, mobile menu, animations, cookie banner
└── images/                     # Self-hosted copies of all media assets
```

## Tech

- **Pure HTML/CSS/JS** — no framework, no build step
- **Google Tag Manager** — GTM-PNNGPJ2
- **Google Fonts** — Playfair Display + Inter
- **Hosting** — GitHub Pages (push to `main` = live)

## Running locally

Open any `.html` file directly in a browser, or serve the folder with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deployment

The site deploys automatically via GitHub Pages on every push to `main`. No CI configuration needed.

All images are self-hosted under `images/` — the site has no runtime dependency on the original WordPress installation.
