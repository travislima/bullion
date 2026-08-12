/* Bullion MDS — shared behaviour */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Scroll-reveal (respects prefers-reduced-motion via CSS)
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Forms: progressive enhancement.
  // Until a form backend / CRM endpoint is connected, submissions open the
  // visitor's mail client pre-filled with their message so no lead is lost.
  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var lines = [];
      form.querySelectorAll("input, select, textarea").forEach(function (f) {
        if (f.name && f.value) {
          lines.push(f.getAttribute("data-label") + ": " + f.value);
        }
      });
      var subject = form.getAttribute("data-subject") || "Website enquiry";
      var href =
        "mailto:" +
        form.getAttribute("data-mailto") +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      window.location.href = href;
      if (status) {
        status.textContent =
          "Your email app should open now with your enquiry pre-filled. If it doesn't, email us directly at " +
          form.getAttribute("data-mailto") +
          ".";
        status.className = "form-status ok";
      }
    });
  });

  // Current year in footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
