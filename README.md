# The Value of Open Research Information (Barcelona Declaration WG7-TF2)

**The eight transformative benefits of Open Research Information, as an interactive
explorer.**

Contribution to Task Force 2 of Working Group 7 of the Barcelona Declaration on Open
Research Information. The brief maps what research systems gain when information about
research is open: eight benefit dimensions in three axes (Quality & Trust, Collaboration &
Innovation, Impact & Relevance), flowing into trustworthy research, sustainable innovation,
and societal impact.

🔗 **Live:** https://rijdho.github.io/barcelona-wg7-tf2/

The explorer is available in **English, German and Spanish** (auto-detected, switchable)
and runs entirely in the browser: nothing is tracked, nothing is sent anywhere. Its
"Suggest a change" button opens a pre-filled GitHub issue form; suggestions are exported
automatically to `suggestions/suggestions.csv`.

## Structure

```
deliverables/
  ORI_Benefits_Overview_brief.md          The brief: eight benefits in three axes,
                                          with who benefits from each (v1.0, Feb 2026)
  Benefits_map.md                         Flow map (Mermaid), generated from
                                          site/data/taxonomy.json
site/
  index.html, style.css, app.js, i18n.js  Interactive explorer (EN/DE/ES, light/dark,
                                          shareable deep links, About view with
                                          references)
  data/taxonomy.json                      Machine-readable brief: the single source
                                          of truth for explorer and map
  fonts/                                  Self-hosted Inter variable woff2
scripts/
  generate-diagram.mjs                    Regenerates deliverables/Benefits_map.md
                                          from the JSON (npm run diagram)
tests/
  data.test.mjs                           Counts, referential integrity, exact match
                                          with the brief's groupings
  i18n.test.mjs                           Locale parity across en/de/es
suggestions/
  suggestions.csv                         Automatic export of the suggestion issues
.github/ISSUE_TEMPLATE/suggest-change.yml Structured issue form for proposing edits;
                                          the explorer's button opens it pre-filled
.github/workflows/pages.yml               Pages deploy on push (tests gate it)
.github/workflows/suggestions-export.yml  Keeps suggestions.csv in sync with issues
_ref/                                     Source material and internal TF2 material
                                          (private, not versioned)
```

## Status (2026-08-17)

TF2 is being restarted. A WG7 meeting is set for 1 September 2026 (15:00 CEST, Zoom); the
invitation asks members to review the TF2 working documents ahead of it. Coordinators:
Christian, Ricardo, Bianca, Barbara.

| Milestone | Status |
| --- | --- |
| Benefits overview brief v1.0 | Done (Feb 2026); circulating to WG7 as "brief v0.1" |
| Interactive explorer + benefits map | Live on GitHub Pages (2026-08-17) |
| Full stakeholder and benefits taxonomy | In community review through the WG7 process; unpublished |
| Community review by WG7-TF2 | Starts with the 1 September 2026 meeting |
| Zenodo DOI / publication | Pending |

## Tests

```
npm test
```

Node's built-in runner, no dependencies. Two layers: framework counts and referential
integrity of `site/data/taxonomy.json` (axis and outcome groupings must match the brief
exactly), and i18n parity (identical key sets, matching placeholders, full locale coverage
of every translatable field). The suite was proven non-vacuous by injecting a dangling
outcome reference and a missing locale: both were caught.

## Run locally

The explorer is static; serve `site/` with any HTTP server:

```
python3 -m http.server 8000 --directory site
```

To regenerate the benefits map after editing `site/data/taxonomy.json`:

```
npm run diagram
```

## Deploy

`.github/workflows/pages.yml` deploys `site/` to GitHub Pages via Actions (verbatim
upload, no Jekyll) on every push to main, with the test suite as a gate.

## Caveats

The brief is a v1.0 working document awaiting community review by WG7-TF2 (starting with
the 1 September 2026 meeting); wording and groupings may change as a result. It is a
qualitative framework for advocacy and communication, not a measurement instrument: it
does not rank benefits, weigh them against each other, or support quantitative claims
about the size of any benefit. The German and Spanish texts in the explorer are working
translations of the English v1.0, which remains the authoritative wording.

## Note

Source documents (Barcelona Declaration PDFs in English and Spanish, the TF2 data
collection spreadsheet, and TF2 internal documentation with meeting notes) live in
`_ref/`, excluded from versioning. Deliverables are intended for the WG7-TF2 community.

## License

All content in this repository (the brief, the benefits map, and the explorer) is licensed
under [Creative Commons Attribution 4.0 International (CC BY
4.0)](https://creativecommons.org/licenses/by/4.0/); see [LICENSE](LICENSE).
