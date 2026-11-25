// UI strings for the taxonomy explorer. Taxonomy content (names, definitions,
// examples) lives in data/taxonomy.json with its own en/de/es fields.
// tests/i18n.test.mjs pins key parity across locales; keep all three in sync.

export const LOCALES = ["en", "de", "es"];

export const UI = {
  en: {
    title: "Stakeholders & Benefits",
    draftLabel: "Draft v{version} · working example",
    draftBanner: "This full stakeholder taxonomy is an exercise: a proposal for where the framework may go. It has not been reviewed or endorsed by WG7-TF2; the published reference is the ten-benefits brief. The English text is the authoritative wording.",
    navBack: "Benefits map",
    navDraftSelf: "Draft: full taxonomy",
    sourceLink: "source\u00a0\u2197",
    themeLabel: "Switch light / dark theme",
    eyebrow: "A stakeholder map and a taxonomy of benefits for open research information",
    lede:
      "Who participates in Open Research Information, and what value it creates: " +
      "ten benefit dimensions in three axes, reached by eleven stakeholder categories " +
      "through eight functional roles. Select an item to see what it connects to. " +
      "The page loads nothing from another server and has no analytics.",
    navView: "View",
    navExplorer: "Explorer",
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
    suggest: "Suggest a change",
    shared: "Link copied",
    aboutTitle: "About",
    railLicense: "Content under CC BY 4.0",
    railSource: "Source on GitHub",
    railFamily: "Part of",
  },
  de: {
    title: "Stakeholder & Nutzen",
    draftLabel: "Entwurf v{version} · Arbeitsbeispiel",
    draftBanner: "Diese vollständige Stakeholder-Taxonomie ist eine Übung: ein Vorschlag, wohin sich der Rahmen entwickeln könnte. Sie wurde von WG7-TF2 weder geprüft noch bestätigt; die veröffentlichte Referenz ist der Zehn-Nutzen-Brief. Der englische Text ist maßgeblich.",
    navBack: "Nutzen-Karte",
    navDraftSelf: "Entwurf: vollständige Taxonomie",
    sourceLink: "Quelle\u00a0\u2197",
    themeLabel: "Hell / dunkel umschalten",
    eyebrow: "Eine Stakeholder-Karte und eine Nutzen-Taxonomie für offene Forschungsinformation",
    lede:
      "Wer an Open Research Information teilnimmt und welchen Wert sie schafft: " +
      "zehn Nutzendimensionen in drei Achsen, erreicht von elf Stakeholder-Kategorien " +
      "über acht funktionale Rollen. Element auswählen, um seine Verbindungen zu sehen. " +
      "Die Seite lädt nichts von anderen Servern und hat keine Analyse-Software.",
    navView: "Ansicht",
    navExplorer: "Explorer",
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
    suggest: "Änderung vorschlagen",
    shared: "Link kopiert",
    aboutTitle: "Über",
    railLicense: "Inhalte unter CC BY 4.0",
    railSource: "Quellcode auf GitHub",
    railFamily: "Teil von",
  },
  es: {
    title: "Stakeholders y beneficios",
    draftLabel: "Borrador v{version} · ejemplo de trabajo",
    draftBanner: "Esta taxonomía completa de stakeholders es un ejercicio: una propuesta de hacia dónde puede ir el marco. No ha sido revisada ni respaldada por WG7-TF2; la referencia publicada es el brief de diez beneficios. El texto en inglés es la redacción autorizada.",
    navBack: "Mapa de beneficios",
    navDraftSelf: "Borrador: taxonomía completa",
    sourceLink: "fuente\u00a0\u2197",
    themeLabel: "Cambiar tema claro / oscuro",
    eyebrow: "Un mapa de stakeholders y una taxonomía de beneficios para la información abierta sobre investigación",
    lede:
      "Quién participa en la información abierta sobre investigación y qué valor crea: " +
      "diez dimensiones de beneficio en tres ejes, alcanzadas por once categorías de stakeholders " +
      "a través de ocho roles funcionales. Al seleccionar un elemento se ve con qué se conecta. " +
      "La página no carga nada de otros servidores y no tiene analítica.",
    navView: "Vista",
    navExplorer: "Explorador",
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
    hint: "Nada seleccionado. Un clic en un stakeholder, rol o beneficio resalta sus conexiones; otro clic las quita.",
    share: "Copiar enlace a esta vista",
    suggest: "Sugerir un cambio",
    shared: "Enlace copiado",
    aboutTitle: "Acerca de",
    railLicense: "Contenido bajo CC BY 4.0",
    railSource: "Código en GitHub",
    railFamily: "Parte de",
  },
};

export function detectLocale() {
  const saved = localStorage.getItem("wg7tf2-lang");
  if (saved && LOCALES.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LOCALES.includes(nav) ? nav : "en";
}
