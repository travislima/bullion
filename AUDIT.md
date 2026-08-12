# Bullion MDS — Website Audit: Before &amp; After

**Site:** [bullionmds.co.za](https://bullionmds.co.za/) · **Date:** August 2026 · **Scope:** Full recreation of the public website plus this audit.

---

## Executive summary

Bullion MDS's real business is high-value B2B recruitment: convincing **financial advisers**, **franchise entrepreneurs** and **FSPs** to partner with the company. The existing website is a thin three-page brochure (Home, About, Contact) that states the mission but never explains the offering, never addresses those three audiences separately, and gives visitors no structured way to raise their hand.

**The core problem the website should solve — and didn't — is converting qualified partnership interest into enquiries.** The rebuild keeps Bullion's authentic identity (the "Insurance to change South Africa" tagline, the generational-wealth mission, the real story and contact details) and rebuilds everything around that conversion job: a dedicated *Partner with us* page with an application form, three audience pathways from the homepage, a services page that finally says what Bullion does, and technical foundations (SEO, accessibility, performance) that were missing.

### Methodology note

This environment's network policy blocked direct loading of bullionmds.co.za, so the "before" assessment is based on the site's indexed content and metadata (page inventory, titles, headings, copy and contact details as captured by search indexes and third-party business listings). Findings below are limited to what that evidence supports; anything inferred rather than observed is marked as such. Re-running a live Lighthouse/PageSpeed test on the old site before switch-over is recommended to complete the record.

---

## Scorecard

| Dimension | Before | After | What changed |
|---|:---:|:---:|---|
| Positioning & messaging | 2/10 | 9/10 | Mission-only copy → clear value proposition, named audiences, problem-led narrative |
| Information architecture | 3/10 | 9/10 | 3 generic pages → 5 purposeful pages incl. Services and a dedicated conversion page |
| Conversion & lead capture | 1/10 | 8/10 | No structured path to enquire → application + enquiry forms, tel: links, CTAs on every page |
| Content depth | 2/10 | 9/10 | One paragraph of history → services, pathways, process steps, FAQ, values, story |
| SEO | 2/10 | 9/10 | Default title patterns, no per-page targeting → unique titles/descriptions, canonicals, Open Graph, JSON-LD schema, sitemap.xml, robots.txt |
| Accessibility | 3/10 | 9/10 | Unverified, no evidence of provisions → skip links, landmarks, labels, focus states, reduced-motion & no-JS support |
| Performance | 4/10 | 10/10 | WordPress-style stack (inferred) → static site, ~85 KB of code total, zero frameworks |
| Mobile experience | 4/10 | 9/10 | Unverified → responsive from 320px up, dedicated mobile navigation, tested at 390px |
| Trust & credibility | 3/10 | 7/10 | Mission statement only → full NAP details, hours, structured data, transparent process. (Remaining gap: FSP licence number and team photos — needs client input) |
| Brand & visual identity | 3/10 | 9/10 | Generic theme (inferred) → bespoke "bullion" identity: ink navy + gold, custom logo mark, consistent design system |

---

## Before: findings in detail

### 1. The business is invisible (critical)

The indexed site consists of **Home, About and Contact** only. Bullion MDS provides insurance products, technology and back-office administration to advisers and FSPs, and recruits franchise entrepreneurs — yet none of those offerings had a page, a heading, or a call to action. A visiting adviser or entrepreneur had no way to learn what partnering involves or what they would receive.

### 2. No conversion path (critical)

The only action available was the contact page, which listed four personal email addresses (debbie@, chantel@, genna@, jan@) and office hours. There was no application form, no segmentation by enquiry type, no guidance on who to contact for what, and no obvious next step for the site's most valuable visitor — a qualified adviser considering a move.

### 3. Mission without a message (high)

"Insurance to change South Africa" and "Imagine generational wealth… for everyone" are genuinely strong brand assets — but they were the *whole* pitch. The copy never connected the mission to what Bullion actually does for the person reading, or explained why an adviser's practice would grow faster inside Bullion than outside it.

### 4. SEO fundamentals missing (high)

Indexed titles follow default CMS patterns ("About – Bullion MDS", "Contact – Bullion MDS"), indicating no per-page SEO targeting. No evidence of structured data (LocalBusiness/FinancialService schema), meaning reduced eligibility for rich results and local search — significant for a business whose customers search terms like *"financial adviser franchise South Africa"* or *"back office administration for financial advisers"*. None of those phrases had a page to rank.

### 5. Technical foundations unverifiable but dated (medium)

The site appears to be a standard WordPress installation (inferred from title separators and URL structure). Typical risks of an unmaintained brochure WP site — plugin weight, slow first paint on mobile data, unpatched components — apply, though they could not be measured directly from this environment.

---

## After: what was built

### Positioning — lean into the real problem

The rebuild answers, above the fold, the question the old site never asked: *what does Bullion do and for whom?*

> "We give financial advisers and franchise entrepreneurs the insurance products, technology and back-office muscle to build practices that create generational wealth — for every South African family."

The homepage then names the pain directly — **"Great advisers spend too little time advising"** — and presents Bullion as the machinery that carries admin, compliance and infrastructure. The mission language the client already owns is kept and elevated in a dedicated section rather than being asked to do all the work.

### Information architecture — five pages with jobs

| Page | Job |
|---|---|
| **Home** | Hook each of the three audiences and route them |
| **About** | Story (admin services → distribution & franchise), mission, values — credibility |
| **What we do** | Six capabilities + dedicated FSP section — the missing "product" page |
| **Partner with us** | The conversion page: adviser pathway, franchise pathway, application form |
| **Contact** | Every channel, hours, enquiry form, LocalBusiness schema |

### Conversion — multiple raised hands

- **Application form** on the Partner page (name, contact, pathway, experience, free text) and an enquiry form on Contact. Forms use a `mailto:` handoff today — zero-infrastructure, no lead lost — and are one attribute away from a proper form endpoint when hosting is chosen.
- **Click-to-call** `tel:` links and office-hours context throughout.
- Every page ends in a CTA panel; the header carries a persistent **"Join Bullion"** button.
- Three audience pathway cards on the homepage route advisers, entrepreneurs and FSPs to tailored sections.

### SEO — from invisible to indexable

- Unique, keyword-conscious `<title>` and meta description per page; canonical URLs; Open Graph tags.
- **JSON-LD structured data**: `FinancialService` (with address, phone, hours, area served) on the homepage and `ContactPage` on Contact — eligibility for local rich results.
- `sitemap.xml` and `robots.txt`.
- Content now exists for the queries that matter: adviser partnership, financial services franchise, back-office administration, FSP distribution.

### Accessibility — built in, not bolted on

Skip-to-content links, semantic landmarks, labelled form fields with visible focus states, `aria-current` navigation, `aria-expanded` mobile menu, descriptive link text, `prefers-reduced-motion` support, and a no-JavaScript fallback so content is never hidden if scripts fail.

### Performance — nothing to slow down

Plain HTML/CSS/vanilla JS. The entire codebase is **~85 KB across all five pages** (before compression) plus two font families. No jQuery, no page builder, no framework. Hostable on any static host or existing cPanel.

### Brand — a bespoke identity

Ink-navy and bullion-gold palette, a custom stacked-gold-bars logo mark, serif display type (Fraunces) with Inter body text, and a consistent component system (cards, pathway tiles, steps, FAQ accordions) across every page.

---

## Recommendations / next steps (needs client input)

1. **FSP licence number** — display "An authorised financial services provider, FSP No. ___" in the footer. A compliance requirement and the single biggest remaining trust signal.
2. **Form backend** — connect the two forms to a form endpoint or CRM (5-minute change in `assets/js/main.js`) so leads are captured server-side rather than via the visitor's email app.
3. **Real photography** — team and office photos of the Gqeberha team would materially lift the About and Partner pages.
4. **Proof** — adviser testimonials or franchise case studies (with permission) on the Partner page; even one authentic story will outperform any copy.
5. **Analytics** — add a privacy-friendly analytics tool and track form submissions and tel: clicks as conversions.
6. **Google Business Profile** — ensure the listing matches the site's NAP details exactly to compound the new LocalBusiness schema.
7. **Baseline measurement** — run PageSpeed Insights against the old site before switch-over to complete the before/after record with hard numbers.
