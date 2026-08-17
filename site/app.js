import { UI, LOCALES, detectLocale } from "./i18n.js?v=4";

// Suggestion channel: a Google Form with a "Node" short-answer question.
// Fill in from the Form's "Get pre-filled link" (url = the /viewform base,
// entry = the entry.<id> of the Node question). Empty url hides the button.
const SUGGEST_FORM = { url: "", entry: "" };

const state = { lang: detectLocale(), selected: null, data: null };

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

// selection graph: which ids light up for a given selection
function connections(id) {
  const d = state.data;
  const lit = new Set([id]);
  if (id.startsWith("S")) {
    const s = d.stakeholders.find((x) => x.id === id);
    s.roles.forEach((r) => lit.add(r));
    s.primaryBenefits.forEach((b) => lit.add(b));
  } else if (id.startsWith("R")) {
    const r = d.roles.find((x) => x.id === id);
    r.primaryBenefits.forEach((b) => lit.add(b));
    d.stakeholders.filter((s) => s.roles.includes(id)).forEach((s) => lit.add(s.id));
  } else if (id.startsWith("B")) {
    d.roles.filter((r) => r.primaryBenefits.includes(id)).forEach((r) => lit.add(r.id));
    d.stakeholders.filter((s) => s.primaryBenefits.includes(id)).forEach((s) => lit.add(s.id));
  }
  return lit;
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
  li.appendChild(btn);
  return li;
}

function renderLists() {
  const d = state.data;
  const L = state.lang;

  const sList = $("#list-stakeholders");
  sList.replaceChildren(...d.stakeholders.map((s) => nodeButton(s.id, s.name[L])));

  const rList = $("#list-roles");
  rList.replaceChildren(...d.roles.map((r) => nodeButton(r.id, r.name[L])));

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
}

function chipList(ids) {
  const d = state.data;
  const L = state.lang;
  const ul = document.createElement("ul");
  ul.className = "chips";
  for (const id of ids) {
    const li = document.createElement("li");
    li.className = "chip";
    let name;
    if (id.startsWith("B")) {
      const b = d.benefits.find((x) => x.id === id);
      name = `${id} · ${b.name[L]}`;
      li.classList.add(`ax-${b.axis}`);
    } else if (id.startsWith("R")) {
      name = d.roles.find((x) => x.id === id).name[L];
    } else {
      name = d.stakeholders.find((x) => x.id === id).name[L];
    }
    li.textContent = name;
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

function plainChips(items) {
  const ul = document.createElement("ul");
  ul.className = "chips";
  ul.append(
    ...items.map((text) => {
      const li = document.createElement("li");
      li.className = "chip";
      li.textContent = text;
      return li;
    })
  );
  return ul;
}

function renderDetail() {
  const detail = $("#detail");
  const d = state.data;
  const L = state.lang;
  const id = state.selected;

  $("#btn-clear").hidden = !id;
  $("#btn-share").hidden = !id;
  const suggest = $("#btn-suggest");
  suggest.hidden = !id || !SUGGEST_FORM.url;
  if (id && SUGGEST_FORM.url) {
    const en = (d.benefits.find((x) => x.id === id) || d.roles.find((x) => x.id === id) ||
      d.stakeholders.find((x) => x.id === id)).name.en;
    const value = `${id} · ${en} (taxonomy v${d.version})`;
    suggest.href = `${SUGGEST_FORM.url}?usp=pp_url&entry.${SUGGEST_FORM.entry}=${encodeURIComponent(value)}`;
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
  const body = document.createElement("p");
  const parts = [kind, h, body];

  if (id.startsWith("S")) {
    const s = d.stakeholders.find((x) => x.id === id);
    kind.textContent = `${t("colStakeholders")} · ${id}`;
    h.textContent = s.name[L];
    body.textContent = s.description[L];
    parts.push(
      rel("detailExamples", plainChips(s.examples[L])),
      rel("detailRoles", chipList(s.roles)),
      rel("detailBenefits", chipList(s.primaryBenefits))
    );
  } else if (id.startsWith("R")) {
    const r = d.roles.find((x) => x.id === id);
    kind.textContent = `${t("colRoles")} · ${id}`;
    h.textContent = r.name[L];
    body.textContent = r.definition[L];
    const holders = d.stakeholders.filter((s) => s.roles.includes(id)).map((s) => s.id);
    parts.push(rel("detailBenefits", chipList(r.primaryBenefits)), rel("detailStakeholders", chipList(holders)));
  } else {
    const b = d.benefits.find((x) => x.id === id);
    const axis = d.axes.find((a) => a.id === b.axis);
    kind.textContent = `${t("colBenefits")} · ${id} · ${t("detailAxis")}: ${axis.name[L]}`;
    h.textContent = b.name[L];
    body.textContent = b.definition[L];
    const roles = d.roles.filter((r) => r.primaryBenefits.includes(id)).map((r) => r.id);
    const holders = d.stakeholders.filter((s) => s.primaryBenefits.includes(id)).map((s) => s.id);
    parts.push(rel("detailRolesDelivering", chipList(roles)), rel("detailStakeholders", chipList(holders)));
  }
  detail.replaceChildren(...parts);
}

// the drawn map: one path per S->R and R->B connection, laid in the gutters
function edgeList() {
  const d = state.data;
  const edges = [];
  for (const s of d.stakeholders) for (const r of s.roles) edges.push([s.id, r]);
  for (const r of d.roles) for (const b of r.primaryBenefits) edges.push([r.id, b]);
  return edges;
}

function drawWires() {
  const svg = $(".wires");
  const box = $(".explorer");
  if (!state.data) return;
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
      const midX = (a.right + b.left) / 2;
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", `M ${a.right} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.left} ${b.y}`);
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

function renderChrome() {
  const L = state.lang;
  document.documentElement.lang = L;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = UI[L][el.dataset.i18n];
  });
  $("#lede").textContent = t("lede");
  $("#about-body").textContent = t("aboutBody").replace("{version}", state.data.version);
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
  const res = await fetch("data/taxonomy.json?v=4");
  state.data = await res.json();

  const hash = location.hash.replace("#", "");
  if (/^[SRB]\d+$/.test(hash)) state.selected = hash;

  document.querySelectorAll(".langs button").forEach((b) => {
    b.addEventListener("click", () => {
      if (!LOCALES.includes(b.dataset.lang)) return;
      state.lang = b.dataset.lang;
      localStorage.setItem("wg7tf2-lang", state.lang);
      render();
    });
  });

  $("#theme-toggle").addEventListener("click", toggleTheme);
  $("#btn-clear").addEventListener("click", () => select(null));
  $("#btn-share").addEventListener("click", async () => {
    await navigator.clipboard.writeText(location.href);
    const btn = $("#btn-share");
    btn.textContent = t("shared");
    setTimeout(() => (btn.textContent = t("share")), 1600);
  });

  render();
  new ResizeObserver(() => drawWires()).observe($(".explorer"));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => drawWires());
}

init();
