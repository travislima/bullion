# Bullion — Planned For Life

Website for **Bullion**, a financial planning practice authorised by Sanlam (Sanlam Blue Star, Eastern Cape). Built to the approved handover package (`BULLION_HANDOVER.md`): brand board, homepage mockup, and verbatim approved copy.

Preview: https://travislima.github.io/bullion/ · Production domain **TBC** (candidates: `bwealth.co.za`, `bullionwealth.co.za`; redirects from `bullionmds.co.za` at launch).

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage — built to the approved mockup (hero, who we are, 7 services, why Bullion, philosophy, guided CTA, contact) |
| `about.html` | Practice story, "Sanlam is our FSP" trust explainer, awards, team placeholders |
| `services.html` | 7 services with anchors + Sanlam tools link-out row |
| `join.html` | Advisor recruitment + sub-franchise proposition, enquiry form |
| `insights/` | Blog index + sample article template (duplicate to publish) |
| `contact.html` | Guided CTA, meeting form, offices (PE + Humansdorp), map |
| `privacy.html` | POPIA privacy policy (draft — compliance review before launch) |
| `go/campus/` | Sample QR/campaign landing page (`/go/<campaign>/` pattern, noindex) |
| `partner.html` | Redirect stub → `join.html` (old URL) |

## Editing the site

- **Contact details / domain / WhatsApp number** — edit **`assets/js/config.js`** only. Every page reads from it (all current values are placeholders per handover §7.3).
- **Copy & translations** — UI strings live in `assets/i18n/strings.js`. Afrikaans entries are `null` (TODO-AF); paste translations in as they arrive and the language toggle picks them up. Until then AF falls back to EN with a notice.
- **Publish an Insights article** — duplicate `insights/market-commentary-sample.html`, replace the bracketed placeholders, remove the `noindex` meta and the yellow "Sample" flag, then add a card to `insights/index.html`.
- **New campaign landing** — duplicate the `go/campus/` folder as `go/<campaign>/` and point the QR code at it.

## Before launch — open items (from handover §7)

1. **Sanlam brand sign-off** — the logo lockup is an isolated `<img>` in header/footer; easy to swap if Brand Managers require changes. `assets/img/bullion-logo-dark.png` is a derived dark-context variant (white wordmark) generated from the supplied transparent lockup; replace with the official dark asset when vector files arrive.
2. **Domain** — set in `config.js`, regenerate `sitemap.xml`/`robots.txt` URLs, add canonicals + redirects from bullionmds.co.za.
3. **Real contact details** — `config.js` (phone, email, WhatsApp number, office addresses).
4. **Afrikaans copy** — `assets/i18n/strings.js`.
5. **Photography** — replace `.team-card` placeholders on About; no stock photography (client requirement).
6. **Sanlam tool URLs** — the Tools row on `services.html` currently links to sanlam.co.za root; confirm the exact tool URLs.
7. **Form backend** — forms currently use a `mailto:` handoff with a required POPIA consent checkbox (consent + timestamp included in the message). Point them at a form endpoint/CRM before launch (see `data-lead` handler in `assets/js/main.js`). No form data ever appears in URLs.
8. **Recruitment copy on `join.html` and `go/campus/`** — drafted in the brand voice per handover; **needs client approval**.
9. **Self-host Poppins** — currently loaded from Google Fonts; download the three weights (300/400/500) and serve locally for performance/privacy.
10. **Analytics** — add a cookieless analytics tool (e.g. Plausible/GoatCounter) with form-conversion events.
11. **Button contrast note for review** — white text on Signal Blue `#29ABE2` follows the approved mockup but sits below WCAG AA contrast for small text; worth raising during Sanlam brand review.

## Stack

Plain HTML + CSS + vanilla JS — no build step, hostable anywhere. Deploys to GitHub Pages automatically on push to `main` (`.github/workflows/deploy-pages.yml`).

- `assets/css/style.css` — design system per the brand board (Bullion Black `#0B0B0D`, Signal Blue `#29ABE2`, Sky Tint `#78CDF4`, Slate `#787E88`, Paper `#F4F5F7`, Poppins)
- `assets/js/config.js` — single source of truth for contact details/domain
- `assets/i18n/strings.js` — EN/AF dictionaries (i18n-ready, 3rd language addable)
- `assets/js/main.js` — config injection, language toggle, nav, reveal, guided CTAs, POPIA forms, WhatsApp
- Accessibility: semantic HTML, skip links, labelled forms, visible focus, `prefers-reduced-motion`, responsive to 360px

## History

The repo previously carried a rebuild of the old bullionmds.co.za ("Bullion MDS") site; see `AUDIT.md` for that before/after audit. The current site supersedes it per the client handover — "MDS" is dropped and the practice's approved brand ("Planned For Life") applies.
