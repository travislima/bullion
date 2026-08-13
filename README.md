# Bullion — Planned For Life

Website for **Bullion**, a financial planning practice authorised by Sanlam (Sanlam Blue Star, Eastern Cape). Built to the approved handover package (`BULLION_HANDOVER.md`): brand board, homepage mockup, and verbatim approved copy.

Preview: https://travislima.github.io/bullion/ · Production domain **TBC** (candidates: `bwealth.co.za`, `bullionwealth.co.za`; redirects from `bullionmds.co.za` at launch).

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage — built to the approved mockup (hero, who we are, 7 services, why Bullion, philosophy, guided CTA, contact) |
| `about.html` | Practice story, "Sanlam is our FSP" trust explainer, awards, team placeholders |
| `advisers.html` | Adviser grid by office/speciality, vCard downloads, "what to expect" |
| `adviser-profile.html` | **Template** — duplicate per adviser (noindex until real profiles exist) |
| `services.html` | 7 personal services with anchors, business assurance, client rewards |
| `join.html` | Advisor recruitment + sub-franchise proposition, enquiry form |
| `tools.html` | Interactive SA income tax calculator, Sanlam tool links, campaign QR codes |
| `insights/` | Index + **4 draft articles** (one complete, three outlined) + monthly commentary template |
| `contact.html` | Guided CTA, meeting form, offices (PE + Humansdorp), map |
| `privacy.html` | POPIA privacy policy (draft — compliance review before launch) |
| `go/campus/` | Sample QR/campaign landing page (`/go/<campaign>/` pattern, noindex) |
| `partner.html` | Redirect stub → `join.html` (old URL) |

## Editing the site

- **Contact details / domain / WhatsApp number** — edit **`assets/js/config.js`** only. Every page reads from it (all current values are placeholders per handover §7.3).
- **Copy & translations** — English lives inline in the HTML (the source of truth); Afrikaans and isiXhosa live in `assets/i18n/strings.js`. Both translations are **drafts pending a native-speaker proofread** — the site shows a notice while a draft language is active. Any key without a translation falls back to English automatically. A fourth language is one more object in that file.
- **Publish an Insights article** — duplicate `insights/market-commentary-sample.html`, replace the bracketed placeholders, remove the `noindex` meta and the yellow "Sample" flag, then add a card to `insights/index.html`.
- **New campaign landing** — duplicate the `go/campus/` folder as `go/<campaign>/` and point the QR code at it.
- **Client login** — the header links to Sanlam's client servicing portal (`sanlamonline.co.za`). Confirm this is the correct destination for Bullion clients before launch.

## Design direction — light & editorial ("that Woolworths feel")

The site uses a **light, white-dominant editorial treatment**: generous whitespace, hairline rules instead of boxed cards, black buttons, and Signal Blue demoted to fine accents, small marks and links. A single dark section (the planning philosophy) and the footer provide contrast.

**This deviates from the approved mockup**, which was dark-themed throughout. The change follows the client's own north star in the handover — *"clean, premium, personal… that Woolworths feel"* — and their later direction for "simple, elegant, premium". Brand colours, logo lockup and approved copy are unchanged.

**Show this to the client (and include it in the Sanlam submission) so the direction is signed off explicitly**, since the mockup on file no longer matches the build. If they prefer the dark mockup, the palette is token-driven — reverting is a change to `:root` and the section classes, not a rebuild.

## ⚠️ Launch blocker: verify the tax tables

`assets/js/tax-tables.js` holds the SARS brackets, rebates and thresholds that drive the calculator on `tools.html`. **They were entered from knowledge and have not been checked against a live SARS publication.** Until someone verifies them the page shows a visible "Not yet verified" banner.

To clear it: open [SARS → Rates of Tax for Individuals](https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/), confirm every figure for the current tax year, then set `verified: true` and `verifiedOn` in that file. Repeat after each February Budget.

The calculator covers the standard tables, age rebates, tax thresholds and the retirement-fund deduction (27.5%, capped at R350 000). It deliberately does *not* model medical tax credits, travel allowances or fringe benefits — that scope is stated in the on-page disclaimer.

## Before launch — open items (from handover §7)

1. **Sanlam brand sign-off** — the logo lockup is an isolated `<img>` in header/footer; easy to swap if Brand Managers require changes. `assets/img/bullion-logo-dark.png` is a derived dark-context variant (white wordmark) generated from the supplied transparent lockup; replace with the official dark asset when vector files arrive.
2. **Domain** — set in `config.js`, regenerate `sitemap.xml`/`robots.txt` URLs, add canonicals + redirects from bullionmds.co.za.
3. **Real contact details** — `config.js` (phone, email, WhatsApp number, office addresses).
4. **Proofread the Afrikaans and isiXhosa** — `assets/i18n/strings.js`. Draft translations of the approved English copy; financial terminology especially needs a native-speaker check. Remove each language's `lang.notice` string once signed off.
5. **Photography** — the shoot is the single biggest visual upgrade outstanding. Every image slot currently holds an on-brand SVG placeholder in `assets/img/place/`, sized to the final crop, so the layout reads correctly. Replace like-for-like:

   | Placeholder | Slot | Suggested subject | Crop |
   |---|---|---|---|
   | `hero.svg` | Homepage hero | Adviser with a client, or the team | portrait ~4:5 |
   | `family.svg` | Homepage band, Protect pillar | Family / lifestyle | landscape 3:2 |
   | `business.svg` | Homepage band, Grow pillar | Business owner or workplace | landscape 3:2 |
   | `legacy.svg` | Homepage band, Legacy pillar | Generational / handover | landscape 3:2 |
   | `office.svg` | About | Gqeberha or Humansdorp office | landscape 3:2 |
   | `article-*.svg` | Insights headers | Editorial / contextual | landscape 8:5 |
   | adviser photos | `advisers.html`, profiles | Individual portraits, consistent lighting | portrait 4:5 |

   **No stock photography** (client requirement) and — equally important — **no imagery lifted from competitor sites**, which would be a copyright problem on a public URL and an awkward look in the Sanlam submission.
