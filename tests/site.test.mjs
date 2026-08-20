// Page-level invariants of the static site. These are aimed at the failures
// that still render: a stylesheet that lets a hidden button through, a
// responsive rule that drops the only navigation and the only attribution,
// a relative link that points at nothing, an asset link a browser will
// happily serve from its cache after a redeploy.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "site");
const PAGES = ["index.html", "about/index.html", "draft/index.html"];
const SHEETS = ["style.css", "draft/style.css"];
const read = (p) => readFileSync(join(site, p), "utf8");

// Returns the body of the first @media block whose condition matches `needle`.
function mediaBlock(css, needle) {
  const start = css.indexOf(`@media ${needle}`);
  assert.notEqual(start, -1, `@media ${needle} exists`);
  let depth = 0;
  for (let i = css.indexOf("{", start); i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) return css.slice(start, i);
  }
  throw new Error(`unterminated @media ${needle}`);
}

test("every stylesheet neutralises the hidden attribute", () => {
  // .btn declares a display, which outranks the user agent rule for [hidden];
  // without this, buttons the app hides stay on screen (draft page, 2026-08).
  for (const sheet of SHEETS) {
    assert.match(read(sheet), /\[hidden\]\s*\{\s*display:\s*none\s*!important/,
      `${sheet} carries the [hidden] rule`);
  }
});

test("the collapsed rail keeps navigation and the credit line", () => {
  for (const sheet of SHEETS) {
    const block = mediaBlock(read(sheet), "(max-width: 940px)");
    for (const [selector, what] of [[".nav-item", "navigation"], [".rail-foot", "the credit line"]]) {
      const hidden = block
        .split("}")
        .some((rule) => rule.includes(selector) && /display:\s*none/.test(rule.split("{")[1] || ""));
      assert.ok(!hidden, `${sheet} must not hide ${what} on small screens`);
    }
  }
});

test("every page credits author, license and source", () => {
  for (const page of PAGES) {
    const html = read(page);
    const foot = html.slice(html.indexOf('class="rail-foot"'));
    assert.match(foot, /rijdho\.github\.io/, `${page} names the author`);
    assert.match(foot, /creativecommons\.org\/licenses\/by\/4\.0/, `${page} names the license`);
    assert.match(foot, /github\.com\/rijdho\/barcelona-wg7-tf2/, `${page} links the source`);
  }
});

test("relative links resolve to files that exist", () => {
  for (const page of PAGES) {
    const dir = dirname(join(site, page));
    for (const [, href] of read(page).matchAll(/href="([^"#]+)"/g)) {
      if (/^(https?:|mailto:|data:)/.test(href)) continue;
      const target = resolve(dir, href.split("?")[0]);
      const asFile = target.endsWith("/") ? join(target, "index.html") : target;
      assert.ok(existsSync(asFile) || existsSync(join(asFile, "index.html")),
        `${page} -> ${href} exists`);
    }
  }
});

test("local asset links are versioned so a redeploy reaches cached browsers", () => {
  const sources = [...PAGES, "app.js", "draft/app.js"];
  for (const src of sources) {
    const text = read(src);
    const refs = [
      ...text.matchAll(/(?:href|src)="((?:\.\.\/)?[\w./-]*(?:style\.css|app\.js))([^"]*)"/g),
      ...text.matchAll(/(?:from|fetch\()\s*"((?:\.\.\/)?[\w./-]*(?:i18n\.js|taxonomy\.json))([^"]*)"/g),
    ];
    assert.ok(refs.length > 0, `${src} references at least one local asset`);
    for (const [, path, query] of refs) {
      assert.match(query, /^\?v=\d+$/, `${src} -> ${path} carries a ?v= version`);
    }
  }
});
