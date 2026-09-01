// The About page's own script. It was an inline module until the pages took a
// Content-Security-Policy: an inline module needs either 'unsafe-inline' or a
// hash pinned to its bytes, and a file needs neither.
import { UI, LOCALES, detectLocale } from "../i18n.js?v=19";

let lang = detectLocale();

function render(version) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = UI[lang][el.dataset.i18n];
  });
  document.querySelector("#about-body").textContent =
    UI[lang].aboutBody.replace("{version}", version);
  document.querySelector("#about-how-body").textContent = UI[lang].aboutHowBody;
  document.querySelector("#theme-toggle").setAttribute("aria-label", UI[lang].themeLabel);
  document.querySelectorAll(".langs button").forEach((b) => {
    b.setAttribute("aria-current", String(b.dataset.lang === lang));
  });
}

fetch("../data/taxonomy.json?v=19").then((r) => r.json()).then((d) => {
  render(d.version);
  document.querySelectorAll(".langs button").forEach((b) => {
    b.addEventListener("click", () => {
      if (!LOCALES.includes(b.dataset.lang)) return;
      lang = b.dataset.lang;
      localStorage.setItem("wg7tf2-lang", lang);
      render(d.version);
    });
  });
});

document.querySelector("#theme-toggle").addEventListener("click", () => {
  const set = document.documentElement.dataset.theme;
  const cur = set === "light" || set === "dark"
    ? set
    : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("wg7tf2-theme", next);
});
