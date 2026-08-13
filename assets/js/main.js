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

  /* ---------- Language toggle (EN/AF, persistent, EN fallback) ---------- */
  function currentLang() {
    try { return localStorage.getItem("bullion-lang") || "en"; } catch (e) { return "en"; }
  }
  function t(lang, key) {
    var dict = I18N[lang] || {};
    var v = dict[key];
    if (v == null) v = (I18N.en || {})[key];
    return v;
  }
  function applyLang(lang) {
    document.documentElement.lang = lang === "af" ? "af-ZA" : "en-ZA";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(lang, el.getAttribute("data-i18n"));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    var notice = document.querySelector(".lang-notice");
    if (notice) {
      notice.textContent = lang === "af" ? t("af", "lang.notice") : "";
      notice.style.display = lang === "af" ? "block" : "none";
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

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
