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
    navExplorer: "Benefits map",
    navDraft: "Draft: full taxonomy",
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
    suggest: "Suggest a change (GitHub issue)",
    suggestSheet: "Suggest in the shared spreadsheet (Google Sheets)",
    shared: "Link copied",
    aboutTitle: "About",
    aboutBody:
      "This explorer renders \"The Value of Open Research Information: Eight Transformative Benefits\" " +
      "(brief, v{version}), a working document of Task Force 2 of Working Group 7 of the Barcelona " +
      "Declaration on Open Research Information. Content is licensed CC BY 4.0; the English text is " +
      "the authoritative wording. A fuller stakeholder and benefits taxonomy is published here as an " +
      "explicitly labelled draft (view 02); it has not been reviewed or endorsed by WG7-TF2.",
    aboutHowTitle: "How it works",
    aboutHowBody:
      "The Barcelona Declaration commits signatories to making openness the default, working with " +
      "open systems, supporting infrastructure sustainability, and enabling collective action. " +
      "Those commitments unlock the eight benefits shown here, each read as: what traditional " +
      "metrics miss, what ORI makes possible, and who benefits. This page is a static site; the " +
      "data behind it is a single JSON file in the repository, and every change to it is versioned.",
    aboutSuggestBody:
      "Two channels, pick whichever suits you: a structured GitHub issue (public and traceable, " +
      "needs a GitHub account; the explorer's button pre-fills it for the selected item), or the " +
      "shared WG7-TF2 spreadsheet, which needs no account at all.",
    contribUseBody:
      "Every suggestion is tied to a specific element of the framework, so nothing lands in a " +
      "general inbox. Wording feedback flows into the next version of the brief. Your perspective " +
      "records which kind of actor says what about which benefit, evidence the task force uses to " +
      "validate and refine the fuller stakeholder and benefits taxonomy under community review. " +
      "Concrete examples feed the case study collection. Everything arrives as a public, versioned " +
      "record: each suggestion keeps its link, and the exported CSV in the repository is the " +
      "working dataset of the review.",
    aboutCreditsTitle: "Credits",
    aboutCredits:
      "Built and maintained by Ricardo Hartley (@rijdho) as a contribution to Task Force 2 of " +
      "Working Group 7 of the Barcelona Declaration; the brief itself is the work of the task " +
      "force. Community suggestions are credited in their own issues and in the exported " +
      "suggestions dataset.",
    aboutRefsTitle: "References",
    sourceLabel: "Source:",
    sourceLink: "source\u00a0\u2197",
    themeLabel: "Switch light / dark theme",
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
    navExplorer: "Nutzen-Karte",
    navDraft: "Entwurf: vollständige Taxonomie",
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
    suggest: "Änderung vorschlagen (GitHub-Issue)",
    suggestSheet: "Im gemeinsamen Spreadsheet vorschlagen (Google Sheets)",
    shared: "Link kopiert",
    aboutTitle: "Über",
    aboutBody:
      "Dieser Explorer zeigt \"The Value of Open Research Information: Eight Transformative Benefits\" " +
      "(Brief, v{version}), ein Arbeitsdokument der Task Force 2 der Working Group 7 der Barcelona " +
      "Declaration on Open Research Information. Inhalte stehen unter CC BY 4.0; der englische Text " +
      "ist maßgeblich. Eine umfassendere Stakeholder- und Nutzen-Taxonomie ist hier als ausdrücklich " +
      "gekennzeichneter Entwurf veröffentlicht (Ansicht 02); sie wurde von WG7-TF2 weder geprüft " +
      "noch bestätigt.",
    aboutHowTitle: "Wie es funktioniert",
    aboutHowBody:
      "Die Barcelona Declaration verpflichtet ihre Unterzeichner, Offenheit zum Standard zu machen, " +
      "mit offenen Systemen zu arbeiten, die Nachhaltigkeit der Infrastruktur zu unterstützen und " +
      "kollektives Handeln zu ermöglichen. Diese Verpflichtungen erschließen die acht hier gezeigten " +
      "Nutzen, jeweils gelesen als: was traditionelle Metriken übersehen, was ORI möglich macht und " +
      "wer profitiert. Diese Seite ist statisch; die Daten dahinter sind eine einzige JSON-Datei im " +
      "Repository, und jede Änderung daran ist versioniert.",
    aboutSuggestBody:
      "Zwei Wege, je nachdem, was passt: ein strukturiertes GitHub-Issue (öffentlich und " +
      "nachvollziehbar, erfordert ein GitHub-Konto; der Button im Explorer füllt es für das " +
      "gewählte Element vor) oder das gemeinsame WG7-TF2-Spreadsheet, ganz ohne Konto.",
    contribUseBody:
      "Jeder Vorschlag ist an ein konkretes Element des Rahmens gebunden, nichts landet in einem " +
      "allgemeinen Posteingang. Formulierungsfeedback fließt in die nächste Version des Briefs ein. " +
      "Ihre Perspektive erfasst, welche Art von Akteur was über welchen Nutzen sagt, Evidenz, mit " +
      "der die Task Force die umfassendere Stakeholder- und Nutzen-Taxonomie in der " +
      "Community-Review validiert und verfeinert. Konkrete Beispiele speisen die " +
      "Fallstudiensammlung. Alles ist öffentlich und versioniert: jeder Vorschlag behält seinen " +
      "Link, und das exportierte CSV im Repository ist der Arbeitsdatensatz der Review.",
    aboutCreditsTitle: "Credits",
    aboutCredits:
      "Erstellt und gepflegt von Ricardo Hartley (@rijdho) als Beitrag zur Task Force 2 der " +
      "Working Group 7 der Barcelona Declaration; der Brief selbst ist die Arbeit der Task Force. " +
      "Vorschläge aus der Community werden in ihren eigenen Issues und im exportierten " +
      "Vorschlagsdatensatz namentlich geführt.",
    aboutRefsTitle: "Referenzen",
    sourceLabel: "Quelle:",
    sourceLink: "Quelle\u00a0\u2197",
    themeLabel: "Hell / dunkel umschalten",
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
    navExplorer: "Mapa de beneficios",
    navDraft: "Borrador: taxonomía completa",
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
    suggest: "Sugerir un cambio (issue de GitHub)",
    suggestSheet: "Sugerir en la hoja compartida (Google Sheets)",
    shared: "Enlace copiado",
    aboutTitle: "Acerca de",
    aboutBody:
      "Este explorador muestra \"The Value of Open Research Information: Eight Transformative Benefits\" " +
      "(brief, v{version}), un documento de trabajo del Task Force 2 del Working Group 7 de la Barcelona " +
      "Declaration on Open Research Information. El contenido está bajo CC BY 4.0; el texto en inglés es " +
      "la redacción autorizada. Una taxonomía más completa de stakeholders y beneficios está publicada " +
      "aquí como borrador explícitamente etiquetado (vista 02); no ha sido revisada ni respaldada " +
      "por WG7-TF2.",
    aboutHowTitle: "Cómo funciona",
    aboutHowBody:
      "La Barcelona Declaration compromete a sus firmantes a hacer de la apertura el estándar, trabajar " +
      "con sistemas abiertos, apoyar la sostenibilidad de la infraestructura y habilitar la acción " +
      "colectiva. Esos compromisos desbloquean los ocho beneficios que se muestran aquí, cada uno leído " +
      "como: qué pasan por alto las métricas tradicionales, qué hace posible ORI y quién se beneficia. " +
      "Esta página es estática; los datos detrás son un único archivo JSON en el repositorio, y cada " +
      "cambio queda versionado.",
    aboutSuggestBody:
      "Dos canales, elige el que te acomode: un issue estructurado de GitHub (público y " +
      "trazable, requiere cuenta de GitHub; el botón del explorador lo prellena para el " +
      "elemento seleccionado), o la hoja de cálculo compartida del WG7-TF2, sin cuenta alguna.",
    contribUseBody:
      "Cada sugerencia queda atada a un elemento concreto del marco, nada cae en un buzón " +
      "genérico. Los comentarios de redacción fluyen a la próxima versión del brief. Tu " +
      "perspectiva registra qué tipo de actor dice qué sobre qué beneficio, evidencia que el task " +
      "force usa para validar y refinar la taxonomía más completa de stakeholders y beneficios en " +
      "revisión comunitaria. Los ejemplos concretos alimentan la colección de casos de estudio. " +
      "Todo queda como registro público y versionado: cada sugerencia conserva su enlace, y el CSV " +
      "exportado en el repositorio es el conjunto de datos de trabajo de la revisión.",
    aboutCreditsTitle: "Créditos",
    aboutCredits:
      "Creado y mantenido por Ricardo Hartley (@rijdho) como contribución al Task Force 2 del " +
      "Working Group 7 de la Barcelona Declaration; el brief mismo es obra del task force. Las " +
      "sugerencias de la comunidad se acreditan en sus propios issues y en el conjunto de datos " +
      "de sugerencias exportado.",
    aboutRefsTitle: "Referencias",
    sourceLabel: "Fuente:",
    sourceLink: "fuente\u00a0\u2197",
    themeLabel: "Cambiar tema claro / oscuro",
  },
};

export function detectLocale() {
  const saved = localStorage.getItem("wg7tf2-lang");
  if (saved && LOCALES.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LOCALES.includes(nav) ? nav : "en";
}
