// UI strings for the taxonomy explorer. Taxonomy content (names, definitions,
// examples) lives in data/taxonomy.json with its own en/de/es fields.
// tests/i18n.test.mjs pins key parity across locales; keep all three in sync.

export const LOCALES = ["en", "de", "es"];

export const UI = {
  en: {
    eyebrow: "Barcelona Declaration · WG7 · Task Force 2",
    title: "ORI Stakeholders & Benefits Explorer",
    lede:
      "Who participates in Open Research Information, and what value it creates. " +
      "Eight benefit dimensions in three axes, reached by eleven stakeholder categories " +
      "through eight functional roles. Select any item to trace its connections.",
    colStakeholders: "Stakeholder categories",
    colRoles: "Functional roles",
    colBenefits: "Benefit dimensions",
    detailExamples: "Examples",
    detailRoles: "Typical roles",
    detailBenefits: "Primary benefits",
    detailStakeholders: "Who receives it",
    detailRolesDelivering: "Delivered through",
    detailAxis: "Axis",
    clearSelection: "Clear selection",
    hint: "Nothing selected. Click a stakeholder, role, or benefit to highlight its connections; click it again to clear.",
    share: "Copy link to this view",
    shared: "Link copied",
    aboutTitle: "About",
    aboutBody:
      "This explorer renders version {version} of the Taxonomy of ORI Stakeholders and Benefits, " +
      "a working document of Task Force 2 of Working Group 7 of the Barcelona Declaration on Open " +
      "Research Information. It runs entirely in your browser: nothing is tracked, nothing is sent anywhere.",
    footerLicense: "CC BY 4.0",
    footerSource: "Source",
    langLabel: "Language",
    themeLabel: "Theme",
    themeAuto: "Auto",
    themeLight: "Light",
    themeDark: "Dark",
  },
  de: {
    eyebrow: "Barcelona Declaration · WG7 · Task Force 2",
    title: "ORI-Stakeholder- & Nutzen-Explorer",
    lede:
      "Wer an Open Research Information teilnimmt und welchen Wert sie schafft. " +
      "Acht Nutzendimensionen in drei Achsen, erreicht von elf Stakeholder-Kategorien " +
      "über acht funktionale Rollen. Element auswählen, um seine Verbindungen zu verfolgen.",
    colStakeholders: "Stakeholder-Kategorien",
    colRoles: "Funktionale Rollen",
    colBenefits: "Nutzendimensionen",
    detailExamples: "Beispiele",
    detailRoles: "Typische Rollen",
    detailBenefits: "Primärer Nutzen",
    detailStakeholders: "Wer profitiert",
    detailRolesDelivering: "Vermittelt über",
    detailAxis: "Achse",
    clearSelection: "Auswahl aufheben",
    hint: "Nichts ausgewählt. Stakeholder, Rolle oder Nutzen anklicken, um Verbindungen hervorzuheben; erneut klicken zum Aufheben.",
    share: "Link zu dieser Ansicht kopieren",
    shared: "Link kopiert",
    aboutTitle: "Über",
    aboutBody:
      "Dieser Explorer zeigt Version {version} der Taxonomie der ORI-Stakeholder und -Nutzen, " +
      "ein Arbeitsdokument der Task Force 2 der Working Group 7 der Barcelona Declaration on Open " +
      "Research Information. Er läuft vollständig im Browser: nichts wird erfasst, nichts wird gesendet.",
    footerLicense: "CC BY 4.0",
    footerSource: "Quellcode",
    langLabel: "Sprache",
    themeLabel: "Design",
    themeAuto: "Auto",
    themeLight: "Hell",
    themeDark: "Dunkel",
  },
  es: {
    eyebrow: "Barcelona Declaration · WG7 · Task Force 2",
    title: "Explorador de stakeholders y beneficios de ORI",
    lede:
      "Quién participa en la información abierta sobre investigación y qué valor crea. " +
      "Ocho dimensiones de beneficio en tres ejes, alcanzadas por once categorías de stakeholders " +
      "a través de ocho roles funcionales. Selecciona un elemento para trazar sus conexiones.",
    colStakeholders: "Categorías de stakeholders",
    colRoles: "Roles funcionales",
    colBenefits: "Dimensiones de beneficio",
    detailExamples: "Ejemplos",
    detailRoles: "Roles típicos",
    detailBenefits: "Beneficios primarios",
    detailStakeholders: "Quién lo recibe",
    detailRolesDelivering: "Se entrega a través de",
    detailAxis: "Eje",
    clearSelection: "Limpiar selección",
    hint: "Nada seleccionado. Haz clic en un stakeholder, rol o beneficio para resaltar sus conexiones; clic de nuevo para limpiar.",
    share: "Copiar enlace a esta vista",
    shared: "Enlace copiado",
    aboutTitle: "Acerca de",
    aboutBody:
      "Este explorador muestra la versión {version} de la Taxonomía de stakeholders y beneficios de ORI, " +
      "un documento de trabajo del Task Force 2 del Working Group 7 de la Barcelona Declaration on Open " +
      "Research Information. Funciona por completo en tu navegador: no se rastrea ni se envía nada.",
    footerLicense: "CC BY 4.0",
    footerSource: "Código fuente",
    langLabel: "Idioma",
    themeLabel: "Tema",
    themeAuto: "Auto",
    themeLight: "Claro",
    themeDark: "Oscuro",
  },
};

export function detectLocale() {
  const saved = localStorage.getItem("wg7tf2-lang");
  if (saved && LOCALES.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LOCALES.includes(nav) ? nav : "en";
}
