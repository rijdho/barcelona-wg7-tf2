# The Value of Open Research Information (Barcelona Declaration WG7-TF2)

**The nine transformative benefits of Open Research Information, as an interactive
explorer.**

Contribution to Task Force 2 of Working Group 7 of the Barcelona Declaration on Open
Research Information. The brief maps what research systems gain when information about
research is open: nine benefit dimensions in three axes (Quality & Trust, Collaboration &
Innovation, Impact & Relevance), flowing into trustworthy research, sustainable innovation,
and societal impact.

🔗 **Live:** https://rijdho.github.io/barcelona-wg7-tf2/

The explorer is available in **English, German and Spanish** (auto-detected, switchable)
and runs entirely in the browser: nothing is tracked, nothing is sent anywhere. Its
"Suggest a change or example" button opens a pre-filled GitHub issue form, which takes a
proposed change, an example of the element as it stands, or both; contributions are
exported automatically to `suggestions/suggestions.csv`.

## Structure

```
deliverables/
  ORI_Benefits_Overview_brief.md          The brief: nine benefits in three axes,
                                          with who benefits from each (v0.2, Aug 2026)
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
                                          real data validation, to import into the
                                          shared WG7-TF2 spreadsheet
tests/
  data.test.mjs                           Counts, referential integrity, exact match
                                          with the brief's groupings
  i18n.test.mjs                           Locale parity across en/de/es
  draft.test.mjs                          The draft taxonomy: integrity, locale
                                          parity, and agreement with the brief
  site.test.mjs                           Page invariants: hidden state, small-screen
                                          navigation and credit line, link targets,
                                          asset versioning
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

## Status (2026-08-26)

TF2 is being restarted. A WG7 meeting is set for 1 September 2026 (15:00 CEST, Zoom); the
invitation asks members to review the TF2 working documents ahead of it. Coordinators:
Christian, Ricardo, Bianca, Barbara.

The brief moved to **v0.2** on 2026-08-26: a ninth benefit, **B9 Strategic Steering &
Institutional Autonomy**, joins Axis II, and B2 gives up the clause that made it absorb
every institutional case. Both changes came out of placing a real TF1 case study against
the framework rather than out of rereading the definitions, and both are proposals put to
the task force at the September meeting, not decisions it has taken. See the brief's
closing section for what changed and why.

| Milestone | Status |
| --- | --- |
| Benefits overview brief | v0.2 (2026-08-26); v0.1 circulated Feb 2026 |
| Interactive explorer + benefits map | Live on GitHub Pages, regenerated for v0.2 |
| Full stakeholder and benefits taxonomy | Published as an explicitly labeled draft exercise (site/draft/); extended to B9 to keep its parity contract with the brief |
| Suggestion channels | GitHub issue form and shared spreadsheet, both generated from the taxonomy; a comment on any cell of the sheet counts as a contribution |
| First case placed against the framework | University of Milan (WG7 case study collection), 2026-08-26; the source of the v0.2 changes |
| Community review by WG7-TF2 | Starts with the 1 September 2026 meeting |
| Zenodo DOI / publication | v0.2.0, archived on Zenodo (2026-08-26) |

## Tests

```
npm test
```

Node's built-in runner, no dependencies. Seven layers:

1. **The framework**: counts and referential integrity of `site/data/taxonomy.json`; axis
   and outcome groupings must match the brief exactly. Since v0.2 it also pins the pair of
   changes that only work together: B2 may not, in any of the three languages, reclaim the
   "policy implementation" clause that B9 was added to hold, or the two compete for the
   same cases again with nothing on screen looking different.
2. **i18n**: identical key sets, matching placeholders, full locale coverage of every
   translatable field, and array lengths pinned where locale overlays align by index.
3. **The draft taxonomy**: its own integrity, plus the contract that it may extend the
   brief but not contradict it (same benefit ids, same axes, same English names).
4. **Page invariants**: the failures that still render. Every stylesheet neutralizes the
   `hidden` attribute; the collapsed rail keeps navigation and the credit line; relative
   links resolve; local asset links carry a `?v=` so a redeploy reaches cached browsers.
5. **The shared option lists and the contribution terms**: both suggestion channels offer
   the same closed vocabularies, every option carries an id that resolves back to the
   taxonomy, no two stakeholders share an option, and the node labels still match what the
   explorers prefill. The terms are stated verbatim wherever they appear, agreement is
   required rather than optional, and all three locales name the licence.
6. **The form-to-CSV contract**: the exporter finds its columns by matching the form's
   labels verbatim, so every label it reads must exist in the form and every question the
   form asks must reach the CSV. This is the layer with no visible symptom at all: a
   renamed label exports an empty string for every issue from then on, and the file still
   parses, still opens in Excel and still looks complete. The same layer pins which fields
   are required, because a form that demands a change proposal turns away everyone who
   came to share an example and still looks like it works. It pins the column order as
   append-only, because the shared spreadsheet imports the file by position, so an
   inserted column shifts everything after it in a document this repository cannot see.
   It also pins the committed CSV to the exporter's columns: that file is only rebuilt
   when an issue event fires, so a new column otherwise leaves the checkout a column short
   until somebody happens to file one.
7. **The spreadsheet channel**: the sheet needs no account, which also means nobody runs
   a test when they edit it. What can be pinned is the plan it is built from: the same
   closed lists as the issue form, node labelled as the explorer labels it, the question
   about what is being contributed, an agreement column, and the terms verbatim with the
   licence URL spelled out, since a cell cannot render a link. It also pins the line that
   says a comment on any cell counts as a contribution, and that the terms still apply to
   one, so the cheapest way in does not become the way around the licence.

The suite is proven non-vacuous by injection. A dangling outcome reference and a missing
locale were caught when the first two files were written; the draft and page layers were
checked the same way, with six further defects: a removed `[hidden]` rule, a small-screen
rule that hides navigation and the credit line again, a broken relative link, an
unversioned stylesheet link, a draft benefit moved to another axis, and an example dropped
from one language. The option and terms layer was checked with six more: two stakeholders
collapsed back into one option, a benefit renamed without regenerating, the explorer's
label format changed on its own, an acknowledgement turned optional, a notice hand-edited
to a different licence than the checkbox agrees to, and the licence sentence dropped from
the Spanish text. The export layer was checked with four: a form label renamed while the
exporter kept the old one, a new field nobody exports, an absent acknowledgement recorded
as a refusal, and a row value with no header column above it. The reframed form was
checked with three: the change proposal made required again, the new field left out of the
export, and the contribution list hand-edited away from the vocabulary. The CSV-shape
check was added after it caught a real one: a column added to the exporter while the
committed file kept the old header. The spreadsheet layer was checked with four: the
agreement column removed, node returned to free text, the perspective list drifting from
the form, and the notice losing the licence URL. The column order was checked with three
more: a column inserted in the middle, two columns swapped, and a column appended, which
has to pass. The comment line was checked with three: the sentence hand-edited away from
the vocabulary, its clause about the terms dropped, and the line removed altogether. The
B2/B9 pairing was checked with three more: the clause restored to B2's English text, the
same restored only in Spanish, and B9 moved to another axis. Every injected defect failed the suite, and the append passed.

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

## Caveats

The brief is a v0.2 working document awaiting community review by WG7-TF2 (starting with
the 1 September 2026 meeting); wording and groupings may change as a result. B9 and the
narrowing of B2 are the proposals of one coordinator on the evidence of one case, which is
enough to show that a gap exists and not enough to fix its wording. It is a
qualitative framework for advocacy and communication, not a measurement instrument: it
does not rank benefits, weigh them against each other, or support quantitative claims
about the size of any benefit. The German and Spanish texts in the explorer are working
translations of the English v0.2, which remains the authoritative wording.

## Note

Source documents (Barcelona Declaration PDFs in English and Spanish, the TF2 data
collection spreadsheet, and TF2 internal documentation with meeting notes) live in
`_ref/`, excluded from versioning. Deliverables are intended for the WG7-TF2 community.

## License

All content in this repository (the brief, the benefits map, and the explorer) is licensed
under [Creative Commons Attribution 4.0 International (CC BY
4.0)](https://creativecommons.org/licenses/by/4.0/); see [LICENSE](LICENSE).

That covers what the repository publishes, not what a contributor submits, so the
suggestion channels state their own terms rather than leaving them implied: contributions,
including examples, are made under CC BY 4.0 with attribution, and the issue form asks for
that agreement explicitly before a suggestion can be filed. The wording lives in
`site/data/vocabularies.json` and is generated into every channel, so no channel can state
different terms from the others; see `suggestions/contribution-terms.md`.

## Citation

If you use this brief, its taxonomy or the explorer, please cite it: see
[`CITATION.cff`](CITATION.cff) or the "Cite this repository" button on GitHub. Archived on
Zenodo; cite the concept DOI, which always resolves to the latest version.
