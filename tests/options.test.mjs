// The controlled option lists shared by the suggestion channels. Aimed at the
// silent failure this file exists to prevent: a hand-edited dropdown still
// renders and still records an answer, it just records a string that no longer
// joins back to the taxonomy. Two stakeholders were collapsed into one option
// that way before the lists were generated.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { UI, LOCALES } from "../site/i18n.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => JSON.parse(readFileSync(join(root, ...p), "utf8"));
const text = (...p) => readFileSync(join(root, ...p), "utf8");

const brief = read("site", "data", "taxonomy.json");
const draft = read("site", "draft", "data", "taxonomy.json");
const vocab = read("site", "data", "vocabularies.json");
const form = text(".github", "ISSUE_TEMPLATE", "suggest-change.yml");
const csv = text("suggestions", "options.csv");
const termsDoc = text("suggestions", "contribution-terms.md");

// Reads one generated block out of the issue form, ignoring its comment lines.
function formOptions(marker) {
  const open = `# <generated:${marker}>`;
  const start = form.indexOf(open);
  assert.notEqual(start, -1, `the form carries a <generated:${marker}> block`);
  const end = form.indexOf("# </generated>", start);
  assert.notEqual(end, -1, `the <generated:${marker}> block is closed`);
  return form
    .slice(start, end)
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2));
}

// Minimal reader for the rectangle the generator writes: every field quoted,
// no embedded newlines. Splitting on bare commas would cut "Governance, Ethics
// & Compliance" in half, so read the quotes.
function csvRow(line) {
  const fields = [];
  const re = /"((?:[^"]|"")*)"(?:,|$)/g;
  let m;
  while ((m = re.exec(line)) !== null) fields.push(m[1].replace(/""/g, '"'));
  return fields;
}

function csvColumns() {
  const rows = csv.trim().split("\n").map(csvRow);
  const [header, ...body] = rows;
  const out = {};
  header.forEach((name, i) => {
    out[name] = body.map((r) => r[i]).filter((v) => v !== "");
  });
  return out;
}

const columns = csvColumns();

test("the perspective list is the stakeholder taxonomy, one option each", () => {
  const options = formOptions("perspective");
  assert.equal(options.length, draft.stakeholders.length + 1, "eleven stakeholders plus Other");
  assert.deepEqual(
    options,
    [...draft.stakeholders.map((s) => `${s.id} · ${s.name.en}`), vocab.otherOption],
    "in taxonomy order, each carrying its id"
  );
  for (const s of draft.stakeholders) {
    const matches = options.filter((o) => o.startsWith(`${s.id} · `));
    assert.equal(matches.length, 1, `${s.id} has exactly one option of its own`);
  }
});

test("every recorded perspective joins back to a stakeholder", () => {
  const ids = new Set(draft.stakeholders.map((s) => s.id));
  for (const option of formOptions("perspective")) {
    if (option === vocab.otherOption) continue;
    const id = option.split(" · ")[0];
    assert.ok(ids.has(id), `${option} resolves to a stakeholder id`);
  }
});

test("the type-of-change list comes from the process vocabulary", () => {
  assert.deepEqual(formOptions("kind"), [...vocab.typeOfChange, vocab.otherOption]);
});

test("the contribution list comes from the process vocabulary", () => {
  assert.deepEqual(formOptions("contribution"), vocab.contributionType);
});

// The form exists to collect two different things, and an example on its own is
// one of them. Making the change proposal required again would still render, and
// would still look like a working form; it would just turn everyone who came to
// share an example away, or make them invent a change they do not want.
test("an example can be contributed without proposing a change", () => {
  const fields = [...form.matchAll(/^ {4}id: (\w+)\n(?: {4}attributes:\n)?[\s\S]*?(?=^ {2}- type:|\Z)/gm)];
  const required = (id) => {
    const block = fields.find((f) => f[1] === id);
    assert.ok(block, `the form has a field called ${id}`);
    return /validations:\s*\n\s*required: true/.test(block[0]);
  };
  assert.ok(required("node"), "the node is always required: a suggestion must be about something");
  assert.ok(required("contribution"), "and so is saying what you are contributing");
  assert.ok(!required("proposal"), "the change proposal is optional");
  assert.ok(!required("kind"), "so is the type of change, which an example does not have");
});

// Contribution terms. The silent failure here is legal rather than visual: a
// notice that renders while the acknowledgement is optional, or a checkbox that
// agrees to something the notice never said, both look fine and record nothing
// we could rely on when reusing an example.
test("the issue form states the contribution terms and requires agreement", () => {
  const terms = vocab.contributionTerms;
  assert.ok(terms.notice.includes(terms.licence), "the notice names the licence");
  assert.ok(terms.acknowledgement.includes(terms.licence), "so does the acknowledgement");
  assert.ok(form.includes(terms.notice), "the form carries the notice verbatim");

  const start = form.indexOf("# <generated:terms-ack>");
  assert.notEqual(start, -1, "the form carries the acknowledgement block");
  const block = form.slice(start, form.indexOf("# </generated>", start));
  assert.ok(block.includes(`- label: ${terms.acknowledgement}`), "verbatim acknowledgement");
  assert.match(block, /^\s*required: true$/m, "agreement is required, not optional");
});

test("every channel states the same terms in the same words", () => {
  const terms = vocab.contributionTerms;
  assert.ok(termsDoc.includes(terms.notice), "the shared terms carry the notice");
  assert.ok(termsDoc.includes(terms.acknowledgement), "and the acknowledgement");
});

test("the explorer tells contributors the terms before they leave for the form", () => {
  // Trilingual floor: a licensing statement in English only would not reach the
  // German and Spanish readers the explorer explicitly serves.
  for (const lang of LOCALES) {
    assert.match(
      UI[lang].contribUseBody,
      /CC BY 4\.0/,
      `the ${lang} contribute text names the licence`
    );
  }
});

test("the spreadsheet offers the same closed lists as the issue form", () => {
  assert.deepEqual(columns.type_of_change, formOptions("kind"), "same types of change");
  assert.deepEqual(columns.perspective, formOptions("perspective"), "same perspectives");
});

test("spreadsheet node labels match what the explorer prefills", () => {
  // site/app.js and site/draft/app.js build `${id} · ${name.en} (…)`; a change
  // there without a regeneration here splits one answer into two strings.
  const briefExpected = [
    brief.vision,
    ...brief.axes,
    ...brief.benefits,
    ...brief.outcomes,
  ].map((n) => `${n.id} · ${n.name.en} (brief v${brief.version})`);
  assert.deepEqual(columns.node_brief, briefExpected);

  const draftExpected = [
    ...draft.axes,
    ...draft.benefits,
    ...draft.stakeholders,
    ...draft.roles,
  ].map((n) => `${n.id} · ${n.name.en} (taxonomy v${draft.version})`);
  assert.deepEqual(columns.node_draft, draftExpected);
});

test("the explorers still build the node label the generated lists assume", () => {
  for (const app of ["app.js", join("draft", "app.js")]) {
    const src = text("site", app);
    assert.match(
      src,
      /\$\{id\} · \$\{[^}]+\}[^`]*v\$\{d\.version\}/,
      `site/${app} builds "id · name (… vX)"`
    );
  }
});
