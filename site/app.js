import { UI, LOCALES, detectLocale } from "./i18n.js?v=1";

const state = { lang: detectLocale(), selected: null, data: null };

const $ = (sel) => document.querySelector(sel);
const t = (key) => UI[state.lang][key];

function applyTheme(value) {
  if (value === "light" || value === "dark") {
    document.documentElement.dataset.theme = value;
    localStorage.setItem("wg7tf2-theme", value);
  } else {
    delete document.documentElement.dataset.theme;
    localStorage.removeItem("wg7tf2-theme");
  }
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

function rel(labelKey, ids) {
  const div = document.createElement("div");
  div.className = "rel";
  const label = document.createElement("span");
  label.className = "rel-label";
  label.textContent = t(labelKey);
  div.append(label, chipList(ids));
  return div;
}

function renderDetail() {
  const detail = $("#detail");
  const d = state.data;
  const L = state.lang;
  const id = state.selected;

  $("#btn-clear").hidden = !id;
  $("#btn-share").hidden = !id;

  if (!id) {
    const hint = document.createElement("p");
    hint.className = "hint";
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
    const exDiv = document.createElement("div");
    exDiv.className = "rel";
    const exLabel = document.createElement("span");
    exLabel.className = "rel-label";
    exLabel.textContent = t("detailExamples");
    const exList = document.createElement("ul");
    exList.className = "chips";
    exList.append(
      ...s.examples[L].map((e) => {
        const li = document.createElement("li");
        li.className = "chip";
        li.textContent = e;
        return li;
      })
    );
    exDiv.append(exLabel, exList);
    parts.push(exDiv, rel("detailRoles", s.roles), rel("detailBenefits", s.primaryBenefits));
  } else if (id.startsWith("R")) {
    const r = d.roles.find((x) => x.id === id);
    kind.textContent = `${t("colRoles")} · ${id}`;
    h.textContent = r.name[L];
    body.textContent = r.definition[L];
    const holders = d.stakeholders.filter((s) => s.roles.includes(id)).map((s) => s.id);
    parts.push(rel("detailBenefits", r.primaryBenefits), rel("detailStakeholders", holders));
  } else {
    const b = d.benefits.find((x) => x.id === id);
    const axis = d.axes.find((a) => a.id === b.axis);
    kind.textContent = `${t("colBenefits")} · ${id} · ${t("detailAxis")}: ${axis.name[L]}`;
    h.textContent = b.name[L];
    body.textContent = b.definition[L];
    const roles = d.roles.filter((r) => r.primaryBenefits.includes(id)).map((r) => r.id);
    const holders = d.stakeholders.filter((s) => s.primaryBenefits.includes(id)).map((s) => s.id);
    parts.push(rel("detailRolesDelivering", roles), rel("detailStakeholders", holders));
  }
  detail.replaceChildren(...parts);
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
  $("#about-body").textContent = t("aboutBody").replace("{version}", state.data.version);
  $("#lang-select").value = L;
}

function render() {
  renderChrome();
  renderLists();
  renderSelection();
}

async function init() {
  const res = await fetch("data/taxonomy.json?v=1");
  state.data = await res.json();

  const hash = location.hash.replace("#", "");
  if (/^[SRB]\d+$/.test(hash)) state.selected = hash;

  $("#lang-select").addEventListener("change", (e) => {
    if (!LOCALES.includes(e.target.value)) return;
    state.lang = e.target.value;
    localStorage.setItem("wg7tf2-lang", state.lang);
    render();
  });

  const themeSel = $("#theme-select");
  themeSel.value = localStorage.getItem("wg7tf2-theme") || "auto";
  themeSel.addEventListener("change", (e) => applyTheme(e.target.value));

  $("#btn-clear").addEventListener("click", () => select(null));
  $("#btn-share").addEventListener("click", async () => {
    await navigator.clipboard.writeText(location.href);
    const btn = $("#btn-share");
    btn.textContent = t("shared");
    setTimeout(() => (btn.textContent = t("share")), 1600);
  });

  render();
}

init();
