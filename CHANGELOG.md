# Changelog

All notable changes to this repository are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Versions track the brief they publish: the repository is at 0.2.0 because the brief is at
v0.2. It stays below 1.0.0 until WG7-TF2 has reviewed it, which starts with the meeting of
1 September 2026.

## [Unreleased]

## [0.2.0] - 2026-09-01

First tagged version. It carries everything built since the site went up on 2026-08-17, and
the brief it publishes is a working document: B9 and the narrowing of B2 are proposals put
to the task force, not decisions it has taken.

The tag was cut on 2026-08-26 and moved to 2026-09-01 to take the security policy and the
brief's orphaned image with it. Nothing referenced the tag: no release, no DOI, no forks.

Tagged but deliberately not released. The Zenodo integration is connected and armed, and it
mints on a GitHub Release rather than on a tag, so nothing is archived yet. A Zenodo record
is permanent, and a proposal the task force has not yet seen should not become citable as
though it were settled. The release is cut after the meeting of 1 September 2026, on
whatever version the group has actually agreed.

### Added

- **Every page ships a Content-Security-Policy.** GitHub Pages sends no security headers
  at all, so a `<meta http-equiv>` is the only policy the site can carry, and it starts
  from `default-src 'none'` and names only what the page needs: `'self'` for scripts,
  styles, fonts and the taxonomy fetch, with `base-uri`, `form-action` and `object-src` at
  `'none'`. Nothing here loads from another origin, so no directive names one. It is worth
  the effort on pages that escape everything correctly today because it is the only defence
  that survives a mistake, and because it makes the promise these pages already print, that
  nothing is tracked and nothing is sent anywhere, something the browser enforces rather
  than something the reader has to trust. Verified by breaching it in a browser rather than
  by reading it: an off-origin `fetch`, a Google Fonts stylesheet and a CDN script are all
  refused while all three pages still render and switch language and theme.

  `frame-ancestors` is absent and clickjacking therefore stays uncovered, because that
  directive only works as a response header and Pages cannot send one.

- Two tests that keep the policy enforceable rather than decorative: every page declares it
  before the first subresource, starts from `default-src 'none'` and admits no unsafe
  source; and no page carries an inline script, an inline `<style>` or a `style` attribute,
  since any of those would force the policy to loosen. Proven by injection, eight defects.

- **A ninth benefit: B9, Strategic Steering & Institutional Autonomy** (Axis II
  Collaboration & Innovation, outcome O2 Sustainable Innovation). The brief did not contain
  the word "strategy" once, in any of its three languages, and its only economic term was
  "institutions justify infrastructure investments" inside B7. The eight benefits described
  what open information makes visible *about research*; nothing held information about the
  *system that publishes research* (its costs, its suppliers, its venues), and nothing held
  an institution acting on it. B9 covers cost and terms of publishing, the conduct and
  performance of venues, dependency on proprietary sources, and the reallocation of
  resources towards community-led and Diamond infrastructure. The brief goes to v0.2, the
  draft taxonomy gains B9 to keep its parity contract, and roles R4 (Policy Maker) and R5
  (Support & Stewardship) carry it, which reaches seven of the eleven stakeholders.

  It came from placing a real case rather than from rereading definitions. The University
  of Milan response in the WG7 case study collection, nine years of APC monitoring and the
  funding decisions it drove, left five things with no benefit to land on: cost
  transparency, divestment from proprietary sources, publisher and journal conduct, support
  for venue choice, and budget moved to Diamond. One gap seen from five sides.

- The spreadsheet now says that a comment is also a way in. Eleven columns of dropdowns
  read as "a row or nothing", and the one thing that channel has which the issue form does
  not is a comment thread on every cell. A member who will not fill eleven fields will
  still leave a comment, and until now nothing invited it. The sentence is generated from
  `site/data/vocabularies.json` like the terms are, so the channel cannot end up saying it
  in words nobody agreed, and it restates that the contribution terms cover a comment too:
  the cheaper way in must not become the way around the licence. Pinned by a test.

- `scripts/generate-options.mjs` and `npm run options`: one generator for the controlled
  lists both suggestion channels share. It rewrites the issue form's dropdowns and writes
  `suggestions/options.csv`, the same lists as columns for the shared spreadsheet's
  data-validation ranges. Neither channel constrains the other; both are downstream of the
  taxonomy, so the two sets of suggestions merge without a mapping table.
- `site/data/vocabularies.json`: the controlled lists that describe the suggestion process
  rather than the framework, plus the contribution terms, so neither has to live inside a
  form template where a second channel cannot reach them.
- `suggestions/contribution-terms.md`: generated, the terms in the words the issue form
  uses, for the shared spreadsheet and any later channel.
