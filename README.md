# The Value of Open Research Information (Barcelona Declaration WG7-TF2)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.22231440.svg)](https://doi.org/10.5281/zenodo.22231440)

**Ten benefits of open research information, as a brief and an interactive explorer.**

Contribution to Task Force 2 of Working Group 7 of the Barcelona Declaration on Open
Research Information. The brief maps what research systems gain when information about
research is open: ten benefit dimensions in three axes (Quality & Trust, Collaboration &
Innovation, Impact & Relevance), which lead to three outcomes: trustworthy research,
sustainable innovation and societal impact.

🔗 **Live:** https://rijdho.github.io/barcelona-wg7-tf2/

The explorer is available in **English, German and Spanish** (auto-detected, switchable)
and runs in the browser. It loads nothing from another server and has no analytics; it
keeps the chosen language and theme in the browser's local storage. Its
"Suggest a change or example" button opens a pre-filled GitHub issue form, which takes a
proposed change, an example of the element as it stands, or both; contributions are
exported automatically to `suggestions/suggestions.csv`.

## Structure

```
deliverables/
  ORI_Benefits_Overview_brief.md          The brief: ten benefits in three axes,
                                          with who benefits from each (v0.4, Nov 2026)
  Benefits_map.md                         Flow map (Mermaid), generated from
                                          site/data/taxonomy.json
site/
  index.html, style.css, app.js, i18n.js  Interactive explorer (EN/DE/ES, light/dark,
                                          shareable deep links)
  theme.js                                Applies the stored theme before first paint
  about/                                  What it is, how it works and
                                          references, as its own page
                                          (index.html + about.js)
  draft/                                  Full stakeholder taxonomy explorer,
                                          published as an explicitly labeled draft
                                          exercise (not reviewed by WG7-TF2)
  data/taxonomy.json                      Machine-readable brief: the single source
                                          of truth for explorer and map
  data/vocabularies.json                  Controlled lists that describe the
                                          suggestion process, not the framework
  fonts/                                  Self-hosted Inter variable woff2
scripts/
  generate-diagram.mjs                    Regenerates deliverables/Benefits_map.md
                                          from the JSON (npm run diagram)
  generate-options.mjs                    Regenerates the option lists shared by
                                          both suggestion channels (npm run options)
  generate-sheet.mjs                      Describes the spreadsheet channel from the
                                          same sources (npm run sheet)
  build-sheet.py                          Turns that description into an xlsx with
                                          data validation, to import into the
                                          shared WG7-TF2 spreadsheet
tests/
  data.test.mjs                           Counts, referential integrity, exact match
                                          with the brief's groupings
  i18n.test.mjs                           Locale parity across en/de/es
  draft.test.mjs                          The draft taxonomy: integrity, locale
                                          parity, and agreement with the brief
  site.test.mjs                           Page invariants: hidden state, small-screen
                                          navigation and credit line, link targets,
                                          asset versioning, the security policy
  options.test.mjs                        The shared option lists: both channels offer
                                          the same closed vocabularies, every option
                                          carries an id that resolves
  export.test.mjs                         The contract between the issue form and the
                                          CSV exporter: every question reaches the data
  sheet.test.mjs                          The spreadsheet channel asks the same
                                          questions and states the same terms
suggestions/
  suggestions.csv                         Automatic export of the suggestion issues
  options.csv                             Generated: the closed lists to paste into
                                          the shared spreadsheet as validation ranges
  contribution-terms.md                   Generated: the terms every channel states,
                                          in the words the issue form uses
  sheet-plan.json                         Generated: the spreadsheet channel's columns,
                                          closed lists and terms
  export-columns.json                     The frozen column order of the export; the
                                          shared sheet imports it by position
  WG7TF2-suggestions-sheet.xlsx           Generated: that plan as an importable sheet
.github/ISSUE_TEMPLATE/suggest-change.yml Structured issue form for proposing edits;
                                          the explorer's button opens it pre-filled
.github/workflows/pages.yml               Pages deploy on push (tests gate it)
.github/workflows/suggestions-export.yml  Keeps suggestions.csv in sync with issues
_ref/                                     Source material and internal TF2 material
                                          (private, not versioned)
```

