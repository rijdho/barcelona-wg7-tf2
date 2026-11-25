// Integrity of site/data/taxonomy.json against the brief ("Ten
// Transformative Benefits", v0.5): counts, referential integrity, and
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
  assert.equal(data.benefits.length, 10, "ten benefit dimensions");
  assert.equal(data.axes.length, 3, "three axes");
  assert.equal(data.outcomes.length, 3, "three outcomes");
  assert.equal(data.vision.id, "V1", "one vision node");
  assert.deepEqual(
    [...benefitIds].sort(),
    ["B1", "B10", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
    "benefit ids are B1-B10"
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
    A2: ["B10", "B3", "B4", "B7", "B9"],
    A3: ["B5", "B6"],
  });
  const outcomeMap = Object.fromEntries(data.outcomes.map((o) => [o.id, [...o.benefits].sort()]));
  assert.deepEqual(outcomeMap, {
    O1: ["B1", "B2", "B8"],
    O2: ["B10", "B3", "B4", "B7", "B9"],
    O3: ["B5", "B6"],
  });
});

// B9 and the narrowing of B2 were adopted together, in v0.2, and only make
// sense together. B2 used to claim "open science policy implementation", which
// absorbs almost any institutional case, because almost every institutional
// case is a policy being implemented: in the trial coding of the University of
// Milan case it took the primary slot by default rather than by fit. B9 is
// where those cases go now. Put the clause back while B9 exists and the two
// compete again, silently, with nothing rendering differently.
test("B2 does not reclaim what B9 was added to hold", () => {
  const b2 = data.benefits.find((b) => b.id === "B2");
  const b9 = data.benefits.find((b) => b.id === "B9");
  assert.ok(b9, "B9 exists");
  for (const loc of ["en", "de", "es"]) {
    assert.doesNotMatch(
      b2.description[loc],
      /policy implementation|Open-Science-Policies|políticas de ciencia abierta/i,
      `B2 (${loc}) leaves policy implementation to B9`
    );
  }
  assert.equal(b9.axis, "A2", "B9 sits in Collaboration & Innovation");
  assert.equal(b9.outcome, "O2", "and flows into Sustainable Innovation");
});

// v0.3 took "technical standards implementation" and "service interoperability"
// out of B7 because they overlapped with B4: in one coder's reading of the six
// case responses, the three from infrastructures fit both. B4 is the information, B7 the
// service that holds it. Put either phrase back and the pair collides again.
// B4 (reworded 2026-11-25): three case responses name quality or traceability and mean
// the information itself. The description has to say that open information can be checked
// against its source, in every language, or the benefit covers only exchange again.
test("B4 covers the quality of the information itself", () => {
  const b4 = data.benefits.find((b) => b.id === "B4");
  const need = { en: /check it against its source/, de: /an der Quelle prüfen/, es: /comprobarla en su fuente/ };
  for (const [loc, re] of Object.entries(need)) {
    assert.match(b4.description[loc], re, `B4 (${loc}) says the information can be checked`);
    assert.doesNotMatch(b4.description[loc], /^(Infrastructure|Die Infrastruktur|La infraestructura)/, `B4 (${loc}) opens with the information, not the infrastructure`);
  }
});

test("B7 does not reclaim what B4 holds", () => {
  const b7 = data.benefits.find((b) => b.id === "B7");
  for (const loc of ["en", "de", "es"]) {
    assert.doesNotMatch(
      b7.description[loc],
      /interoperab|technical standards|technischer Standards|estándares técnicos/i,
      `B7 (${loc}) leaves standards and interoperability to B4`
    );
  }
});

// B9 names two parts since v0.3: (a) the publishing system made observable,
// (b) independence from proprietary sources. A case is coded to one or both,
// so that a later batch of cases can show whether B9 should be split. A locale
// that loses a marker hides one part from the readers of that language.
test("B9 names both of its parts in every locale", () => {
  const b9 = data.benefits.find((b) => b.id === "B9");
  for (const loc of ["en", "de", "es"]) {
    assert.match(b9.description[loc], /\(a\) .+\(b\) /s, `B9 (${loc}) carries (a) and (b)`);
  }
});

test("B10 sits beside B9", () => {
  const b10 = data.benefits.find((b) => b.id === "B10");
  assert.ok(b10, "B10 exists");
  assert.equal(b10.axis, "A2", "B10 sits in Collaboration & Innovation");
  assert.equal(b10.outcome, "O2", "and flows into Sustainable Innovation");
});

// v0.4 rewrote B1, B2 and B8 around research information, as the Barcelona Declaration defines
// it: B1 is what open metadata let people do with an output, B2 that policies can be checked,
// B8 that those who are assessed can audit the information used about them. A locale that
// keeps the older text describes research itself again, and nothing renders differently.
test("B1, B2 and B8 are written about research information", () => {
  const need = {
    B1: { en: /Open metadata on publications/, de: /Offene Metadaten zu Publikationen/, es: /metadatos abiertos de publicaciones/ },
    B2: { en: /check whether its policies/, de: /ob ihre Vorgaben/, es: /si se cumplen sus políticas/ },
    B8: { en: /audit the information used about them/, de: /die über sie verwendeten Informationen/, es: /auditar la información que se usa sobre ellos/ },
  };
  for (const [id, locs] of Object.entries(need)) {
    const b = data.benefits.find((x) => x.id === id);
    for (const [loc, re] of Object.entries(locs)) {
      assert.match(b.description[loc], re, `${id} (${loc}) is about research information`);
    }
  }
});