- `tests/options.test.mjs`: both channels offer the same closed vocabularies, every option
  resolves to a real id, each stakeholder gets exactly one option, and the node labels
  still match what `site/app.js` and `site/draft/app.js` prefill. The terms are pinned the
  same way: stated verbatim wherever they appear, agreement required rather than optional,
  and the licence named in every locale.
- `tests/draft.test.mjs`: integrity and locale parity of the draft taxonomy, plus the
  contract that the draft may extend the brief but not contradict it.
- `tests/site.test.mjs`: page invariants for hidden state, small-screen navigation and
  credit line, relative link targets, and asset versioning.
- `tests/sheet.test.mjs`: the spreadsheet channel's plan carries the same closed lists as
  the issue form, the same terms, node as a closed list rather than free text, and a
  perspective list whose every entry resolves to a stakeholder.
- `tests/export.test.mjs`: the form-to-CSV contract. Every label the exporter reads exists
  in the form, every question the form asks reaches the CSV or is recorded as a deliberate
  omission, the header has a column for every value a row emits, and consent travels with
  the data.

### Changed

- The theme bootstrap moved from an inline `<script>` in all three page heads to
  `site/theme.js`, and the About page's inline module to `site/about/about.js`. An inline
  script forces the policy to either allow `'unsafe-inline'`, which gives most of it away,
  or pin a hash to its bytes, which then has to be recomputed on every edit. A plain,
  non-module script in the head is still render-blocking, so the theme still beats first
  paint and a dark-theme visitor still sees no white flash.

- **B2 gives up "open science policy implementation."** That clause absorbed almost any
  institutional case, because almost every institutional case is a policy being
  implemented: in the trial coding of the Milan case, B2 took the primary slot by default
  rather than by fit. A benefit that codes most cases carries no information, and a
  B2-heavy frequency table would have been read as a finding about open research
  information when it was an artefact of one clause. B2 keeps research conduct monitoring,
  ethics approvals, data protection and institutional accountability for how research is
  conducted. The change only makes sense alongside B9, and a test now refuses to let the
  clause come back while B9 exists, in all three languages.

- The brief's embedded flow diagram, an image carrying the eight-benefit v0.1 map, is
  replaced by a pointer to `deliverables/Benefits_map.md`, which is generated from the
  taxonomy. A picture is the one thing that survives every text check unchanged.

- The suggestion form was framed around proposing a change while its example field already
  asked about the element as it stands, so it invited two things and permitted one: anyone
  who came only to share an example had to invent a change proposal first. It is now
  "Suggest a change or share an example", it asks what you are contributing before
  anything else, and the change proposal and its type are optional. The explorer's button
  and contribute text say so in all three languages. Raised by Bianca in review, 2026-08-21.
- The brief is labeled v0.1 everywhere, matching the Google Doc that circulates to WG7.
  The repository previously carried it as v1.0 while the document itself said 0.1, so the
  explorer cited a version its own source did not use.
- About: the credits section replaces its "still to be filled" placeholder, and the text
  now says the fuller taxonomy is published as a labeled draft rather than pending.
- The draft banner reads "Draft v1.0 · working example" without the author credit.
- The theme toggle and the source link are translated instead of English-only.

### Fixed

- **The v0.2 commit changed four cache-versioned assets and bumped no `?v=`.** `site/i18n.js`,
  `site/data/taxonomy.json`, `site/draft/i18n.js` and `site/draft/data/taxonomy.json` all
  changed content on 2026-08-26 while their URLs stayed the same, so returning visitors were
  served the eight-benefit files against the new page. Pages sends `max-age=600`, so the
  window was ten minutes rather than permanent, and the deployed site has been correct ever
  since; the defect is in the discipline, not in what is served. The previous release fixed
  exactly this for the draft stylesheet and stopped there, which is the familiar shape of a
  rule written for the instance rather than for the class.

- Every asset reference across the site now carries the same version, `?v=18`. The draft
  explorer had been running four different numbers at once (`style.css` 5, `app.js` 7,
  `i18n.js` 6, `taxonomy.json` 4) against the main explorer's uniform 17. A module graph is
  cached per resolved URL, so mismatched numbers let a browser serve a stale `i18n.js`
  against a fresh `app.js` that imports a symbol the cached copy does not export: the graph
  aborts with no visible error and the page comes up blank while looking deployed. A test
  now pins one version across the whole site, which makes that state impossible to express.
  It cannot catch the other half, a file edited while its number stays put, because nothing
  a test reads tells that apart from no edit at all.

- The relative-link test only checked `href`, so a `src` pointing at a file that does not
  exist would have passed. It now checks both, which is what proves the two newly extracted
  scripts are actually where the pages say they are.

