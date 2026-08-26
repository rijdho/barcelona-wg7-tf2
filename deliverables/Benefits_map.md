# The Nine Benefits of Open Research Information

Generated from `site/data/taxonomy.json` (brief v0.2) by
`scripts/generate-diagram.mjs`. Do not edit by hand; edit the JSON and regenerate.

```mermaid
flowchart TB
  accTitle: The nine benefits of open research information
  accDescr: The Barcelona Declaration commitments unlock Open Research Information, which delivers nine benefits in three axes; the benefits flow into trustworthy research, sustainable innovation, and societal impact, leading to research that is visible, valued, and impactful.
  START["Barcelona Declaration<br/>4 commitments"] --> ORI["Open Research Information<br/>structured · open · machine-readable"]
  ORI --> A1["Quality & Trust"]
  ORI --> A2["Collaboration & Innovation"]
  ORI --> A3["Impact & Relevance"]
  A1 --> B1["B1: Research Output Quality & Traceability"]
  A1 --> B2["B2: Governance, Ethics & Compliance"]
  A1 --> B8["B8: Integrity & Accountability"]
  A2 --> B3["B3: Capacity Building & Inclusive Training"]
  A2 --> B4["B4: Interoperability & Metadata Quality"]
  A2 --> B7["B7: Infrastructure & Technical Enablement"]
  A2 --> B9["B9: Strategic Steering & Institutional Autonomy"]
  A3 --> B5["B5: Evaluation for Learning & Responsibility"]
  A3 --> B6["B6: Visibility, Equity & Societal Relevance"]
  O1["Trustworthy Research"]
  B1 --> O1
  B2 --> O1
  B8 --> O1
  O2["Sustainable Innovation"]
  B3 --> O2
  B4 --> O2
  B7 --> O2
  B9 --> O2
  O3["Societal Impact"]
  B5 --> O3
  B6 --> O3
  VISION["Research that is visible, valued, impactful"]
  O1 --> VISION
  O2 --> VISION
  O3 --> VISION
```

Read top to bottom: the Declaration's commitments unlock ORI; ORI delivers the nine
benefit dimensions grouped in three axes; the benefits flow into three outcomes and,
together, into the vision. Definitions and who benefits from each dimension are in
`ORI_Benefits_Overview_brief.md`.
