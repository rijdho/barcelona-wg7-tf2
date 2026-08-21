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
  const header = workflow.match(/const header = \[([\s\S]*?)\];/);
  assert.ok(header, "the exporter declares a header");
  const columns = [...header[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
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
