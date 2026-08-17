// i18n parity for the explorer: UI dictionary key parity and placeholder
// parity across en/de/es, and full locale coverage of every translatable
// field in taxonomy.json, with example-array lengths pinned (index-aligned
// lists are the most fragile thing in a repo).

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { UI, LOCALES } from "../site/i18n.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "site", "data", "taxonomy.json"), "utf8"));

test("locales are exactly en, de, es", () => {
  assert.deepEqual([...LOCALES].sort(), ["de", "en", "es"]);
  assert.deepEqual(Object.keys(UI).sort(), ["de", "en", "es"]);
});

test("UI dictionaries have identical key sets", () => {
  const enKeys = Object.keys(UI.en).sort();
  for (const loc of LOCALES) {
    assert.deepEqual(Object.keys(UI[loc]).sort(), enKeys, `keys of ${loc}`);
  }
});

test("UI placeholders match across locales", () => {
  const placeholders = (s) => (s.match(/\{[a-zA-Z]+\}/g) || []).sort();
  for (const key of Object.keys(UI.en)) {
    const expected = placeholders(UI.en[key]);
    for (const loc of LOCALES) {
      assert.deepEqual(placeholders(UI[loc][key]), expected, `${loc}.${key}`);
    }
  }
});

function assertLocalized(obj, path) {
  assert.deepEqual(Object.keys(obj).sort(), ["de", "en", "es"], `${path} locales`);
  for (const loc of LOCALES) {
    assert.ok(typeof obj[loc] === "string" && obj[loc].length > 0, `${path}.${loc} non-empty`);
  }
}

test("every translatable taxonomy field carries all three locales", () => {
  for (const a of data.axes) assertLocalized(a.name, `${a.id}.name`);
  for (const b of data.benefits) {
    assertLocalized(b.name, `${b.id}.name`);
    assertLocalized(b.definition, `${b.id}.definition`);
  }
  for (const r of data.roles) {
    assertLocalized(r.name, `${r.id}.name`);
    assertLocalized(r.definition, `${r.id}.definition`);
  }
  for (const s of data.stakeholders) {
    assertLocalized(s.name, `${s.id}.name`);
    assertLocalized(s.description, `${s.id}.description`);
  }
});

test("example arrays are index-aligned across locales", () => {
  for (const s of data.stakeholders) {
    assert.deepEqual(Object.keys(s.examples).sort(), ["de", "en", "es"], `${s.id}.examples locales`);
    const len = s.examples.en.length;
    assert.ok(len > 0, `${s.id} has examples`);
    for (const loc of LOCALES) {
      assert.equal(s.examples[loc].length, len, `${s.id}.examples.${loc} length`);
    }
  }
});
