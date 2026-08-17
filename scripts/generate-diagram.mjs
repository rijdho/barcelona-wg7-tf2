#!/usr/bin/env node
// Regenerates deliverables/Benefits_map.md from site/data/taxonomy.json.
// The JSON is the single source of truth; never edit the .md by hand.
// Run: node scripts/generate-diagram.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "site", "data", "taxonomy.json"), "utf8"));

const axisName = (id) => data.axes.find((a) => a.id === id).name.en;
const lines = [];

lines.push("# Stakeholder and Benefits Map");
lines.push("");
lines.push(
  `Generated from \`site/data/taxonomy.json\` (taxonomy v${data.version}) by`,
  "`scripts/generate-diagram.mjs`. Do not edit by hand; edit the JSON and regenerate.",
  ""
);
lines.push("```mermaid");
lines.push("flowchart LR");
lines.push("  accTitle: ORI stakeholder and benefits map");
lines.push(
  "  accDescr: Eleven stakeholder categories connect through eight functional roles to eight benefit dimensions grouped into three axes: Quality and Trust, Collaboration and Innovation, Impact and Relevance."
);
lines.push('  subgraph SH["Stakeholder categories"]');
for (const s of data.stakeholders) lines.push(`    ${s.id}["${s.name.en}"]`);
lines.push("  end");
lines.push('  subgraph RO["Functional roles"]');
for (const r of data.roles) lines.push(`    ${r.id}["${r.name.en}"]`);
lines.push("  end");
for (const a of data.axes) {
  lines.push(`  subgraph ${a.id}["${axisName(a.id)}"]`);
  for (const bId of a.benefits) {
    const b = data.benefits.find((x) => x.id === bId);
    lines.push(`    ${b.id}["${b.id}: ${b.name.en}"]`);
  }
  lines.push("  end");
}
for (const s of data.stakeholders) for (const r of s.roles) lines.push(`  ${s.id} --> ${r}`);
for (const r of data.roles) for (const b of r.primaryBenefits) lines.push(`  ${r.id} --> ${b}`);
lines.push("```");
lines.push("");
lines.push(
  "Edges read left to right: a stakeholder category acts through its typical functional",
  "roles, and each role primarily delivers the benefit dimensions it points to. The full",
  "per-stakeholder benefit list (including secondary mappings) is in section 5 of",
  "`Taxonomy_ORI_Stakeholders_Benefits.md`.",
  ""
);

writeFileSync(join(root, "deliverables", "Benefits_map.md"), lines.join("\n"));
console.log("Wrote deliverables/Benefits_map.md");
