import { UI, LOCALES, detectLocale } from "./i18n.js?v=9";

// Suggestion channel: a prefilled GitHub issue form. An Action exports all
// taxonomy-suggestion issues to suggestions/suggestions.csv in the repo.
const SUGGEST = {
  enabled: true,
  repo: "rijdho/barcelona-wg7-tf2",
  template: "suggest-change.yml",
  sheet: "https://docs.google.com/spreadsheets/d/1J0mUM43U_qRdr67BOf5pl5TBoYkIBoBuE6OJcBwpccY/edit",
};

const state = { lang: detectLocale(), selected: null, view: "explorer", data: null };

const $ = (sel) => document.querySelector(sel);
const t = (key) => UI[state.lang][key];

function effectiveTheme() {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function toggleTheme() {
  const next = effectiveTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("wg7tf2-theme", next);
}

function nodeById(id) {
  const d = state.data;
  if (id === "V1") return d.vision;
  return (
    d.axes.find((x) => x.id === id) ||
    d.outcomes.find((x) => x.id === id) ||
    d.benefits.find((x) => x.id === id)
  );
}

// selection graph: which ids light up for a given selection
function connections(id) {
  const d = state.data;
  const lit = new Set([id]);
  if (id.startsWith("A")) {
    const a = d.axes.find((x) => x.id === id);
    a.benefits.forEach((b) => lit.add(b));
    a.benefits.forEach((b) => lit.add(d.benefits.find((x) => x.id === b).outcome));
  } else if (id.startsWith("B")) {
    const b = d.benefits.find((x) => x.id === id);
    lit.add(b.axis);
    lit.add(b.outcome);
    lit.add("V1");
  } else if (id.startsWith("O")) {
    const o = d.outcomes.find((x) => x.id === id);
    o.benefits.forEach((b) => lit.add(b));
    o.benefits.forEach((b) => lit.add(d.benefits.find((x) => x.id === b).axis));
    lit.add("V1");
  } else if (id === "V1") {
    d.outcomes.forEach((o) => lit.add(o.id));
  }
  return lit;
}

function tooltipText(id) {
  const d = state.data;
  const L = state.lang;
  if (id.startsWith("B")) {
    const b = d.benefits.find((x) => x.id === id);
    return b.description[L].split(". ")[0] + ".";
  }
  if (id.startsWith("A") || id.startsWith("O")) {
    const n = nodeById(id);
    return n.benefits
      .map((bId) => `${bId} · ${d.benefits.find((x) => x.id === bId).name[L]}`)
      .join("   ·   ");
  }
  return d.outcomes.map((o) => o.name[L]).join("   ·   ");
}

function showTooltip(btn) {
  const tip = $("#tooltip");
  tip.textContent = tooltipText(btn.dataset.id);
  tip.hidden = false;
  const r = btn.getBoundingClientRect();
  const tr = tip.getBoundingClientRect();
  let x = r.left;
  if (x + tr.width > window.innerWidth - 12) x = window.innerWidth - tr.width - 12;
  let y = r.bottom + 8;
  if (y + tr.height > window.innerHeight - 8) y = r.top - tr.height - 8;
  tip.style.left = `${Math.max(8, x)}px`;
  tip.style.top = `${y}px`;
}

function hideTooltip() {
  $("#tooltip").hidden = true;
}

function previewWires(id) {
  if (state.selected) return; // an explicit selection owns the highlight
  const lit = id ? connections(id) : new Set();
  document.querySelectorAll(".wires path").forEach((p) => {
    p.classList.toggle("wire-lit", lit.has(p.dataset.from) && lit.has(p.dataset.to));
  });
}

function nodeButton(id, label) {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.className = "node";
  btn.dataset.id = id;
  btn.setAttribute("aria-pressed", "false");
  const idSpan = document.createElement("span");
  idSpan.className = "id";
  idSpan.textContent = id;
  btn.append(idSpan, document.createTextNode(label));
  btn.addEventListener("click", () => select(state.selected === id ? null : id));
  btn.addEventListener("mouseenter", () => { showTooltip(btn); previewWires(id); });
  btn.addEventListener("mouseleave", () => { hideTooltip(); previewWires(null); });
  btn.addEventListener("focus", () => showTooltip(btn));
  btn.addEventListener("blur", hideTooltip);
  li.appendChild(btn);
  return li;
}

function renderLists() {
  const d = state.data;
  const L = state.lang;

  const aList = $("#list-axes");
  aList.replaceChildren(
    ...d.axes.map((a) => {
      const li = nodeButton(a.id, a.name[L]);
      li.querySelector(".node").classList.add(`node-${a.id}`);
      return li;
    })
  );

  const bWrap = $("#list-benefits");
  bWrap.replaceChildren(
    ...d.axes.map((axis) => {
      const group = document.createElement("div");
      group.className = `axis-group axis-${axis.id}`;
      const label = document.createElement("p");
      label.className = "axis-label";
      label.textContent = axis.name[L];
      const ul = document.createElement("ul");
      ul.className = "nodes";
      ul.append(
        ...axis.benefits.map((bId) => {
          const b = d.benefits.find((x) => x.id === bId);
          return nodeButton(b.id, b.name[L]);
        })
      );
      group.append(label, ul);
      return group;
    })
  );

  const oList = $("#list-outcomes");
  const items = d.outcomes.map((o) => {
    const li = nodeButton(o.id, o.name[L]);
    const axisOfFirst = d.benefits.find((x) => x.id === o.benefits[0]).axis;
    li.querySelector(".node").classList.add(`node-ax-${axisOfFirst}`);
    return li;
  });
  const visionLi = nodeButton("V1", d.vision.name[L]);
  visionLi.querySelector(".node").classList.add("node-vision");
  oList.replaceChildren(...items, visionLi);
}

function chipList(ids) {
  const d = state.data;
  const L = state.lang;
  const ul = document.createElement("ul");
  ul.className = "chips";
  for (const id of ids) {
    const li = document.createElement("li");
    li.className = "chip";
    const n = nodeById(id);
    if (id.startsWith("B")) {
      li.classList.add(`ax-${n.axis}`);
      li.textContent = `${id} · ${n.name[L]}`;
    } else {
      li.textContent = n.name[L];
    }
    ul.appendChild(li);
  }
  return ul;
}

function rel(labelKey, content) {
  const div = document.createElement("div");
  div.className = "rel";
  const label = document.createElement("span");
  label.className = "rel-label";
  label.textContent = t(labelKey);
  div.append(label, content);
  return div;
}

function prose(text) {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
}

function renderDetail() {
  const detail = $("#detail");
  const d = state.data;
  const L = state.lang;
  const id = state.selected;

  $("#btn-clear").hidden = !id;
  $("#btn-share").hidden = !id;
  const suggest = $("#btn-suggest");
  suggest.hidden = !id || !SUGGEST.enabled;
  $("#btn-sheet").hidden = !id || !SUGGEST.sheet;
  if (id && SUGGEST.enabled) {
    const value = `${id} · ${nodeById(id).name.en} (brief v${d.version})`;
    suggest.href =
      `https://github.com/${SUGGEST.repo}/issues/new?template=${SUGGEST.template}` +
      `&title=${encodeURIComponent(`[Suggestion] ${value}`)}&node=${encodeURIComponent(value)}`;
  }

  if (!id) {
    const hint = document.createElement("p");
    hint.className = "hint muted";
    hint.textContent = t("hint");
    detail.replaceChildren(hint);
    return;
  }

  const kind = document.createElement("p");
  kind.className = "kind";
  const h = document.createElement("h3");
  const parts = [kind, h];

  if (id.startsWith("B")) {
    const b = d.benefits.find((x) => x.id === id);
    const axis = d.axes.find((a) => a.id === b.axis);
    kind.textContent = `${t("colBenefits")} · ${id} · ${t("detailAxis")}: ${axis.name[L]}`;
    h.textContent = b.name[L];
    parts.push(
      prose(b.description[L]),
      rel("detailWho", prose(b.whoBenefits[L])),
      rel("detailOutcome", chipList([b.outcome]))
    );
  } else if (id.startsWith("A")) {
    const a = d.axes.find((x) => x.id === id);
    kind.textContent = `${t("colAxes")} · ${id}`;
    h.textContent = a.name[L];
    parts.push(rel("detailBenefitsIn", chipList(a.benefits)));
  } else if (id.startsWith("O")) {
    const o = d.outcomes.find((x) => x.id === id);
    kind.textContent = `${t("colOutcomes")} · ${id}`;
    h.textContent = o.name[L];
    parts.push(rel("detailBenefitsIn", chipList(o.benefits)), rel("detailVision", chipList(["V1"])));
  } else {
    kind.textContent = t("colOutcomes");
    h.textContent = d.vision.name[L];
    parts.push(rel("detailBenefitsIn", chipList(d.outcomes.map((o) => o.id))));
  }
  detail.replaceChildren(...parts);
}

// the drawn map: axis->benefit, benefit->outcome, outcome->vision wires
function edgeList() {
  const d = state.data;
  const edges = [];
  for (const b of d.benefits) edges.push([b.axis, b.id]);
  for (const b of d.benefits) edges.push([b.id, b.outcome]);
  for (const o of d.outcomes) edges.push([o.id, "V1"]);
  return edges;
}

function drawWires() {
  const svg = $(".wires");
  const box = $(".explorer");
  if (!state.data || state.view !== "explorer" || !document.querySelector(".node")) return;
  const ref = box.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${ref.width} ${ref.height}`);
  const anchor = (id) => {
    const el = document.querySelector(`.node[data-id="${id}"]`);
    const r = el.getBoundingClientRect();
    return { left: r.left - ref.left, right: r.right - ref.left, y: r.top - ref.top + r.height / 2 };
  };
  svg.replaceChildren(
    ...edgeList().map(([from, to]) => {
      const a = anchor(from);
      const b = anchor(to);
      // outcome->vision edges run inside one column; route them by x-position
      const [x1, x2] = a.right <= b.left ? [a.right, b.left] : [a.left, b.left];
      const midX = (x1 + x2) / 2;
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", `M ${x1} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${x2} ${b.y}`);
      p.dataset.from = from;
      p.dataset.to = to;
      return p;
    })
  );
  litWires();
}

function litWires() {
  const lit = state.selected ? connections(state.selected) : new Set();
  document.querySelectorAll(".wires path").forEach((p) => {
    p.classList.toggle("wire-lit", lit.has(p.dataset.from) && lit.has(p.dataset.to));
  });
}

function renderSelection() {
  const explorer = $(".explorer");
  explorer.classList.toggle("has-selection", !!state.selected);
  const lit = state.selected ? connections(state.selected) : new Set();
  document.querySelectorAll(".node").forEach((btn) => {
    const id = btn.dataset.id;
    btn.classList.toggle("selected", id === state.selected);
    btn.classList.toggle("lit", lit.has(id) && id !== state.selected);
    btn.setAttribute("aria-pressed", String(id === state.selected));
  });
  litWires();
  renderDetail();
}

function select(id) {
  state.selected = id;
  history.replaceState(null, "", id ? `#${id}` : location.pathname + location.search);
  renderSelection();
}

function setView(view) {
  state.view = view;
  $("#view-explorer").hidden = view !== "explorer";
  $("#view-about").hidden = view !== "about";
  $("#nav-explorer").classList.toggle("active", view === "explorer");
  $("#nav-about").classList.toggle("active", view === "about");
  if (view === "about") history.replaceState(null, "", "#about");
  else history.replaceState(null, "", state.selected ? `#${state.selected}` : location.pathname + location.search);
  if (view === "explorer") drawWires();
}

function renderChrome() {
  const L = state.lang;
  document.documentElement.lang = L;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = UI[L][el.dataset.i18n];
  });
  $("#lede").textContent = t("lede");
  $("#about-body").textContent = t("aboutBody").replace("{version}", state.data.version);
  $("#about-how-body").textContent = t("aboutHowBody");
  document.querySelectorAll(".langs button").forEach((b) => {
    b.setAttribute("aria-current", String(b.dataset.lang === L));
  });
}

