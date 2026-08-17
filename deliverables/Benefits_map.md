# Stakeholder and Benefits Map

Generated from `site/data/taxonomy.json` (taxonomy v1.0) by
`scripts/generate-diagram.mjs`. Do not edit by hand; edit the JSON and regenerate.

```mermaid
flowchart LR
  accTitle: ORI stakeholder and benefits map
  accDescr: Eleven stakeholder categories connect through eight functional roles to eight benefit dimensions grouped into three axes: Quality and Trust, Collaboration and Innovation, Impact and Relevance.
  subgraph SH["Stakeholder categories"]
    S1["Research-Performing Institutions"]
    S2["Individual Researchers"]
    S3["Funders"]
    S4["Research Infrastructure Providers"]
    S5["Policy Makers and Evaluators"]
    S6["Civil Society and NGOs"]
    S7["Libraries and Research Managers"]
    S8["Publishers and Journals"]
    S9["Technology and Service Providers"]
    S10["Intergovernmental Organizations"]
    S11["Networks and Alliances"]
  end
  subgraph RO["Functional roles"]
    R1["Producer"]
    R2["Evaluator"]
    R3["Enabler"]
    R4["Policy Maker"]
    R5["Support & Stewardship"]
    R6["Advocate / Civil Actor"]
    R7["Coordinator / Facilitator"]
    R8["Data Analyst"]
  end
  subgraph A1["Quality & Trust"]
    B1["B1: Research Output Quality & Traceability"]
    B2["B2: Governance, Ethics & Compliance"]
    B8["B8: Integrity & Accountability"]
  end
  subgraph A2["Collaboration & Innovation"]
    B3["B3: Capacity Building & Inclusive Training"]
    B4["B4: Interoperability & Metadata Quality"]
    B7["B7: Infrastructure & Technical Enablement"]
  end
  subgraph A3["Impact & Relevance"]
    B5["B5: Evaluation for Learning & Responsibility"]
    B6["B6: Visibility, Equity & Societal Relevance"]
  end
  S1 --> R1
  S1 --> R5
  S1 --> R2
  S2 --> R1
  S3 --> R4
  S3 --> R2
  S4 --> R3
  S4 --> R5
  S5 --> R4
  S5 --> R2
  S6 --> R6
  S6 --> R7
  S7 --> R5
  S7 --> R3
  S8 --> R3
  S9 --> R3
  S9 --> R8
  S10 --> R7
  S10 --> R4
  S10 --> R3
  S11 --> R7
  S11 --> R3
  S11 --> R5
  R1 --> B1
  R1 --> B2
  R1 --> B3
  R2 --> B1
  R2 --> B3
  R2 --> B5
  R3 --> B1
  R3 --> B4
  R3 --> B7
  R4 --> B2
  R4 --> B5
  R4 --> B8
  R5 --> B1
  R5 --> B2
  R6 --> B1
  R6 --> B6
  R6 --> B8
  R7 --> B4
  R7 --> B6
  R7 --> B8
  R8 --> B5
  R8 --> B7
```

Edges read left to right: a stakeholder category acts through its typical functional
roles, and each role primarily delivers the benefit dimensions it points to. The full
per-stakeholder benefit list (including secondary mappings) is in section 5 of
`Taxonomy_ORI_Stakeholders_Benefits.md`.
