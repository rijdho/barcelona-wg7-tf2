#!/usr/bin/env node
// Regenerates the controlled option lists that every suggestion channel shares,
// so the GitHub issue form and the shared spreadsheet cannot drift apart.
//
// Sources of truth, in order of authority:
//   site/data/taxonomy.json        the brief: vision, axes, benefits, outcomes
//   site/draft/data/taxonomy.json  the draft: stakeholders (the "perspective" list)
//   site/data/vocabularies.json    process lists that belong to no taxonomy
//
// Writes:
//   .github/ISSUE_TEMPLATE/suggest-change.yml  dropdown options and the
//                                              contribution terms, between markers
//   suggestions/options.csv                    the same lists, one column each,
//                                              to paste into the spreadsheet as
//                                              data-validation ranges
//   suggestions/contribution-terms.md          the same terms, for every channel
//                                              that is not the issue form
//
// Every option carries its id, so a recorded answer joins back to the taxonomy
// without a hand-kept mapping table. Run: node scripts/generate-options.mjs
//
// Open decision: the stakeholder list still lives in site/draft/, which is
// labeled a draft not reviewed by WG7-TF2, while the issue form it feeds is an
// official channel. Promote the list once WG7-TF2 agrees it, and change the one
// path below.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => JSON.parse(readFileSync(join(root, ...p), "utf8"));

const brief = read("site", "data", "taxonomy.json");
const draft = read("site", "draft", "data", "taxonomy.json");
const vocab = read("site", "data", "vocabularies.json");

// The explorer builds its prefilled node the same way (site/app.js, site/draft/app.js).
// Keep the three in step: the string is what lands in the recorded answer.
const label = (node, suffix) => `${node.id} · ${node.name.en} (${suffix})`;

const briefSuffix = `brief v${brief.version}`;
const draftSuffix = `taxonomy v${draft.version}`;

const briefNodes = [
  label(brief.vision, briefSuffix),
  ...brief.axes.map((a) => label(a, briefSuffix)),
  ...brief.benefits.map((b) => label(b, briefSuffix)),
  ...brief.outcomes.map((o) => label(o, briefSuffix)),
];

const draftNodes = [
  ...draft.axes.map((a) => label(a, draftSuffix)),
  ...draft.benefits.map((b) => label(b, draftSuffix)),
  ...draft.stakeholders.map((s) => label(s, draftSuffix)),
  ...draft.roles.map((r) => label(r, draftSuffix)),
];

// "Your perspective" is the stakeholder taxonomy, not a free list: S10 and S11
// are separate stakeholders and stay separate here.
const perspectives = [
  ...draft.stakeholders.map((s) => `${s.id} · ${s.name.en}`),
  vocab.otherOption,
];

const typesOfChange = [...vocab.typeOfChange, vocab.otherOption];

// What the contributor is bringing. Asked first, because the form allows an
// example on its own and everything after it is optional in that case.
const contributionTypes = [...vocab.contributionType];

const terms = vocab.contributionTerms;

// --- the issue form -------------------------------------------------------
// Only the option blocks are generated; the prose around them is authored.

const formPath = join(root, ".github", "ISSUE_TEMPLATE", "suggest-change.yml");
let form = readFileSync(formPath, "utf8");

// Replaces everything between a pair of markers. The comment syntax differs by
// where the block sits: YAML comments inside the form, HTML comments inside a
// markdown value, which YAML would otherwise read as more YAML.
function replaceBlock(text, marker, lines, { indent = "        ", html = false } = {}) {
  const open = html ? `${indent}<!-- <generated:${marker}> -->` : `${indent}# <generated:${marker}>`;
  const close = html ? `${indent}<!-- </generated> -->` : `${indent}# </generated>`;
  const escape = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escape(open)}[\\s\\S]*?${escape(close)}`, "m");
  if (!pattern.test(text)) throw new Error(`marker <generated:${marker}> not found in the issue form`);
  return text.replace(pattern, [open, ...lines, close].join("\n"));
}

const provenance = (source) =>
  `${source} by scripts/generate-options.mjs; do not edit by hand`;

form = replaceBlock(form, "contribution", [
  `        # from ${provenance("site/data/vocabularies.json")}`,
  ...contributionTypes.map((o) => `        - ${o}`),
]);
form = replaceBlock(form, "kind", [
  `        # from ${provenance("site/data/vocabularies.json")}`,
  ...typesOfChange.map((o) => `        - ${o}`),
]);
form = replaceBlock(form, "perspective", [
  `        # from ${provenance("site/draft/data/taxonomy.json")}`,
  ...perspectives.map((o) => `        - ${o}`),
]);

// The terms are stated up front and acknowledged at the point of submission.
// Keeping both ends of that in one JSON field is the point: a notice that
// promises one thing while the checkbox agrees to another is worse than neither.
form = replaceBlock(
  form,
  "terms-notice",
  [`        ${terms.notice}`],
  { html: true }
);
form = replaceBlock(form, "terms-ack", [
  `        # from ${provenance("site/data/vocabularies.json")}`,
  `        - label: ${terms.acknowledgement}`,
  "          required: true",
]);
writeFileSync(formPath, form);

// --- the spreadsheet ------------------------------------------------------
// One column per controlled list, padded to a rectangle so a paste lands square.

const columns = [
  ["node_brief", briefNodes],
  ["node_draft", draftNodes],
  ["contribution", contributionTypes],
  ["type_of_change", typesOfChange],
  ["perspective", perspectives],
];

const quote = (v) => `"${String(v).replace(/"/g, '""')}"`;
const height = Math.max(...columns.map(([, values]) => values.length));
const rows = [columns.map(([name]) => quote(name)).join(",")];
for (let i = 0; i < height; i++) {
  rows.push(columns.map(([, values]) => quote(values[i] ?? "")).join(","));
}
writeFileSync(join(root, "suggestions", "options.csv"), rows.join("\n") + "\n");

// --- the terms, for every channel that is not the issue form -------------

writeFileSync(
  join(root, "suggestions", "contribution-terms.md"),
  [
    "# Contribution terms",
    "",
    `Generated from \`site/data/vocabularies.json\` by \`scripts/generate-options.mjs\`.`,
    "Do not edit by hand. Every suggestion channel states the same terms: the GitHub",
    "issue form carries them as a notice and a required acknowledgement, and any other",
    "channel (the shared WG7-TF2 spreadsheet, a form, an email call for input) must",
    "carry them too, in these words.",
    "",
    "## Notice, shown before the contributor fills anything in",
    "",
    terms.notice,
    "",
    "## Acknowledgement, agreed at the point of submission",
    "",
    `- [ ] ${terms.acknowledgement}`,
    "",
  ].join("\n")
);

console.log(
  `Wrote .github/ISSUE_TEMPLATE/suggest-change.yml (${contributionTypes.length} ` +
    `contribution types, ${typesOfChange.length} types of change, ` +
    `${perspectives.length} perspectives, terms), suggestions/options.csv ` +
    `(${briefNodes.length} brief nodes, ${draftNodes.length} draft nodes) ` +
    `and suggestions/contribution-terms.md`
);
