// The contract between the issue form and the CSV exporter. Aimed at the
// silent failure that has no visible symptom at all: the exporter finds its
// columns by matching the form's labels verbatim, so renaming a label makes
// that column export an empty string for every issue, from then on, while the
// CSV still parses, still opens in Excel and still looks complete. Adding a
// field and forgetting to export it is the same failure seen from the other
// side, and it is how the contribution acknowledgement was collected for a
// while without ever reaching the working dataset.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const text = (...p) => readFileSync(join(root, ...p), "utf8");

const form = text(".github", "ISSUE_TEMPLATE", "suggest-change.yml");
const workflow = text(".github", "workflows", "suggestions-export.yml");
const csv = text("suggestions", "suggestions.csv");
const frozen = JSON.parse(text("suggestions", "export-columns.json"));

const declaredHeader = () => {
  const m = workflow.match(/const header = \[([\s\S]*?)\];/);
  assert.ok(m, "the exporter declares a header");
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
};

// Field labels sit at six spaces; a checkbox option's label is deeper and
// prefixed with "- ", so it cannot be mistaken for one.
const formLabels = [...form.matchAll(/^ {6}label: (.+)$/gm)].map((m) => m[1].trim());

// The exporter escapes the labels for a regular expression; undo that to
// compare with what the form actually says.
const exported = [...workflow.matchAll(/(?:section|checked)\(i\.body, "(.+?)"\)/g)].map((m) =>
  m[1].replace(/\\\\([()[\]{}.*+?^$|\\])/g, "$1")
);

// A field deliberately left out of the CSV goes here, with the reason. Empty is
// the healthy state: every question we ask a contributor ends up in the data.
const NOT_EXPORTED = new Map();

test("the form asks the questions we think it asks", () => {
  assert.ok(formLabels.length > 0, "labels were found at all");
  assert.equal(new Set(formLabels).size, formLabels.length, "no two fields share a label");
});

test("every column the exporter reads exists in the form", () => {
  for (const label of exported) {
    assert.ok(
      formLabels.includes(label),
      `the exporter reads "${label}", which no form field is called; that column would ` +
        `export an empty string for every issue`
    );
  }
});

test("every question the form asks reaches the CSV", () => {
  for (const label of formLabels) {
    if (NOT_EXPORTED.has(label)) continue;
    assert.ok(
      exported.includes(label),
      `the form asks "${label}" but nothing exports it; add it to the CSV or record ` +
        `why it stays out in NOT_EXPORTED`
    );
  }
});

test("the CSV header has a column for every value the exporter emits", () => {
  const columns = declaredHeader();
  const row = workflow.match(/\.map\(\(i\) => \[([\s\S]*?)\]\);/);
  assert.ok(row, "the exporter builds a row");
  const values = row[1]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.endsWith(","));
  assert.equal(
    values.length,
    columns.length,
    "a row with more values than headers shifts every later column by one"
  );
});

// The committed CSV is a build product of a workflow that only runs on issue
// events, so adding a column to the exporter leaves the file in the repository
// a column short until somebody happens to file an issue. Until then anyone
// reading it from the checkout, or diffing it, sees the old shape, and nothing
// says the two disagree.
test("the committed CSV has the columns the exporter now emits", () => {
  const header = csv.replace(/^\uFEFF/, "").split(/\r?\n/)[0];
  const columns = [...header.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(
    columns,
    declaredHeader(),
    "regenerate suggestions/suggestions.csv, or run the export workflow, after changing " +
      "the exporter's columns"
  );
});

// The shared WG7-TF2 spreadsheet imports suggestions.csv with IMPORTDATA, which
// maps by position, not by name. Inserting or reordering a column shifts every
// formula, filter and note keyed to a column letter on the other side, in
// silence, in a document this repository cannot see. It already happened once,
// when contribution went in at position six. Appending is the only safe change,
// so the frozen order is asserted as a prefix: adding at the end passes, moving
// anything does not.
test("the export's column order only ever grows at the end", () => {
  const columns = declaredHeader();
  assert.deepEqual(
    columns.slice(0, frozen.columns.length),
    frozen.columns,
    "a column was inserted, reordered or removed; the spreadsheet imports this file " +
      "by position, so append new columns at the end instead"
  );
});

// A test issue is still a real issue: it carries the label, so the exporter would
// hand it to the coordinators as data. Excluding it by label keeps the record on
// GitHub without putting it in front of everyone who opens the shared sheet.
test("pipeline tests stay out of the working dataset", () => {
  assert.match(
    workflow,
    /!labelled\(i, "pipeline-test"\)/,
    "the exporter filters out issues labelled pipeline-test"
  );
});

test("the acknowledgement is recorded, and silence is not read as refusal", () => {
  assert.ok(
    exported.includes("Contribution terms"),
    "consent travels with the data, not only in the issue body"
  );
  assert.match(
    workflow,
    /const header = \[[\s\S]*?"terms_agreed"[\s\S]*?\];/,
    "the CSV carries a terms_agreed column"
  );
  // Issues filed before the field existed have no section: those contributors
  // were never asked, which is not the same as having declined.
  assert.match(
    workflow,
    /const checked = \(body, label\) => \{\s*\n\s*const v = section\(body, label\);\s*\n\s*if \(!v\) return "";/,
    "an absent section stays empty rather than becoming a no"
  );
});
