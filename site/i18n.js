// UI strings for the ORI benefits explorer. Content (names, descriptions,
// who-benefits texts) lives in data/taxonomy.json with its own en/de/es fields.
// tests/i18n.test.mjs pins key parity across locales; keep all three in sync.

export const LOCALES = ["en", "de", "es"];

export const UI = {
  en: {
    title: "The Eight Benefits",
    eyebrow: "The value of open research information",
    lede:
      "What research systems gain when information about research is open: " +
      "eight transformative benefits in three axes, flowing into trustworthy research, " +
      "sustainable innovation, and societal impact. Select any item to trace its connections. " +
      "Everything runs in your browser; nothing is tracked or sent anywhere.",
    navView: "View",
    navExplorer: "Explorer",
    colAxes: "Axes",
    colBenefits: "Benefit dimensions",
    colOutcomes: "Outcomes",
    detailWho: "Who benefits",
    detailBenefitsIn: "Benefit dimensions",
    detailOutcome: "Outcome",
    detailVision: "Leads to",
    detailAxis: "Axis",
    clearSelection: "Clear selection",
    hint: "Nothing selected. Click an axis, benefit, or outcome to highlight its connections; click it again to clear.",
    share: "Copy link to this view",
    suggest: "Suggest a change",
    suggestSheet: "Suggest in the shared spreadsheet",
    shared: "Link copied",
    aboutTitle: "About",
    aboutBody:
      "This explorer renders \"The Value of Open Research Information: Eight Transformative Benefits\" " +
      "(brief, v{version}), a working document of Task Force 2 of Working Group 7 of the Barcelona " +
      "Declaration on Open Research Information. Content is licensed CC BY 4.0; the English text is " +
      "the authoritative wording. A full stakeholder and benefits taxonomy is under community review " +
      "and will be published through the WG7 process.",
    aboutHowTitle: "How it works",
    aboutHowBody:
      "The Barcelona Declaration commits signatories to making openness the default, working with " +
      "open systems, supporting infrastructure sustainability, and enabling collective action. " +
      "Those commitments unlock the eight benefits shown here, each read as: what traditional " +
      "metrics miss, what ORI makes possible, and who benefits. This page is a static site; the " +
      "data behind it is a single JSON file in the repository, and every change to it is versioned.",
    aboutSuggestTitle: "Suggest changes",
    aboutSuggestBody:
      "Two channels, pick whichever suits you: a structured GitHub issue (public and traceable, " +
      "needs a GitHub account; the explorer's button pre-fills it for the selected item), or the " +
      "shared WG7-TF2 spreadsheet, which needs no account at all.",
    aboutRefsTitle: "References",
    sourceLabel: "Source:",
  },
  de: {
    title: "Die acht Nutzen",
    eyebrow: "Der Wert offener Forschungsinformation",
    lede:
      "Was Forschungssysteme gewinnen, wenn Informationen über Forschung offen sind: " +
      "acht transformative Nutzen in drei Achsen, die in vertrauenswürdige Forschung, " +
      "nachhaltige Innovation und gesellschaftliche Wirkung münden. Element auswählen, um seine " +
      "Verbindungen zu verfolgen. Alles läuft im Browser; nichts wird erfasst oder gesendet.",
    navView: "Ansicht",
    navExplorer: "Explorer",
    colAxes: "Achsen",
    colBenefits: "Nutzendimensionen",
    colOutcomes: "Ergebnisse",
    detailWho: "Wer profitiert",
    detailBenefitsIn: "Nutzendimensionen",
    detailOutcome: "Ergebnis",
    detailVision: "Führt zu",
    detailAxis: "Achse",
    clearSelection: "Auswahl aufheben",
    hint: "Nichts ausgewählt. Achse, Nutzen oder Ergebnis anklicken, um Verbindungen hervorzuheben; erneut klicken zum Aufheben.",
    share: "Link zu dieser Ansicht kopieren",
    suggest: "Änderung vorschlagen",
    suggestSheet: "Im gemeinsamen Spreadsheet vorschlagen",
    shared: "Link kopiert",
    aboutTitle: "Über",
    aboutBody:
      "Dieser Explorer zeigt \"The Value of Open Research Information: Eight Transformative Benefits\" " +
      "(Brief, v{version}), ein Arbeitsdokument der Task Force 2 der Working Group 7 der Barcelona " +
      "Declaration on Open Research Information. Inhalte stehen unter CC BY 4.0; der englische Text " +
      "ist maßgeblich. Eine vollständige Stakeholder- und Nutzen-Taxonomie befindet sich in der " +
      "Community-Review und wird über den WG7-Prozess veröffentlicht.",
    aboutHowTitle: "Wie es funktioniert",
    aboutHowBody:
      "Die Barcelona Declaration verpflichtet ihre Unterzeichner, Offenheit zum Standard zu machen, " +
      "mit offenen Systemen zu arbeiten, die Nachhaltigkeit der Infrastruktur zu unterstützen und " +
      "kollektives Handeln zu ermöglichen. Diese Verpflichtungen erschließen die acht hier gezeigten " +
      "Nutzen, jeweils gelesen als: was traditionelle Metriken übersehen, was ORI möglich macht und " +
      "wer profitiert. Diese Seite ist statisch; die Daten dahinter sind eine einzige JSON-Datei im " +
      "Repository, und jede Änderung daran ist versioniert.",
    aboutSuggestTitle: "Änderungen vorschlagen",
    aboutSuggestBody:
      "Zwei Wege, je nachdem, was passt: ein strukturiertes GitHub-Issue (öffentlich und " +
      "nachvollziehbar, erfordert ein GitHub-Konto; der Button im Explorer füllt es für das " +
      "gewählte Element vor) oder das gemeinsame WG7-TF2-Spreadsheet, ganz ohne Konto.",
    aboutRefsTitle: "Referenzen",
    sourceLabel: "Quelle:",
  },
  es: {
    title: "Los ocho beneficios",
    eyebrow: "El valor de la información abierta sobre investigación",
    lede:
      "Lo que ganan los sistemas de investigación cuando la información sobre la investigación es " +
      "abierta: ocho beneficios transformadores en tres ejes, que desembocan en investigación " +
      "confiable, innovación sostenible e impacto social. Selecciona un elemento para trazar sus " +
      "conexiones. Todo funciona en tu navegador; no se rastrea ni se envía nada.",
    navView: "Vista",
    navExplorer: "Explorador",
    colAxes: "Ejes",
    colBenefits: "Dimensiones de beneficio",
    colOutcomes: "Resultados",
    detailWho: "Quién se beneficia",
    detailBenefitsIn: "Dimensiones de beneficio",
    detailOutcome: "Resultado",
    detailVision: "Conduce a",
    detailAxis: "Eje",
    clearSelection: "Limpiar selección",
    hint: "Nada seleccionado. Haz clic en un eje, beneficio o resultado para resaltar sus conexiones; clic de nuevo para limpiar.",
    share: "Copiar enlace a esta vista",
    suggest: "Sugerir un cambio",
    suggestSheet: "Sugerir en la hoja compartida",
    shared: "Enlace copiado",
    aboutTitle: "Acerca de",
    aboutBody:
      "Este explorador muestra \"The Value of Open Research Information: Eight Transformative Benefits\" " +
      "(brief, v{version}), un documento de trabajo del Task Force 2 del Working Group 7 de la Barcelona " +
      "Declaration on Open Research Information. El contenido está bajo CC BY 4.0; el texto en inglés es " +
      "la redacción autorizada. Una taxonomía completa de stakeholders y beneficios está en revisión " +
      "comunitaria y se publicará a través del proceso del WG7.",
    aboutHowTitle: "Cómo funciona",
    aboutHowBody:
      "La Barcelona Declaration compromete a sus firmantes a hacer de la apertura el estándar, trabajar " +
      "con sistemas abiertos, apoyar la sostenibilidad de la infraestructura y habilitar la acción " +
      "colectiva. Esos compromisos desbloquean los ocho beneficios que se muestran aquí, cada uno leído " +
      "como: qué pasan por alto las métricas tradicionales, qué hace posible ORI y quién se beneficia. " +
      "Esta página es estática; los datos detrás son un único archivo JSON en el repositorio, y cada " +
      "cambio queda versionado.",
    aboutSuggestTitle: "Sugerir cambios",
    aboutSuggestBody:
      "Dos canales, elige el que te acomode: un issue estructurado de GitHub (público y " +
      "trazable, requiere cuenta de GitHub; el botón del explorador lo prellena para el " +
      "elemento seleccionado), o la hoja de cálculo compartida del WG7-TF2, sin cuenta alguna.",
    aboutRefsTitle: "Referencias",
    sourceLabel: "Fuente:",
  },
};

export function detectLocale() {
  const saved = localStorage.getItem("wg7tf2-lang");
  if (saved && LOCALES.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LOCALES.includes(nav) ? nav : "en";
}
