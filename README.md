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
                                          with who benefits from each (v0.1, Feb 2026)
  Benefits_map.md                         Flow map (Mermaid), generated from
                                          site/data/taxonomy.json
site/
  index.html, style.css, app.js, i18n.js  Interactive explorer (EN/DE/ES, light/dark,
                                          shareable deep links)
  about/                                  What it is, how it works, credits and
                                          references, as its own page
  draft/                                  Full stakeholder taxonomy explorer,
                                          published as an explicitly labeled draft
                                          exercise (not reviewed by WG7-TF2)
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
  draft.test.mjs                          The draft taxonomy: integrity, locale
                                          parity, and agreement with the brief
  site.test.mjs                           Page invariants: hidden state, small-screen
                                          navigation and credit line, link targets,
                                          asset versioning
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
| Benefits overview brief v0.1 | Done (Feb 2026); circulating to WG7 |
| Interactive explorer + benefits map | Live on GitHub Pages (2026-08-17) |
| Full stakeholder and benefits taxonomy | Published as an explicitly labeled draft exercise (site/draft/); community review runs through the WG7 process |
| Community review by WG7-TF2 | Starts with the 1 September 2026 meeting |
| Zenodo DOI / publication | Pending |

## Tests

```
npm test
```

Node's built-in runner, no dependencies. Four layers:

1. **The framework**: counts and referential integrity of `site/data/taxonomy.json`; axis
   and outcome groupings must match the brief exactly.
2. **i18n**: identical key sets, matching placeholders, full locale coverage of every
   translatable field, and array lengths pinned where locale overlays align by index.
3. **The draft taxonomy**: its own integrity, plus the contract that it may extend the
   brief but not contradict it (same benefit ids, same axes, same English names).
4. **Page invariants**: the failures that still render. Every stylesheet neutralizes the
   `hidden` attribute; the collapsed rail keeps navigation and the credit line; relative
   links resolve; local asset links carry a `?v=` so a redeploy reaches cached browsers.

The suite is proven non-vacuous by injection. A dangling outcome reference and a missing
locale were caught when the first two files were written; the draft and page layers were
checked the same way, with six further defects: a removed `[hidden]` rule, a small-screen
rule that hides navigation and the credit line again, a broken relative link, an
unversioned stylesheet link, a draft benefit moved to another axis, and an example dropped
from one language. Every injected defect failed the suite.

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

The brief is a v0.1 working document awaiting community review by WG7-TF2 (starting with
the 1 September 2026 meeting); wording and groupings may change as a result. It is a
qualitative framework for advocacy and communication, not a measurement instrument: it
does not rank benefits, weigh them against each other, or support quantitative claims
about the size of any benefit. The German and Spanish texts in the explorer are working
translations of the English v0.1, which remains the authoritative wording.

## Note

Source documents (Barcelona Declaration PDFs in English and Spanish, the TF2 data
collection spreadsheet, and TF2 internal documentation with meeting notes) live in
`_ref/`, excluded from versioning. Deliverables are intended for the WG7-TF2 community.

## License

All content in this repository (the brief, the benefits map, and the explorer) is licensed
under [Creative Commons Attribution 4.0 International (CC BY
4.0)](https://creativecommons.org/licenses/by/4.0/); see [LICENSE](LICENSE).
