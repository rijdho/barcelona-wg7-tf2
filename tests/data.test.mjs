// Integrity of site/data/taxonomy.json against the v1.0 framework:
// counts, referential integrity, and consistency with the source document's
// stakeholder-role-benefit matrix. Aimed at silent failures: a mistyped id
// still renders, it just drops a connection.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "site", "data", "taxonomy.json"), "utf8"));

const benefitIds = new Set(data.benefits.map((b) => b.id));
const roleIds = new Set(data.roles.map((r) => r.id));
const axisIds = new Set(data.axes.map((a) => a.id));

test("framework counts match the v1.0 taxonomy", () => {
  assert.equal(data.benefits.length, 8, "eight benefit dimensions B1-B8");
  assert.equal(data.stakeholders.length, 11, "eleven stakeholder categories");
  assert.equal(data.roles.length, 8, "eight functional roles");
  assert.equal(data.axes.length, 3, "three axes");
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

test("every reference resolves", () => {
  for (const r of data.roles) {
    for (const b of r.primaryBenefits) assert.ok(benefitIds.has(b), `${r.id} -> ${b}`);
  }
  for (const s of data.stakeholders) {
    for (const r of s.roles) assert.ok(roleIds.has(r), `${s.id} -> ${r}`);
    for (const b of s.primaryBenefits) assert.ok(benefitIds.has(b), `${s.id} -> ${b}`);
  }
});

test("no dead ends: every role and benefit is reachable from a stakeholder", () => {
  const usedRoles = new Set(data.stakeholders.flatMap((s) => s.roles));
  assert.deepEqual([...usedRoles].sort(), [...roleIds].sort(), "every role has a holder");
  const usedBenefits = new Set([
    ...data.stakeholders.flatMap((s) => s.primaryBenefits),
    ...data.roles.flatMap((r) => r.primaryBenefits),
  ]);
  assert.deepEqual([...usedBenefits].sort(), [...benefitIds].sort(), "every benefit is delivered");
});

test("matrix rows match section 5 of the source document exactly", () => {
  const expect = {
    S1: { roles: ["R1", "R5", "R2"], benefits: ["B1", "B2", "B3", "B5"] },
    S2: { roles: ["R1"], benefits: ["B1", "B2", "B3"] },
    S3: { roles: ["R4", "R2"], benefits: ["B2", "B5", "B8", "B1", "B3"] },
    S4: { roles: ["R3", "R5"], benefits: ["B1", "B4", "B7", "B2"] },
    S5: { roles: ["R4", "R2"], benefits: ["B2", "B5", "B8", "B1", "B3"] },
    S6: { roles: ["R6", "R7"], benefits: ["B1", "B6", "B8", "B4"] },
    S7: { roles: ["R5", "R3"], benefits: ["B1", "B2", "B4", "B7"] },
    S8: { roles: ["R3"], benefits: ["B1", "B4", "B7"] },
    S9: { roles: ["R3", "R8"], benefits: ["B1", "B4", "B7", "B5"] },
    S10: { roles: ["R7", "R4", "R3"], benefits: ["B4", "B6", "B8", "B2", "B5", "B1", "B7"] },
    S11: { roles: ["R7", "R3", "R5"], benefits: ["B4", "B6", "B8", "B1", "B2", "B7"] },
  };
  for (const s of data.stakeholders) {
    assert.deepEqual(s.roles, expect[s.id].roles, `${s.id} roles`);
    assert.deepEqual(s.primaryBenefits, expect[s.id].benefits, `${s.id} benefits`);
  }
});

test("role primary benefits match section 4 of the source document exactly", () => {
  const expect = {
    R1: ["B1", "B2", "B3"],
    R2: ["B1", "B3", "B5"],
    R3: ["B1", "B4", "B7"],
    R4: ["B2", "B5", "B8"],
    R5: ["B1", "B2"],
    R6: ["B1", "B6", "B8"],
    R7: ["B4", "B6", "B8"],
    R8: ["B5", "B7"],
  };
  for (const r of data.roles) assert.deepEqual(r.primaryBenefits, expect[r.id], `${r.id}`);
});
