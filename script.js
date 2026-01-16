// Helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Footer year
$("#year").textContent = new Date().getFullYear();

// Mobile nav
const navToggle = $("#navToggle");
const navList = $("#navList");

navToggle?.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close nav on click (mobile)
$$("[data-nav]").forEach((a) => {
  a.addEventListener("click", () => {
    navList.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// Active link on scroll
const sections = ["home", "about", "services", "team", "contact"].map((id) => $("#" + id)).filter(Boolean);
const navLinks = Array.from($$("[data-nav]"));

const setActive = () => {
  const y = window.scrollY + 110; // offset for header
  let currentId = "home";

  for (const s of sections) {
    if (s.offsetTop <= y) currentId = s.id;
  }

  navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${currentId}`));
};

window.addEventListener("scroll", setActive);
setActive();

// Scroll reveal
const revealSelectors = [
  ".hero-title",
  ".hero-sub",
  ".hero-actions",
  ".circle-frame",
  ".section-title",
  ".section-lead",
  ".activity",
  ".activity-text h3",
  ".activity-text p",
  ".contact-copy",
  ".contact-form",
//   ".footer-brand",
//   ".footer-meta",
];

const revealEls = Array.from(document.querySelectorAll(revealSelectors.join(",")));
revealEls.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Language dropdown (UI only - placeholder)
const langBtn = $("#langBtn");
const langMenu = $("#langMenu");

langBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  langMenu.classList.toggle("is-open");
});

document.addEventListener("click", () => {
  langMenu.classList.remove("is-open");
});

$$(".lang-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang || "fr";
    langBtn.textContent = lang.toUpperCase() + " ▼";
    langMenu.classList.remove("is-open");
    // Ovde možeš kasnije: preusmeravanje na /de/ ili swap teksta iz JSON fajla
  });
});

// Contact form (mailto)
const contactForm = $("#contactForm");
const formNote = $("#formNote");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const message = $("#message").value.trim();

  const to = "info@fibreone.ch"; // <-- promeni na pravi email
  const subject = encodeURIComponent("Demande de contact — Fibre One");
  const body = encodeURIComponent(
    `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
  );

  // Mailto redirect
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  // UX note
  formNote.textContent = "Ouverture de votre client e-mail… Si rien ne se passe, vérifiez votre configuration.";
});
