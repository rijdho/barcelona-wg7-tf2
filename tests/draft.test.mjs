// Integrity of the draft explorer (site/draft/): the full stakeholder and
// benefits taxonomy, its own UI dictionary, and the parity contract with the
// published brief. The draft is a proposal, but it may not silently
// contradict the nine benefits it extends.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { UI, LOCALES } from "../site/draft/i18n.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => JSON.parse(readFileSync(join(root, ...p), "utf8"));
const draft = read("site", "draft", "data", "taxonomy.json");
const brief = read("site", "data", "taxonomy.json");

const benefitIds = new Set(draft.benefits.map((b) => b.id));
const roleIds = new Set(draft.roles.map((r) => r.id));

test("draft counts match the published draft framework", () => {
  assert.equal(draft.stakeholders.length, 11, "eleven stakeholder categories");
  assert.equal(draft.roles.length, 8, "eight functional roles");
  assert.equal(draft.benefits.length, 9, "nine benefit dimensions");
  assert.equal(draft.axes.length, 3, "three axes");
});

test("every reference in the draft resolves", () => {
  for (const s of draft.stakeholders) {
    for (const r of s.roles) assert.ok(roleIds.has(r), `${s.id} points at role ${r}`);
    for (const b of s.primaryBenefits) assert.ok(benefitIds.has(b), `${s.id} points at benefit ${b}`);
  }
  for (const r of draft.roles) {
    for (const b of r.primaryBenefits) assert.ok(benefitIds.has(b), `${r.id} points at benefit ${b}`);
  }
  for (const b of draft.benefits) {
    assert.ok(draft.axes.some((a) => a.id === b.axis), `${b.id} points at a real axis`);
  }
});

test("no node is stranded: the drawn map reaches everything", () => {
  for (const r of roleIds) {
    assert.ok(draft.stakeholders.some((s) => s.roles.includes(r)), `${r} is claimed by a stakeholder`);
  }
  for (const b of benefitIds) {
    const reached = draft.roles.some((r) => r.primaryBenefits.includes(b)) ||
      draft.stakeholders.some((s) => s.primaryBenefits.includes(b));
    assert.ok(reached, `${b} is reachable from a role or stakeholder`);
  }
});

test("the draft does not contradict the brief", () => {
  const grouping = (d) => Object.fromEntries(d.axes.map((a) => [a.id, [...a.benefits].sort()]));
  assert.deepEqual(grouping(draft), grouping(brief), "same benefits in the same axes");
  for (const b of brief.benefits) {
    const twin = draft.benefits.find((x) => x.id === b.id);
    assert.ok(twin, `${b.id} exists in the draft`);
    assert.equal(twin.name.en, b.name.en, `${b.id} keeps the brief's English name`);
    assert.equal(twin.axis, b.axis, `${b.id} keeps the brief's axis`);
  }
});

test("draft UI dictionaries have identical key sets and placeholders", () => {
  assert.deepEqual([...LOCALES].sort(), ["de", "en", "es"]);
  assert.deepEqual(Object.keys(UI).sort(), ["de", "en", "es"]);
  const enKeys = Object.keys(UI.en).sort();
  const placeholders = (s) => (s.match(/\{[a-zA-Z]+\}/g) || []).sort();
  for (const loc of LOCALES) {
    assert.deepEqual(Object.keys(UI[loc]).sort(), enKeys, `keys of ${loc}`);
    for (const key of enKeys) {
      assert.deepEqual(placeholders(UI[loc][key]), placeholders(UI.en[key]), `${loc}.${key}`);
    }
  }
});

// Locale overlays that align by array index are the most fragile thing here:
// an example inserted in one language and not the others lands silently on
// the wrong item. Pin the lengths.
test("every translatable field carries all three locales, arrays aligned", () => {
  const assertField = (obj, path) => {
    assert.deepEqual(Object.keys(obj).sort(), ["de", "en", "es"], `${path} locales`);
    const lengths = LOCALES.map((l) => (Array.isArray(obj[l]) ? obj[l].length : null));
    if (lengths[0] === null) {
      for (const l of LOCALES) {
        assert.ok(typeof obj[l] === "string" && obj[l].length > 0, `${path}.${l} non-empty`);
      }
    } else {
      assert.equal(new Set(lengths).size, 1, `${path} array lengths aligned: ${lengths}`);
      assert.ok(lengths[0] > 0, `${path} non-empty`);
    }
  };
  for (const a of draft.axes) assertField(a.name, `${a.id}.name`);
  for (const b of draft.benefits) {
    assertField(b.name, `${b.id}.name`);
    assertField(b.definition, `${b.id}.definition`);
  }
  for (const r of draft.roles) {
    assertField(r.name, `${r.id}.name`);
    assertField(r.definition, `${r.id}.definition`);
  }
  for (const s of draft.stakeholders) {
    assertField(s.name, `${s.id}.name`);
    assertField(s.description, `${s.id}.description`);
    assertField(s.examples, `${s.id}.examples`);
  }
});
