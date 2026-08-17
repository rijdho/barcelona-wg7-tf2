# Taxonomy of ORI Stakeholders and Benefits (Barcelona Declaration WG7-TF2)

**A taxonomy of who participates in Open Research Information and what value it creates.**

Contribution to Task Force 2 ("Produce a stakeholder map and a taxonomy of benefits") of
Working Group 7 of the Barcelona Declaration on Open Research Information. The task force maps
who participates in Open Research Information (ORI) and what value it creates, as a basis for
advocacy, case study collection, and policy work.

The framework: eight benefit dimensions (B1-B8) grouped into three axes (Quality & Trust,
Collaboration & Innovation, Impact & Relevance), mapped to eleven stakeholder categories
through eight functional roles.

🔗 **Live:** https://rijdho.github.io/barcelona-wg7-tf2/

The interactive explorer is available in **English, German and Spanish** (auto-detected,
switchable) and runs entirely in the browser: nothing is tracked, nothing is sent anywhere.
Its "Suggest a change" button opens a pre-filled GitHub issue form; suggestions are
exported automatically to `suggestions/suggestions.csv`.

## Structure

```
deliverables/
  Taxonomy_ORI_Stakeholders_Benefits.md   The taxonomy itself: 8 benefit dimensions,
                                          11 stakeholder categories, 8 functional
                                          roles, usage guidelines (v1.0, Jan 2026)
  White_Paper_Taxonomy_Justification.md   White paper arguing the necessity and
                                          design of the taxonomy (v1.0, Jan 2026)
  ORI_Benefits_Overview.md                Overview of the eight benefits with the
                                          ecosystem diagram (v1.0, Feb 2026)
  ORI_Benefits_Overview_brief.md          Condensed brief of the overview, with
                                          references (v1.0, Feb 2026)
  Benefits_map.md                         Stakeholder and benefits map (Mermaid),
                                          generated from site/data/taxonomy.json
site/
  index.html, style.css, app.js, i18n.js  Interactive taxonomy explorer (EN/DE/ES,
                                          light/dark, shareable deep links)
  data/taxonomy.json                      Machine-readable taxonomy: the single
                                          source of truth for explorer and map
  fonts/                                  Self-hosted Inter variable woff2
scripts/
  generate-diagram.mjs                    Regenerates deliverables/Benefits_map.md
                                          from the JSON (npm run diagram)
tests/
  data.test.mjs                           Counts, referential integrity, and exact
                                          match with the source document's matrix
  i18n.test.mjs                           Locale parity and pinned example-array
                                          lengths across en/de/es
qc/
  VERIFICATION_REPORT.md                  URL, date, and consistency verification of
                                          the taxonomy and white paper (2026-01-20)
.github/ISSUE_TEMPLATE/suggest-change.yml Structured issue form for proposing edits;
                                          the explorer's "Suggest a change" button
                                          opens it pre-filled (active once public)
.github/workflows/pages.yml               Pages deploy (manual until repo is public)
.github/workflows/suggestions-export.yml  Keeps suggestions/suggestions.csv in sync
                                          with the taxonomy-suggestion issues
_ref/                                     Source material and internal TF2 material
                                          (private, not versioned)
  drive/                                  Local copies of the Google Drive working
                                          documents (meeting invitation draft, TF2
                                          concept note, brief v0.1)
  correspondencia/                        Slack/email records
```

## Status (2026-08-17)

TF2 is being restarted. A WG7 meeting is set for 1 September 2026 (15:00 CEST, Zoom); the
invitation asks members to review two TF2 working documents ahead of it, so a round of
comments and revision is expected. Coordinators: Christian, Ricardo, Bianca, Barbara.

| Milestone | Status |
| --- | --- |
| Taxonomy v1.0 | Done, verified (qc/VERIFICATION_REPORT.md) |
| White paper v1.0 | Done, verified |
| Benefits overview + brief | Done (Feb 2026); circulating to WG7 as "brief v0.1" |
| Benefits map (visual) | Regenerable Mermaid map from taxonomy.json (2026-08-17); replaced an outdated PNG that showed a pre-v1.0 benefit set |
| Interactive explorer | Live on GitHub Pages (2026-08-17), with prefilled issue-form suggestions and automatic CSV export |
| TF2 Concept Note (scope, activities, outputs) | Draft on Drive; the 4 comments from 2026-03-03 are deliberately left open for the group to see; "Expected outputs 2026-2027" left for task force brainstorm |
| WG7 meeting invitation | Draft by Barbara; approved by Ricardo 2026-08-13, awaiting Christian and Bianca |
| Community review by WG7-TF2 | Starts with the 1 September 2026 meeting |
| Zenodo DOI / publication | Pending |

## Tests

```
npm test
```

Node's built-in runner, no dependencies. Three layers: framework counts and referential
integrity of `site/data/taxonomy.json`; an exact-match check of the stakeholder-role-benefit
matrix against section 5 of the source document; and i18n parity (identical key sets,
matching placeholders, and pinned example-array lengths across en/de/es). The suite was
proven non-vacuous by injecting a dangling benefit reference and a locale length drift:
both were caught.

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

`.github/workflows/pages.yml` deploys `site/` to GitHub Pages via Actions (verbatim upload,
no Jekyll). While the repository is private it runs on manual dispatch only; the flip-day
steps (Pages source and push trigger) are documented in the workflow file.

## Caveats

The taxonomy is a v1.0 awaiting community review by WG7-TF2 (starting with the 1 September
2026 meeting); dimensions, categories, and mappings may change as a result. It is a
qualitative framework for mapping and advocacy, not a measurement instrument: it does not
rank stakeholders, weigh benefits against each other, or support quantitative claims about
the size of any benefit. The German and Spanish texts in the explorer are working
translations of the English v1.0, which remains the authoritative wording.

## Note

Source documents (Barcelona Declaration PDFs in English and Spanish, the TF2 data collection
spreadsheet, and TF2 internal documentation with meeting notes) live in `_ref/`, excluded
from versioning. Deliverables are intended for the WG7-TF2 community.

## License

All content in this repository (taxonomy, white paper, overview documents, benefits map, and
the explorer) is licensed under [Creative Commons Attribution 4.0 International (CC BY
4.0)](https://creativecommons.org/licenses/by/4.0/); see [LICENSE](LICENSE).
