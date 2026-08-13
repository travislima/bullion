/* ============================================================
   SARS personal income tax tables — SINGLE SOURCE OF TRUTH
   ============================================================
   ⚠️  VERIFY BEFORE LAUNCH, AND EVERY YEAR AFTER THE BUDGET.

   These figures were entered from knowledge and have NOT been
   confirmed against a live SARS publication. For a financial
   services practice, publishing an out-of-date bracket is a real
   compliance and reputational risk — so the calculator shows an
   "unverified" banner on the page until `verified` is set to true
   below.

   To update each year:
     1. Open sars.gov.za → Tax Rates → Rates of Tax for Individuals
     2. Replace `taxYear`, `brackets`, `rebates` and `thresholds`
     3. Set `verified: true` and `verifiedOn` to today's date
   ============================================================ */
window.BULLION_TAX = {
  taxYear: "2025/26",
  periodLabel: "1 March 2025 – 28 February 2026",

  // Set to true ONLY once checked against the SARS website.
  verified: false,
  verifiedOn: null,

  source: "https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/",

  // base = tax payable on income up to `from`; rate applies above `from`
  brackets: [
    { from: 0,       to: 237100,  base: 0,      rate: 0.18 },
    { from: 237100,  to: 370500,  base: 42678,  rate: 0.26 },
    { from: 370500,  to: 512800,  base: 77362,  rate: 0.31 },
    { from: 512800,  to: 673000,  base: 121475, rate: 0.36 },
    { from: 673000,  to: 857900,  base: 179147, rate: 0.39 },
    { from: 857900,  to: 1817000, base: 251258, rate: 0.41 },
    { from: 1817000, to: Infinity, base: 644489, rate: 0.45 }
  ],

  // Age-based rebates (cumulative: 65+ gets primary + secondary, etc.)
  rebates: { primary: 17235, secondary: 9444, tertiary: 3145 },

  // Tax thresholds — income below this pays no tax
  thresholds: { under65: 95750, age65to74: 148217, age75plus: 165689 }
};