function render() {
  renderChrome();
  renderLists();
  renderSelection();
  drawWires();
}

async function init() {
  const res = await fetch("data/taxonomy.json?v=9");
  state.data = await res.json();

  const hash = location.hash.replace("#", "");
  if (/^([AO]\d|B\d|V1)$/.test(hash)) state.selected = hash;
  if (hash === "about") state.view = "about";

  document.querySelectorAll(".langs button").forEach((b) => {
    b.addEventListener("click", () => {
      if (!LOCALES.includes(b.dataset.lang)) return;
      state.lang = b.dataset.lang;
      localStorage.setItem("wg7tf2-lang", state.lang);
      render();
    });
  });

  $("#theme-toggle").addEventListener("click", toggleTheme);
  $("#nav-explorer").addEventListener("click", (e) => { e.preventDefault(); setView("explorer"); });
  $("#nav-about").addEventListener("click", (e) => { e.preventDefault(); setView("about"); });
  $("#btn-clear").addEventListener("click", () => select(null));
  $("#btn-share").addEventListener("click", async () => {
    await navigator.clipboard.writeText(location.href);
    const btn = $("#btn-share");
    btn.textContent = t("shared");
    setTimeout(() => (btn.textContent = t("share")), 1600);
  });

  render();
  setView(state.view);
  new ResizeObserver(() => drawWires()).observe($(".explorer"));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => drawWires());
}

init();
