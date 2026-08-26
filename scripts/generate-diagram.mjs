#!/usr/bin/env node
// Regenerates deliverables/Benefits_map.md from site/data/taxonomy.json.
// The JSON is the single source of truth; never edit the .md by hand.
// Run: node scripts/generate-diagram.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "site", "data", "taxonomy.json"), "utf8"));

const lines = [];
lines.push("# The Nine Benefits of Open Research Information");
lines.push("");
lines.push(
  `Generated from \`site/data/taxonomy.json\` (brief v${data.version}) by`,
  "`scripts/generate-diagram.mjs`. Do not edit by hand; edit the JSON and regenerate.",
  ""
);
lines.push("```mermaid");
lines.push("flowchart TB");
lines.push("  accTitle: The nine benefits of open research information");
lines.push(
  "  accDescr: The Barcelona Declaration commitments unlock Open Research Information, which delivers nine benefits in three axes; the benefits flow into trustworthy research, sustainable innovation, and societal impact, leading to research that is visible, valued, and impactful."
);
lines.push('  START["Barcelona Declaration<br/>4 commitments"] --> ORI["Open Research Information<br/>structured · open · machine-readable"]');
for (const a of data.axes) lines.push(`  ORI --> ${a.id}["${a.name.en}"]`);
for (const b of data.benefits) lines.push(`  ${b.axis} --> ${b.id}["${b.id}: ${b.name.en}"]`);
for (const o of data.outcomes) {
  lines.push(`  ${o.id}["${o.name.en}"]`);
  for (const bId of o.benefits) lines.push(`  ${bId} --> ${o.id}`);
}
lines.push(`  VISION["${data.vision.name.en}"]`);
for (const o of data.outcomes) lines.push(`  ${o.id} --> VISION`);
lines.push("```");
lines.push("");
lines.push(
  "Read top to bottom: the Declaration's commitments unlock ORI; ORI delivers the nine",
  "benefit dimensions grouped in three axes; the benefits flow into three outcomes and,",
  "together, into the vision. Definitions and who benefits from each dimension are in",
  "`ORI_Benefits_Overview_brief.md`.",
  ""
);

writeFileSync(join(root, "deliverables", "Benefits_map.md"), lines.join("\n"));
console.log("Wrote deliverables/Benefits_map.md");
