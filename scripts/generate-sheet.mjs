#!/usr/bin/env node
// Describes the spreadsheet channel's structure, from the same sources the
// issue form uses, so both channels ask the same questions with the same closed
// lists and state the same terms. The plan is data; scripts/build-sheet.py
// turns it into an xlsx with real data validation for import into the shared
// WG7-TF2 spreadsheet.
//
// Two steps rather than one because this repo carries no dependencies and Node
// has no xlsx writer here. The taxonomy stays the single source either way.
//
// Run: node scripts/generate-sheet.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => JSON.parse(readFileSync(join(root, ...p), "utf8"));

const brief = read("site", "data", "taxonomy.json");
const draft = read("site", "draft", "data", "taxonomy.json");
const vocab = read("site", "data", "vocabularies.json");

const label = (n, suffix) => `${n.id} · ${n.name.en} (${suffix})`;
const briefSuffix = `brief v${brief.version}`;

const lists = {
  Node: [
    label(brief.vision, briefSuffix),
    ...brief.axes.map((a) => label(a, briefSuffix)),
    ...brief.benefits.map((b) => label(b, briefSuffix)),
    ...brief.outcomes.map((o) => label(o, briefSuffix)),
  ],
  Contribution: [...vocab.contributionType],
  TypeOfChange: [...vocab.typeOfChange, vocab.otherOption],
  Perspective: [
    ...draft.stakeholders.map((s) => `${s.id} · ${s.name.en}`),
    vocab.otherOption,
  ],
  Agreement: ["Yes"],
};

// Column order mirrors the issue form, so someone moving between the two
// channels meets the same questions in the same sequence. Date and Status are
// the spreadsheet's own: on the GitHub side the issue itself carries them.
const columns = [
  { header: "Date", list: null },
  { header: "Name / affiliation", list: null },
  { header: "Node", list: "Node" },
  { header: "What are you contributing?", list: "Contribution" },
  { header: "Type of change", list: "TypeOfChange" },
  { header: "Suggestion", list: null },
  { header: "Why", list: null },
  { header: "Perspective", list: "Perspective" },
  { header: "Example", list: null },
  { header: "I agree to the terms", list: "Agreement" },
  { header: "Status (coordinators)", list: null },
];

// The notice carries a markdown link the form renders; a cell cannot, so the
// URL is spelled out instead of dropped.
const terms = vocab.contributionTerms;
const notice = terms.notice.replace(
  /\[([^\]]+)\]\(([^)]+)\)/g,
  (_, text, url) => `${text} (${url})`
);

// The sheet is the only channel with a comment thread on every cell, and the
// columns below make it look like a row is the only way in. Saying so is worth
// a line: a member who will not fill eleven fields will still leave a comment.
const commentsNote = vocab.channelNotes.spreadsheetComments;

writeFileSync(
  join(root, "suggestions", "sheet-plan.json"),
  JSON.stringify(
    {
      generatedBy: "scripts/generate-sheet.mjs",
      generatedFrom: [
        "site/data/taxonomy.json",
        "site/draft/data/taxonomy.json",
        "site/data/vocabularies.json",
      ],
      sheetName: "Suggestions (brief)",
      listsSheetName: "Lists (generated)",
      notice,
      commentsNote,
      acknowledgement: terms.acknowledgement,
      columns,
      lists,
    },
    null,
    2
  ) + "\n"
);

console.log(
  `Wrote suggestions/sheet-plan.json (${columns.length} columns, ` +
    `${Object.values(lists).filter((l) => l.length > 1).length} validated lists)`
);
