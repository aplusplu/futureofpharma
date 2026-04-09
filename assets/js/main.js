// Menu toggle (mobile)
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.getElementById("main-nav");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav.style.display = expanded ? "none" : "flex";
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Slider logic
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let idx = 0;

function applyBackgroundFromSlide(i) {
  const s = slides[i];
  if (!s || !slider) return;
  const hero = s.style.getPropertyValue("--hero");
  if (hero) slider.style.setProperty("--hero", hero);
  slider.classList.remove("dir-right", "dir-left", "dir-up");
  if (s.classList.contains("kb-pan-left")) slider.classList.add("dir-left");
  else if (s.classList.contains("kb-pan-up")) slider.classList.add("dir-up");
  else slider.classList.add("dir-right");
}

function show(i) {
  idx = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle("is-active", n === idx));
  applyBackgroundFromSlide(idx);
}

function next() {
  show(idx + 1);
}
function prev() {
  show(idx - 1);
}

if (slides.length) {
  show(0);
  nextBtn?.addEventListener("click", next);
  prevBtn?.addEventListener("click", prev);
  setInterval(next, 6000);
}