## Status (2026-11-25)

WG7-TF2 has not yet reviewed the brief. Coordinators: Christian, Ricardo, Bianca, Barbara.
Version 0.1 is the work of Task Force 2; every change since then is a proposal to it.

- **v0.4** (2026-11-25): B1, B2 and B8 were rewritten around research information as the
  Barcelona Declaration defines it. Their texts described research itself (reproducible
  results, ethics approvals, misconduct), which the Declaration does not mention and the
  six case responses hardly report.
- **v0.3** (2026-11-14, B4 reworded on 2026-11-25): the six responses in the WG7 case study
  collection were read against the benefits. B10 Reuse & Collective Action was added to
  Axis II, B9 was split into two parts (the publishing system made observable, and
  independence from proprietary sources), two phrases that B7 shared with B4 were removed
  from B7, and B4 now covers the quality of the information itself.
- **v0.2** (2026-08-26): one case study, from the University of Milan, was read against
  the benefits. B9 Strategic Steering & Institutional Autonomy was added to Axis II, and
  the clause "open science policy implementation" was removed from B2.

The last three sections of the brief give the reason for each change.

| Milestone | Status |
| --- | --- |
| Benefits overview brief | v0.4 (2026-11-25); v0.3 2026-11-14; v0.2 2026-08-26; v0.1 circulated Feb 2026 |
| Interactive explorer + benefits map | Live on GitHub Pages, regenerated for v0.4 |
| Full stakeholder and benefits taxonomy | Published as an explicitly labeled draft exercise (site/draft/), at v1.1: the draft of January 2026 with B9 and B10 added, to keep its parity contract with the brief; every category has the benefits of its roles |
| Suggestion channels | GitHub issue form and shared spreadsheet, both generated from the taxonomy; a comment on any cell of the sheet counts as a contribution |
| Cases read against the benefits | Six, the responses in the WG7 case study collection on 2026-11-14. Two of them were first read on 2026-08-26: the University of Milan response, and a second one chosen because it has no costs in it |
| Community review by WG7-TF2 | Not yet held |
| Zenodo DOI / publication | Archived at v0.4.1 (2026-11-25), concept DOI [10.5281/zenodo.22231440](https://doi.org/10.5281/zenodo.22231440); archived as a working document, not as an agreed framework |

## Tests

```
npm test
```

Node's built-in runner, no dependencies. Seven layers:

1. **The framework**: counts and referential integrity of `site/data/taxonomy.json`; axis
   and outcome groupings must match the brief. In all three languages it also checks that
   B2 does not contain "policy implementation", that B7 does not contain the two phrases
   moved to B4, that B9 has both of its parts, and that B4 mentions checking the
   information against its source.
2. **i18n**: identical key sets, matching placeholders, full locale coverage, and array
   lengths pinned where overlays align by index.
3. **The draft taxonomy**: its own integrity, that every category has the benefits of its
   roles, and that it may extend the brief without contradicting it.
4. **Page invariants**: every stylesheet neutralizes `hidden`; the collapsed rail keeps
   navigation and the credit line; relative links and script sources resolve; every local
   asset link carries the same `?v=`; every page carries a strict Content-Security-Policy
   and no inline script or style.
5. **The option lists and the contribution terms**: both channels offer the same closed
   vocabularies, every option resolves to a taxonomy id, and all three locales name the
   licence.
6. **The form-to-CSV contract**: every label the exporter reads exists in the form, every
   question reaches the CSV, the required fields are pinned, and the column order is
   append-only, since the shared spreadsheet imports by position.
7. **The spreadsheet channel**: its plan carries the same closed lists as the form, an
   agreement column, and the terms verbatim with the licence URL spelled out.

The checks cover failures that show no error. Two examples: a renamed form label exports an
empty column while the CSV still opens, and an asset left at the previous `?v=` leaves the
page blank after a deploy that reported success.

## Run locally

The explorer is static; serve `site/` with any HTTP server:

```
python3 -m http.server 8000 --directory site
```

To regenerate the benefits map after editing `site/data/taxonomy.json`:

```
npm run diagram
```

To regenerate the option lists after editing any taxonomy or the process vocabulary:

```
npm run options
```

To regenerate the spreadsheet channel's plan, and then the importable sheet:

```
npm run sheet
python3 scripts/build-sheet.py     # needs openpyxl; the built .xlsx is committed
```

That rewrites the dropdowns in the issue form and `suggestions/options.csv`, which holds
the same closed lists as columns, ready to paste into the shared spreadsheet as
data-validation ranges. Both channels record the same strings, so the two sets of
suggestions merge without a hand-kept mapping table.

## Deploy

`.github/workflows/pages.yml` deploys `site/` to GitHub Pages via Actions (verbatim
upload, no Jekyll) on every push to main, with the test suite as a gate.

GitHub Pages sends no security headers, so each page declares a Content-Security-Policy in
a `<meta http-equiv>`: `default-src 'none'`, then `'self'` for scripts, styles, fonts and
the taxonomy fetch. Nothing loads from another origin. `frame-ancestors` needs a response
header Pages cannot send, so clickjacking is not covered.

Editing anything under `site/` means bumping the `?v=` on every asset link, all to the same
number.

## Caveats

The brief is a v0.4 working document that WG7-TF2 has not reviewed; wording and groupings
may change as a result. B9, B10 and the changes to B1, B2, B4, B7 and B8 are the proposals of one
member of the task force. They rest on six self-selected case responses (B9 and B2 on the
first two), read by one coder without a codebook. Such a reading shows where the framework
has no place for what a case reports. It cannot settle the wording of a benefit or say how
often a benefit occurs. It is a
qualitative framework for advocacy and communication, not a measurement instrument: it
does not rank benefits, weigh them against each other, or support quantitative claims
about the size of any benefit. The German and Spanish texts in the explorer are working
translations of the English v0.4, which remains the authoritative wording.

## Note

Source documents (Barcelona Declaration PDFs in English and Spanish, the TF2 data
collection spreadsheet, and TF2 internal documentation with meeting notes) live in
`_ref/`, excluded from versioning. Deliverables are intended for the WG7-TF2 community.

## License

All content in this repository (the brief, the benefits map, and the explorer) is licensed
under [Creative Commons Attribution 4.0 International (CC BY
4.0)](https://creativecommons.org/licenses/by/4.0/); see [LICENSE](LICENSE).

That covers what the repository publishes, not what a contributor submits. The suggestion
channels state their own terms: contributions, including examples, are made under CC BY 4.0
with attribution, and the issue form asks for that agreement before a suggestion can be
filed. The wording lives in `site/data/vocabularies.json` and is generated into every
channel; see `suggestions/contribution-terms.md`.

## Citation

If you use this brief, its taxonomy or the explorer, please cite it: see
[`CITATION.cff`](CITATION.cff) or the "Cite this repository" button on GitHub. Archived on
Zenodo: concept DOI [10.5281/zenodo.22231440](https://doi.org/10.5281/zenodo.22231440),
which always resolves to the latest version. Cite that one; the version DOI
([10.5281/zenodo.24527855](https://doi.org/10.5281/zenodo.24527855) for v0.4.1) is only for
pinning a specific snapshot.

The authors are cited as Hartley Belmar, Ricardo (ORCID
[0000-0001-5058-9309](https://orcid.org/0000-0001-5058-9309)) and Barcelona Declaration on
Open Research Information, Working Group 7, Task Force 2.

Every archived version is a working document: WG7-TF2 has not reviewed it, and the
changes since v0.1 are proposals to the task force. The abstract of each Zenodo record
says that it is a working document and names the changes that are proposals. A version that the group agrees will be archived under the same concept
DOI.
