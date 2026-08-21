// The spreadsheet channel's plan. The sheet is the channel that needs no
// account, so it is the one most likely to drift: nobody runs a test when they
// edit a Google Sheet. What can be pinned here is the plan the sheet is built
// from, which must ask the same questions as the issue form, offer the same
// closed lists, and carry the same terms.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => JSON.parse(readFileSync(join(root, ...p), "utf8"));
const text = (...p) => readFileSync(join(root, ...p), "utf8");

const plan = read("suggestions", "sheet-plan.json");
const brief = read("site", "data", "taxonomy.json");
const draft = read("site", "draft", "data", "taxonomy.json");
const vocab = read("site", "data", "vocabularies.json");
const form = text(".github", "ISSUE_TEMPLATE", "suggest-change.yml");

const formOptions = (marker) => {
  const start = form.indexOf(`# <generated:${marker}>`);
  return form
    .slice(start, form.indexOf("# </generated>", start))
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2));
};

test("the sheet offers the same closed lists as the issue form", () => {
  assert.deepEqual(plan.lists.Contribution, formOptions("contribution"));
  assert.deepEqual(plan.lists.TypeOfChange, formOptions("kind"));
  assert.deepEqual(plan.lists.Perspective, formOptions("perspective"));
});

test("the sheet's node list is the brief, labelled as the explorer labels it", () => {
  const expected = [
    brief.vision,
    ...brief.axes,
    ...brief.benefits,
    ...brief.outcomes,
  ].map((n) => `${n.id} · ${n.name.en} (brief v${brief.version})`);
  assert.deepEqual(plan.lists.Node, expected);
});

// The sheet asked for none of this before: node was free text hinted "e.g. B6",
// there was no question about what you were contributing, and no terms at all.
// A contributor using the channel that needs no account was the one contributor
// nobody asked.
test("the sheet asks what is being contributed, and for agreement", () => {
  const headers = plan.columns.map((c) => c.header);
  assert.ok(headers.includes("What are you contributing?"), "the first question is asked");
  assert.ok(headers.includes("I agree to the terms"), "agreement is asked");
  const validated = plan.columns.filter((c) => c.list).map((c) => c.header);
  for (const h of ["Node", "What are you contributing?", "Type of change", "Perspective"]) {
    assert.ok(validated.includes(h), `${h} is a closed list, not free text`);
  }
});

test("the sheet states the same terms as every other channel", () => {
  const terms = vocab.contributionTerms;
  assert.equal(plan.acknowledgement, terms.acknowledgement, "verbatim acknowledgement");
  // A cell cannot render a markdown link, so the URL is spelled out rather
  // than dropped along with the licence it points at.
  assert.ok(plan.notice.includes(terms.licence), "the notice names the licence");
  assert.ok(plan.notice.includes(terms.url), "and keeps the link as a readable URL");
  assert.ok(!plan.notice.includes("]("), "with no markdown syntax left in the cell");
});

test("every perspective on the sheet resolves to a stakeholder", () => {
  const ids = new Set(draft.stakeholders.map((s) => s.id));
  for (const option of plan.lists.Perspective) {
    if (option === vocab.otherOption) continue;
    assert.ok(ids.has(option.split(" · ")[0]), `${option} resolves`);
  }
});
