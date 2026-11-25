// UI strings for the ORI benefits explorer. Content (names, descriptions,
// who-benefits texts) lives in data/taxonomy.json with its own en/de/es fields.
// tests/i18n.test.mjs pins key parity across locales; keep all three in sync.

export const LOCALES = ["en", "de", "es"];

export const UI = {
  en: {
    title: "The Ten Benefits",
    eyebrow: "The value of open research information",
    lede:
      "What research systems gain when information about research is open: ten benefits in three axes, leading to trustworthy research, sustainable innovation and societal impact. Select an item to see what it connects to. The page loads nothing from another server and has no analytics.",
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
    suggest: "Suggest a change or example (GitHub issue)",
    suggestSheet: "Suggest in the shared spreadsheet (Google Sheets)",
    shared: "Link copied",
    aboutTitle: "About",
    railBy: "By",
    railLicense: "Content under CC BY 4.0",
    railSource: "Source on GitHub",
    railFamily: "Part of",
    aboutBody:
      "This explorer shows \"The Value of Open Research Information: Ten Transformative Benefits\" " +
      "(brief, v{version}), a working document of Task Force 2 of Working Group 7 of the Barcelona " +
      "Declaration on Open Research Information. Content is licensed CC BY 4.0; the English text is " +
      "the authoritative wording. A fuller stakeholder and benefits taxonomy is published here as a " +
      "draft (view 02); it has not been reviewed or endorsed by WG7-TF2.",
    aboutHowTitle: "How it works",
    aboutHowBody:
      "The Barcelona Declaration commits signatories to making openness the default, working with open systems, supporting infrastructure sustainability, and enabling collective action. The brief describes ten benefits that follow from those commitments. Each one states what traditional metrics miss, what open research information adds, and who benefits. This page is a static site: it reads one JSON file from the repository, and every change to that file is recorded in the repository's history.",
    aboutSuggestBody:
      "There are two ways to suggest something. A GitHub issue is public and can be traced, and needs a GitHub account; the button fills in the form for the selected item. The shared WG7-TF2 spreadsheet needs no account.",
    contribUseBody:
      "Each contribution refers to one element of the framework. You can propose a change, give an example of the element as it stands, or both. A suggestion about wording is considered for the next version of the brief. The form also asks from which perspective you write, so that the task force can see which kind of actor says what about which benefit. Every suggestion made through GitHub is public: it keeps its own link, and all of them are exported to a CSV file in the repository. What you submit is contributed under CC BY 4.0, so the task force can reuse it with attribution to you; the form asks you to confirm this.",
    aboutCreditsTitle: "Credits",
    aboutCredits:
      "Built and maintained by Ricardo Hartley Belmar (@rijdho) as a contribution to Task Force 2 of Working Group 7 of the Barcelona Declaration. Version 0.1 of the brief is the work of Task Force 2; the changes since then are the author's proposals to it, listed at the end of the brief. Suggestions from the community are credited in their own issues and in the exported file of suggestions.",
    aboutRefsTitle: "References",
    sourceLabel: "Source:",
    sourceLink: "source\u00a0\u2197",
    themeLabel: "Switch light / dark theme",
  },
  de: {
    title: "Die zehn Nutzen",
    eyebrow: "Der Wert offener Forschungsinformation",
    lede:
      "Was Forschungssysteme gewinnen, wenn Informationen über Forschung offen sind: zehn Nutzen in drei Achsen, die zu vertrauenswürdiger Forschung, nachhaltiger Innovation und gesellschaftlicher Wirkung führen. Element auswählen, um seine Verbindungen zu sehen. Die Seite lädt nichts von anderen Servern und hat keine Analyse-Software.",
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
    suggest: "Änderung oder Beispiel vorschlagen (GitHub-Issue)",
    suggestSheet: "Im gemeinsamen Spreadsheet vorschlagen (Google Sheets)",
    shared: "Link kopiert",
    aboutTitle: "Über",
    railBy: "Von",
    railLicense: "Inhalte unter CC BY 4.0",
    railSource: "Quellcode auf GitHub",
    railFamily: "Teil von",
    aboutBody:
      "Dieser Explorer zeigt \"The Value of Open Research Information: Ten Transformative Benefits\" " +
      "(Brief, v{version}), ein Arbeitsdokument der Task Force 2 der Working Group 7 der Barcelona " +
      "Declaration on Open Research Information. Inhalte stehen unter CC BY 4.0; der englische Text " +
      "ist maßgeblich. Eine umfassendere Stakeholder- und Nutzen-Taxonomie ist hier als " +
      "Entwurf veröffentlicht (Ansicht 02); sie wurde von WG7-TF2 weder geprüft " +
      "noch bestätigt.",
    aboutHowTitle: "Wie es funktioniert",
    aboutHowBody:
      "Die Barcelona Declaration verpflichtet ihre Unterzeichner, Offenheit zum Standard zu machen, mit offenen Systemen zu arbeiten, die Nachhaltigkeit der Infrastruktur zu unterstützen und kollektives Handeln zu ermöglichen. Der Brief beschreibt zehn Nutzen, die aus diesen Verpflichtungen folgen. Jeder nennt, was traditionelle Metriken übersehen, was offene Forschungsinformationen hinzufügen und wer profitiert. Diese Seite ist statisch: Sie liest eine JSON-Datei aus dem Repository, und jede Änderung an dieser Datei ist in der Historie des Repositorys festgehalten.",
    aboutSuggestBody:
      "Es gibt zwei Wege, etwas vorzuschlagen. Ein GitHub-Issue ist öffentlich und nachvollziehbar und erfordert ein GitHub-Konto; der Button füllt das Formular für das gewählte Element aus. Das gemeinsame WG7-TF2-Spreadsheet erfordert kein Konto.",
    contribUseBody:
      "Jeder Beitrag bezieht sich auf ein Element des Rahmens. Möglich sind ein Änderungsvorschlag, ein Beispiel für das Element in seiner jetzigen Form oder beides. Ein Vorschlag zur Formulierung wird für die nächste Version des Briefs geprüft. Das Formular fragt auch, aus welcher Perspektive der Beitrag kommt, damit die Task Force sehen kann, welche Art von Akteur was über welchen Nutzen sagt. Jeder Vorschlag über GitHub ist öffentlich: Er behält seinen eigenen Link, und alle werden in eine CSV-Datei im Repository exportiert. Beiträge stehen unter CC BY 4.0, damit die Task Force sie mit Namensnennung weiterverwenden kann; das Formular verlangt dazu eine Zustimmung.",
    aboutCreditsTitle: "Credits",
    aboutCredits:
      "Erstellt und gepflegt von Ricardo Hartley Belmar (@rijdho) als Beitrag zur Task Force 2 der Working Group 7 der Barcelona Declaration. Version 0.1 des Briefs ist die Arbeit der Task Force 2; die Änderungen seither sind Vorschläge des Autors an sie und stehen am Ende des Briefs. Vorschläge aus der Community werden in ihren eigenen Issues und in der exportierten Datei der Vorschläge namentlich geführt.",
    aboutRefsTitle: "Referenzen",
    sourceLabel: "Quelle:",
    sourceLink: "Quelle\u00a0\u2197",
    themeLabel: "Hell / dunkel umschalten",
  },
  es: {
    title: "Los diez beneficios",
    eyebrow: "El valor de la información abierta sobre investigación",
    lede:
      "Lo que ganan los sistemas de investigación cuando la información sobre la investigación es abierta: diez beneficios en tres ejes, que llevan a investigación confiable, innovación sostenible e impacto social. Al seleccionar un elemento se ve con qué se conecta. La página no carga nada de otros servidores y no tiene analítica.",
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
    hint: "Nada seleccionado. Un clic en un eje, beneficio o resultado resalta sus conexiones; otro clic las quita.",
    share: "Copiar enlace a esta vista",
    suggest: "Sugerir un cambio o ejemplo (issue de GitHub)",
    suggestSheet: "Sugerir en la hoja compartida (Google Sheets)",
    shared: "Enlace copiado",
    aboutTitle: "Acerca de",
    railBy: "Por",
    railLicense: "Contenido bajo CC BY 4.0",
    railSource: "Código en GitHub",
    railFamily: "Parte de",
    aboutBody:
      "Este explorador muestra \"The Value of Open Research Information: Ten Transformative Benefits\" " +
      "(brief, v{version}), un documento de trabajo del Task Force 2 del Working Group 7 de la Barcelona " +
      "Declaration on Open Research Information. El contenido está bajo CC BY 4.0; el texto en inglés es " +
      "la redacción autorizada. Una taxonomía más completa de stakeholders y beneficios está publicada " +
      "aquí como borrador (vista 02); no ha sido revisada ni respaldada " +
      "por WG7-TF2.",
    aboutHowTitle: "Cómo funciona",
    aboutHowBody:
      "La Barcelona Declaration compromete a sus firmantes a hacer de la apertura el estándar, trabajar con sistemas abiertos, apoyar la sostenibilidad de la infraestructura y habilitar la acción colectiva. El brief describe diez beneficios que se siguen de esos compromisos. Cada uno dice qué pasan por alto las métricas tradicionales, qué añade la información abierta sobre investigación y quién se beneficia. Esta página es estática: lee un archivo JSON del repositorio, y cada cambio en ese archivo queda en el historial del repositorio.",
    aboutSuggestBody:
      "Hay dos maneras de sugerir algo. Un issue de GitHub es público y trazable, y requiere una cuenta de GitHub; el botón rellena el formulario para el elemento seleccionado. La hoja de cálculo compartida del WG7-TF2 no requiere cuenta.",
    contribUseBody:
      "Cada aportación se refiere a un elemento del marco. Se puede proponer un cambio, dar un ejemplo del elemento tal como está, o ambas cosas. Una sugerencia de redacción se considera para la próxima versión del brief. El formulario pregunta también desde qué perspectiva se escribe, para que el task force pueda ver qué tipo de actor dice qué sobre qué beneficio. Cada sugerencia hecha por GitHub es pública: conserva su propio enlace, y todas se exportan a un archivo CSV en el repositorio. Lo enviado se aporta bajo CC BY 4.0, de modo que el task force pueda reutilizarlo con atribución; el formulario pide confirmarlo.",
    aboutCreditsTitle: "Créditos",
    aboutCredits:
      "Creado y mantenido por Ricardo Hartley Belmar (@rijdho) como contribución al Task Force 2 del Working Group 7 de la Barcelona Declaration. La versión 0.1 del brief es obra del Task Force 2; los cambios posteriores son propuestas del autor al Task Force 2 y están al final del brief. Las sugerencias de la comunidad se acreditan en sus propios issues y en el archivo exportado de sugerencias.",
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
