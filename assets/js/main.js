/* Bullion — shared behaviour (config injection, i18n, nav, forms, WhatsApp) */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var CFG = window.BULLION_CONFIG || {};
  var I18N = window.BULLION_I18N || { en: {} };

  /* ---------- Config injection (single source of truth) ---------- */
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    if (CFG[key] == null) return;
    el.textContent = CFG[key];
  });
  document.querySelectorAll("[data-config-href]").forEach(function (el) {
    var kind = el.getAttribute("data-config-href");
    if (kind === "tel") el.href = "tel:" + CFG.phoneHref;
    if (kind === "mailto") el.href = "mailto:" + CFG.email;
    if (kind === "whatsapp") el.href = "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(CFG.whatsappMessage || "");
  });

  /* ---------- Language toggle (EN/AF/XH, persistent, EN fallback) ----------
     English lives inline in the HTML (source of truth). On first pass we
     cache it, so switching back to EN — or hitting an untranslated key —
     always restores the original text. */
  var LANG_TAGS = { en: "en-ZA", af: "af-ZA", xh: "xh-ZA" };
  var enCache = new Map();
  function currentLang() {
    try {
      var l = localStorage.getItem("bullion-lang") || "en";
      return LANG_TAGS[l] ? l : "en";
    } catch (e) { return "en"; }
  }
  function applyLang(lang) {
    document.documentElement.lang = LANG_TAGS[lang] || "en-ZA";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!enCache.has(el)) enCache.set(el, el.textContent);
      var v = (I18N[lang] || {})[key];
      el.textContent = v != null ? v : enCache.get(el);
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    var notice = document.querySelector(".lang-notice");
    if (notice) {
      var msg = lang !== "en" ? (I18N[lang] || {})["lang.notice"] : null;
      notice.textContent = msg || "";
      notice.style.display = msg ? "block" : "none";
    }
  }
  document.querySelectorAll(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () {
      var lang = b.getAttribute("data-lang");
      try { localStorage.setItem("bullion-lang", lang); } catch (e) { /* private mode */ }
      applyLang(lang);
    });
  });
  applyLang(currentLang());

  /* ---------- Mobile navigation (hamburger on mobile ONLY) ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Scroll reveal (respects prefers-reduced-motion via CSS) ---------- */
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Guided CTA ("the site speaks back") ---------- */
  document.querySelectorAll(".guided-cta").forEach(function (root) {
    var choices = root.querySelectorAll(".guided-choice");
    var panels = root.querySelectorAll(".guided-panel");
    choices.forEach(function (c) {
      c.addEventListener("click", function () {
        var target = c.getAttribute("data-panel");
        choices.forEach(function (x) { x.setAttribute("aria-expanded", x === c ? "true" : "false"); });
        panels.forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== target; });
      });
    });
  });

  /* ---------- Forms: POPIA consent + mailto handoff (v1, no backend yet) ---------- */
  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var consent = form.querySelector("input[name='popia-consent']");
      if (consent && !consent.checked) {
        if (status) { status.textContent = "Please tick the consent box so we may contact you (POPIA)."; status.className = "form-status err"; }
        return;
      }
      var lines = [];
      form.querySelectorAll("input, select, textarea").forEach(function (f) {
        if (f.type === "checkbox") { if (f.name && f.checked) lines.push(f.getAttribute("data-label") + ": yes (" + new Date().toISOString() + ")"); return; }
        if (f.name && f.value) lines.push(f.getAttribute("data-label") + ": " + f.value);
      });
      var subject = form.getAttribute("data-subject") || "Website enquiry";
      window.location.href = "mailto:" + CFG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
      if (status) {
        status.textContent = "Your email app should open with your enquiry pre-filled. If it doesn't, email us at " + CFG.email + ".";
        status.className = "form-status ok";
      }
    });
  });

  /* ---------- vCard "Save details" (team cards) ---------- */
  document.querySelectorAll(".btn-vcard").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-vcard-name") || "Bullion Advisor";
      var role = btn.getAttribute("data-vcard-role") || "Financial Adviser";
      var vcf = [
        "BEGIN:VCARD", "VERSION:3.0",
        "FN:" + name,
        "ORG:Bullion — authorised by Sanlam",
        "TITLE:" + role,
        "TEL;TYPE=WORK:" + (CFG.phoneHref || ""),
        "EMAIL;TYPE=WORK:" + (CFG.email || ""),
        "URL:https://" + (CFG.domain || ""),
        "END:VCARD"
      ].join("\r\n");
      var a = document.createElement("a");
      a.href = "data:text/vcard;charset=utf-8," + encodeURIComponent(vcf);
      a.download = name.replace(/\s+/g, "-").toLowerCase() + "-bullion.vcf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  });

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
