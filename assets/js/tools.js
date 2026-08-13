/* Bullion — interactive tools (income tax calculator, QR codes) */
(function () {
  "use strict";

  var T = window.BULLION_TAX;
  var CFG = window.BULLION_CONFIG || {};

  /* ============================================================
     Income tax calculator
     ============================================================ */
  var form = document.getElementById("tax-form");
  if (form && T) {
    var out = document.getElementById("tax-result");

    // Surface the tax year everywhere it's referenced
    document.querySelectorAll("[data-tax-year]").forEach(function (el) { el.textContent = T.taxYear; });
    document.querySelectorAll("[data-tax-period]").forEach(function (el) { el.textContent = T.periodLabel; });

    // Unverified-figures banner (see tax-tables.js)
    var banner = document.getElementById("tax-unverified");
    if (banner && T.verified !== true) banner.hidden = false;

    var rand = function (n) {
      return "R" + Math.round(n).toLocaleString("en-ZA");
    };

    var rebateFor = function (age) {
      var r = T.rebates.primary;
      if (age >= 65) r += T.rebates.secondary;
      if (age >= 75) r += T.rebates.tertiary;
      return r;
    };

    var thresholdFor = function (age) {
      if (age >= 75) return T.thresholds.age75plus;
      if (age >= 65) return T.thresholds.age65to74;
      return T.thresholds.under65;
    };

    var calculate = function (annualIncome, age, raPercent) {
      // Retirement-fund contributions are deductible up to 27.5% of
      // remuneration, capped at R350 000 a year.
      var raContribution = annualIncome * (raPercent / 100);
      var maxDeduction = Math.min(annualIncome * 0.275, 350000);
      var deduction = Math.min(raContribution, maxDeduction);
      var taxable = Math.max(0, annualIncome - deduction);

      var bracket = T.brackets[0];
      for (var i = 0; i < T.brackets.length; i++) {
        if (taxable > T.brackets[i].from) bracket = T.brackets[i];
      }
      var grossTax = bracket.base + (taxable - bracket.from) * bracket.rate;
      var rebate = rebateFor(age);
      var netTax = Math.max(0, grossTax - rebate);

      // Below the threshold, no tax is payable at all
      if (taxable <= thresholdFor(age)) netTax = 0;

      return {
        taxable: taxable,
        deduction: deduction,
        maxDeduction: maxDeduction,
        netTax: netTax,
        monthly: netTax / 12,
        takeHome: annualIncome - deduction - netTax,
        marginal: bracket.rate,
        effective: annualIncome > 0 ? netTax / annualIncome : 0
      };
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var income = parseFloat(document.getElementById("tax-income").value) || 0;
      var period = document.getElementById("tax-period-input").value;
      var age = parseInt(document.getElementById("tax-age").value, 10) || 0;
      var ra = parseFloat(document.getElementById("tax-ra").value) || 0;

      var annual = period === "month" ? income * 12 : income;
      var r = calculate(annual, age, ra);

      document.getElementById("r-tax-year").textContent = T.taxYear;
      document.getElementById("r-annual").textContent = rand(annual);
      document.getElementById("r-deduction").textContent = rand(r.deduction);
      document.getElementById("r-taxable").textContent = rand(r.taxable);
      document.getElementById("r-tax").textContent = rand(r.netTax);
      document.getElementById("r-monthly").textContent = rand(r.monthly);
      document.getElementById("r-takehome").textContent = rand(r.takeHome);
      document.getElementById("r-marginal").textContent = Math.round(r.marginal * 100) + "%";
      document.getElementById("r-effective").textContent = (r.effective * 100).toFixed(1) + "%";

      // Contextual note — the advice hook, not just a number
      var note = document.getElementById("r-note");
      var headroom = r.maxDeduction - r.deduction;
      if (headroom > 1000 && annual > 0) {
        note.textContent =
          "You could contribute a further " + rand(headroom) +
          " to a retirement fund this tax year and still deduct it — which would reduce the tax you pay. An advisor can show you what that does to your long-term position.";
      } else if (annual > 0) {
        note.textContent =
          "You're already using your full retirement-fund deduction for the year. An advisor can look at what else is available to you.";
      } else {
        note.textContent = "";
      }

      out.hidden = false;
      out.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  /* ============================================================
     QR codes for campaign landing pages
     Rendered client-side from the live config, so the codes always
     point at the real domain once config.js is updated. Downloadable
     as PNG for print (posters, flyers, business cards).
     ============================================================ */
  document.querySelectorAll("[data-qr]").forEach(function (el) {
    var path = el.getAttribute("data-qr");
    var url = "https://" + (CFG.domain || "bullionwealth.co.za") + path;

    var label = el.querySelector("[data-qr-url]");
    if (label) label.textContent = url;

    var open = el.querySelector("[data-qr-open]");
    if (open) open.href = path;

    var canvas = el.querySelector("canvas");
    if (!canvas || typeof qrcode !== "function") return;

    var qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();

    var count = qr.getModuleCount();
    var quiet = 4;
    var scale = 8;
    var size = (count + quiet * 2) * scale;
    canvas.width = size;
    canvas.height = size;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#0b0b0d";
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillRect((c + quiet) * scale, (r + quiet) * scale, scale, scale);
        }
      }
    }

    var dl = el.querySelector("[data-qr-download]");
    if (dl) {
      dl.addEventListener("click", function () {
        var a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "bullion-qr" + path.replace(/\//g, "-").replace(/-+$/, "") + ".png";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
    }
  });
})();
