// i18n parity for the explorer: UI dictionary key parity and placeholder
// parity across en/de/es, and full locale coverage of every translatable
// field in taxonomy.json.

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

test("every translatable field carries all three locales", () => {
  assertLocalized(data.vision.name, "vision.name");
  for (const a of data.axes) assertLocalized(a.name, `${a.id}.name`);
  for (const o of data.outcomes) assertLocalized(o.name, `${o.id}.name`);
  for (const b of data.benefits) {
    assertLocalized(b.name, `${b.id}.name`);
    assertLocalized(b.description, `${b.id}.description`);
    assertLocalized(b.whoBenefits, `${b.id}.whoBenefits`);
  }
});
