// Integrity of site/data/taxonomy.json against the brief ("Eight
// Transformative Benefits", v0.1): counts, referential integrity, and
// cross-consistency of the axis and outcome groupings. Aimed at silent
// failures: a mistyped id still renders, it just drops a connection.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "site", "data", "taxonomy.json"), "utf8"));

const benefitIds = new Set(data.benefits.map((b) => b.id));
const axisIds = new Set(data.axes.map((a) => a.id));
const outcomeIds = new Set(data.outcomes.map((o) => o.id));

test("framework counts match the brief", () => {
  assert.equal(data.benefits.length, 8, "eight benefit dimensions");
  assert.equal(data.axes.length, 3, "three axes");
  assert.equal(data.outcomes.length, 3, "three outcomes");
  assert.equal(data.vision.id, "V1", "one vision node");
  assert.deepEqual(
    [...benefitIds].sort(),
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
    "benefit ids are B1-B8"
  );
});

test("axes partition the benefits exactly", () => {
  const fromAxes = data.axes.flatMap((a) => a.benefits).sort();
  assert.deepEqual(fromAxes, [...benefitIds].sort(), "every benefit in exactly one axis");
  for (const b of data.benefits) {
    assert.ok(axisIds.has(b.axis), `${b.id} points at a real axis`);
    const axis = data.axes.find((a) => a.id === b.axis);
    assert.ok(axis.benefits.includes(b.id), `${b.id}'s axis lists it back`);
  }
});

test("outcomes partition the benefits exactly", () => {
  const fromOutcomes = data.outcomes.flatMap((o) => o.benefits).sort();
  assert.deepEqual(fromOutcomes, [...benefitIds].sort(), "every benefit in exactly one outcome");
  for (const b of data.benefits) {
    assert.ok(outcomeIds.has(b.outcome), `${b.id} points at a real outcome`);
    const outcome = data.outcomes.find((o) => o.id === b.outcome);
    assert.ok(outcome.benefits.includes(b.id), `${b.id}'s outcome lists it back`);
  }
});

test("axis and outcome groupings match the brief exactly", () => {
  const axisMap = Object.fromEntries(data.axes.map((a) => [a.id, [...a.benefits].sort()]));
  assert.deepEqual(axisMap, {
    A1: ["B1", "B2", "B8"],
    A2: ["B3", "B4", "B7"],
    A3: ["B5", "B6"],
  });
  const outcomeMap = Object.fromEntries(data.outcomes.map((o) => [o.id, [...o.benefits].sort()]));
  assert.deepEqual(outcomeMap, {
    O1: ["B1", "B2", "B8"],
    O2: ["B3", "B4", "B7"],
    O3: ["B5", "B6"],
  });
});