- CHANGELOG: the 0.2.0 heading used `## [0.2.0]: date` where Keep a Changelog uses
  `## [0.2.0] - date`.

- The acknowledgement was collected but never left the issue body: `suggestions.csv`, the
  dataset the task force actually works from, had no column for it, so reusing an example
  meant going back to the issue to check whether its author had agreed. The export now
  carries `terms_agreed`. Issues filed before the field existed stay empty rather than
  recording a "no" nobody was asked.
- `suggestions.csv` is rebuilt only when an issue event fires, so adding a column to the
  exporter left the committed file a column short until somebody happened to file an
  issue. It happened once, and the workflow corrected it on the next run rather than
  anything noticing. The committed header is now pinned to the exporter's columns.
- The exporter found its columns by matching the issue form's labels, written out a second
  time in the workflow with nothing pinning the two together. Renaming a label in the form
  would have exported an empty string for that column for every issue from then on, while
  the CSV still parsed, still opened in Excel and still looked complete. The contract is
  now a test.
- The shared spreadsheet imports `suggestions.csv` with `IMPORTDATA`, which maps by
  position rather than by name, so inserting a column shifts every formula, filter and
  note keyed to a column letter on the other side, silently, in a document this repository
  cannot see. It already happened once, when `contribution` went in at position six. The
  order is frozen in `suggestions/export-columns.json` and pinned as a prefix, so new
  columns can only be appended.
- The export handed the coordinators its own test data: the two issues that exercised the
  pipeline were the first and only rows anyone opening the shared spreadsheet would see.
  They keep the `pipeline-test` label as the record that the export was tested end to end,
  and the exporter leaves them out of the working dataset.
- The spreadsheet, the channel that needs no account, asked none of what the issue form
  asks: node was free text hinted "e.g. B6", no column recorded what was being
  contributed, no column carried consent, and no column had any data validation at all, so
  answers arrived as prose that could not be matched with the taxonomy or with the
  suggestions filed through GitHub. `scripts/generate-sheet.mjs` and
  `scripts/build-sheet.py` now derive that channel from the same sources as the form, and
  `suggestions/WG7TF2-suggestions-sheet.xlsx` carries the columns, the validated lists and
  the terms, ready to import.
- The suggestion channels never stated their contribution terms. The repository is CC BY
  4.0, but that covers what the task force publishes, not what a contributor submits, and
  a licence cannot be left implied by a footer on another page. Every channel now states
  the terms in the same generated words, the issue form requires explicit agreement before
  a suggestion can be filed, and the explorer says so in all three languages before the
  contributor leaves for the form.
- The suggestion channels drew their dropdowns from hand-written copies, and one had
  already drifted: "Your perspective" collapsed S10 (Intergovernmental Organizations) and
  S11 (Networks and Alliances) into a single option, and no option carried its id, so a
  recorded answer could not be joined back to the stakeholder taxonomy without a hand-kept
  mapping table. Both dropdowns are now generated, every option carries its id, and the
  two stakeholders are separate again.
- Draft explorer: buttons the app hides (clear selection, copy link, suggest a change)
  were visible on screen, and the suggestion button rendered as a dead link. `.btn`
  declares a display, which outranks the user agent rule for `hidden`; the neutralizing
  rule existed only in the main stylesheet.
- Deep links: a well-formed id that does not exist (`#A9`, `#S99`) threw while building
  the selection graph, leaving the map without its connecting lines for the rest of the
  visit. Both explorers now validate the hash against the data instead of against a shape.
- Small screens: below 940px the rail hid the navigation and the credit line, so the draft
  and About views were unreachable and the author, license and source links disappeared.
  The rail now wraps, keeping both.
- The "Source" citation on the explorer and the brief reference in About pointed at a
  Google Doc that requires sign-in and access. Both now point at the full text in this
  repository; the WG7 working copy is kept in About, labeled as access-restricted.
- The issue form described the explorer's GitHub button as the channel that needs no
  account; that is the shared spreadsheet.
- Two benefit definitions had lost a clause against the source document: B1 did not close
  with "enabling verification and trust", and B2 omitted "open science policy
  implementation" from its list. Restored in English, German and Spanish, and in the
  markdown brief.
- The draft stylesheet changed without its `?v=` being bumped, so cached browsers kept
  serving the previous version.

### Removed

- Three UI strings orphaned when the Contribute view was folded back into the map view.

## 2026-08-17

- First public version: the brief as a machine-readable taxonomy, the interactive
  explorer (EN/DE/ES, light/dark, deep links), the generated benefits map, the draft
  stakeholder taxonomy, the GitHub issue and spreadsheet suggestion channels with CSV
  export, and the Pages deploy gated by the test suite.