6. **Sanlam tool URLs** — the Sanlam toolkit row on `tools.html` currently links to the sanlam.co.za root; confirm the exact tool URLs (retirement calculator, risk assessment, financial check, online will).
7. **Form backend** — forms currently use a `mailto:` handoff with a required POPIA consent checkbox (consent + timestamp included in the message). Point them at a form endpoint/CRM before launch (see `data-lead` handler in `assets/js/main.js`). No form data ever appears in URLs.
8. **Approve the draft copy.** Written in the brand voice as a working mockup, all pending client sign-off:
   - `join.html` recruitment copy and the three values
   - `go/campus/` campaign copy
   - `advisers.html` / `adviser-profile.html` — adviser bio, "how I work", facts panel
   - `services.html` business assurance section and the three pillar headings
   - `insights/how-much-to-retire.html` — a complete draft article
   - `insights/buy-and-sell.html`, `life-cover-calculator.html`, `tax-deadline.html` — openings written, remaining sections outlined in square brackets for the team to finish
   - `advisers.html` "what to expect" copy
   - `services.html` client rewards section — **also confirm the current Sanlam rewards programme name and what clients actually qualify for** before this goes live
   Once approved, these strings need Afrikaans and isiXhosa translations adding to `assets/i18n/strings.js` (structure/nav strings are already translated).
9. **Self-host Poppins** — currently loaded from Google Fonts; download the three weights (300/400/500) and serve locally for performance/privacy.
10. **Analytics** — add a cookieless analytics tool (e.g. Plausible/GoatCounter) with form-conversion events.
11. **Decide the platform.** The 2026 brief specifies WordPress/WooCommerce; this build is static HTML/CSS/JS. See "Platform note" below.
12. **Confirm the tagline wording.** The brief writes "**Ensure** today, plan for tomorrow…"; the approved brand board and CI document both say "**Insure** Today". The build follows the brand board — confirm which is intended before print/collateral goes out.
13. **Button contrast note for review** — white text on Signal Blue `#29ABE2` follows the approved mockup but sits below WCAG AA contrast for small text; worth raising during Sanlam brand review.

## Stack

Plain HTML + CSS + vanilla JS — no build step, hostable anywhere. Deploys to GitHub Pages automatically on push to `main` (`.github/workflows/deploy-pages.yml`).

- `assets/css/style.css` — design system per the brand board (Bullion Black `#0B0B0D`, Signal Blue `#29ABE2`, Sky Tint `#78CDF4`, Slate, Paper, Poppins), applied in a light editorial treatment
- `assets/js/config.js` — single source of truth for contact details/domain
- `assets/i18n/strings.js` — AF + XH dictionaries (EN inline; further languages addable)
- `assets/js/tax-tables.js` — SARS figures for the calculator (**verify yearly**)
- `assets/js/tools.js` + `assets/vendor/qrcode.min.js` — tax calculator and campaign QR codes
- `assets/js/main.js` — config injection, language toggle, nav, reveal, guided CTAs, POPIA forms, WhatsApp
- Accessibility: semantic HTML, skip links, labelled forms, visible focus, `prefers-reduced-motion`, responsive to 360px

## History

The repo previously carried a rebuild of the old bullionmds.co.za ("Bullion MDS") site; see `AUDIT.md` for that before/after audit. The current site supersedes it per the client handover — "MDS" is dropped and the practice's approved brand ("Planned For Life") applies.


## Platform note — static vs WordPress

The 2026 design brief specifies WordPress/WooCommerce. This build is static HTML/CSS/vanilla JS, which is why it loads fast, costs almost nothing to host, and has no plugin attack surface. Nothing here is wasted if the client wants WordPress: the design system, copy, translations and the tax calculator are all portable.

Three honest options:

1. **Ship static, keep the CMS for Insights only.** Fastest and cheapest. Monthly commentary is published by duplicating a file, or by pointing the Insights section at a lightweight headless CMS. Best if "scalability" mainly means publishing articles.
2. **Port to a WordPress theme.** The markup and CSS become a custom theme; the calculator and i18n drop in as-is. Adds hosting cost, updates and security maintenance — and WooCommerce is only warranted if the practice will actually sell something online.
3. **Static now, WordPress later.** Launch this for the urgent phase, port once Sanlam sign-off and the domain are settled.

Worth a conversation with the client rather than a silent decision — the brief's underlying goals (scalability, non-technical publishing, future CRM integration) are all achievable either way.
