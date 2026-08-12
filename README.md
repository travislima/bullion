# Bullion MDS — Website Rebuild

A modern recreation of [bullionmds.co.za](https://bullionmds.co.za/) as a fast, dependency-free static site, plus a before/after audit (`AUDIT.md`).

**Bullion MDS** provides insurance products, supporting technology and back-office administration to financial advisers, franchise entrepreneurs and qualifying FSPs in South Africa. The rebuild leans into the site's core job: **converting advisers, entrepreneurs and FSPs into partnership enquiries.**

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Value proposition, the problem Bullion solves, three audience pathways, FAQ, conversion CTAs |
| `about.html` | Story (admin services → distribution & franchise), mission, values |
| `services.html` | Six core capabilities + dedicated FSP section |
| `partner.html` | Adviser & franchise pathways with an application form — the primary conversion page |
| `contact.html` | Full contact details, hours, enquiry form, LocalBusiness schema |

## Stack

Plain HTML + CSS + a small vanilla JS file. No build step, no frameworks — host it anywhere (any static host, cPanel, Netlify, GitHub Pages).

- `assets/css/style.css` — design system (ink navy + bullion gold + warm paper)
- `assets/js/main.js` — mobile nav, scroll-reveal, form handling, footer year
- SEO: unique titles/descriptions, canonical URLs, Open Graph, JSON-LD (`FinancialService` + `ContactPage`), `sitemap.xml`, `robots.txt`
- Accessibility: skip links, landmarks, focus styles, `prefers-reduced-motion` support, labelled forms

## Forms

Forms currently use a `mailto:` handoff (opens the visitor's email app pre-filled) so no lead is lost before a backend exists. To capture leads server-side, point the forms at a form endpoint (Formspree, Basin, or the host's PHP mail script) — see `assets/js/main.js`.

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Audit

See [`AUDIT.md`](AUDIT.md) for the full before/after audit and recommendations.
