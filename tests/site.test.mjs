// Page-level invariants of the static site. These are aimed at the failures
// that still render: a stylesheet that lets a hidden button through, a
// responsive rule that drops the only navigation and the only attribution,
// a relative link that points at nothing, an asset link a browser will
// happily serve from its cache after a redeploy, and a security policy that
// quietly stops being enforceable because somebody added an inline script.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "site");
const PAGES = ["index.html", "about/index.html", "draft/index.html"];
const SHEETS = ["style.css", "draft/style.css"];
// The scripts that reference other assets. theme.js is a leaf: it imports
// nothing and fetches nothing, and the pages that load it are scanned anyway.
const SCRIPTS = ["app.js", "draft/app.js", "about/about.js"];
const read = (p) => readFileSync(join(site, p), "utf8");

// Every reference to a local asset that a browser caches by URL: the links and
// script sources in a page, the imports in a module, the data it fetches.
function assetRefs(text) {
  return [
    ...text.matchAll(/(?:href|src)="((?:\.\.\/)?[\w./-]*(?:style\.css|app\.js|theme\.js|about\.js))([^"]*)"/g),
    ...text.matchAll(/(?:from|fetch\()\s*"((?:\.\.\/)?[\w./-]*(?:i18n\.js|taxonomy\.json))([^"]*)"/g),
  ];
}

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

// A reader writing a methods section should be able to cite the work from the
// page, without going to the repository to find the number. The concept DOI is
// the one to show: it resolves to the latest version, where a version DOI pins
// a snapshot that will silently go stale at the next release.
const CONCEPT_DOI = "10.5281/zenodo.22231440";
const VERSION_DOI = "10.5281/zenodo.22231441";

test("every page shows the concept DOI, and not a version DOI", () => {
  for (const page of PAGES) {
    const html = read(page);
    const foot = html.slice(html.indexOf('class="rail-foot"'));
    assert.match(foot, new RegExp(`doi\\.org/${CONCEPT_DOI.replace(".", "\\.")}`),
      `${page} links the concept DOI`);
    assert.ok(!foot.includes(VERSION_DOI),
      `${page} shows the concept DOI, not the version DOI that goes stale`);
  }
});

test("the citation file agrees with the page about which DOI is the concept", () => {
  const cff = readFileSync(join(root, "CITATION.cff"), "utf8");
  // A duplicated top-level doi: key silently breaks GitHub's citation widget.
  const topLevel = cff.match(/^doi:\s*(\S+)\s*$/gm) ?? [];
  assert.equal(topLevel.length, 1, "CITATION.cff carries exactly one top-level doi:");
  assert.match(topLevel[0], new RegExp(CONCEPT_DOI.replace(".", "\\.")),
    "the top-level doi: is the concept DOI");
  assert.ok(cff.includes(VERSION_DOI), "the identifiers list carries the current version DOI");
});

test("relative links resolve to files that exist", () => {
  for (const page of PAGES) {
    const dir = dirname(join(site, page));
    for (const [, href] of read(page).matchAll(/(?:href|src)="([^"#]+)"/g)) {
      if (/^(https?:|mailto:|data:)/.test(href)) continue;
      const target = resolve(dir, href.split("?")[0]);
      const asFile = target.endsWith("/") ? join(target, "index.html") : target;
      assert.ok(existsSync(asFile) || existsSync(join(asFile, "index.html")),
        `${page} -> ${href} exists`);
    }
  }
});

test("local asset links are versioned so a redeploy reaches cached browsers", () => {
  for (const src of [...PAGES, ...SCRIPTS]) {
    const refs = assetRefs(read(src));
    assert.ok(refs.length > 0, `${src} references at least one local asset`);
    for (const [, path, query] of refs) {
      assert.match(query, /^\?v=\d+$/, `${src} -> ${path} carries a ?v= version`);
    }
  }
});

// A module graph is cached per resolved URL, so versioning one file and not its
// neighbour lets a browser serve a stale i18n.js against a fresh app.js that
// imports a symbol the cached copy does not export: the graph aborts with no
// visible error and the page comes up blank while looking deployed. Holding
// every reference at one number makes that impossible to express. It does not
// catch the other half of the same failure, a file edited while its number
// stays put, which is what the v0.2 commit did to i18n.js and taxonomy.json in
// both explorers; nothing a test can read tells that apart from no edit at all.
// Bumping this one number on any change under site/ is the whole discipline.
test("every local asset link carries the same version", () => {
  const seen = new Map();
  for (const src of [...PAGES, ...SCRIPTS]) {
    for (const [, path, query] of assetRefs(read(src))) {
      if (!seen.has(query)) seen.set(query, []);
      seen.get(query).push(`${src} -> ${path}`);
    }
  }
  assert.equal(seen.size, 1,
    "one version across the site, found " +
    [...seen.entries()].map(([v, w]) => `${v} (${w.join("; ")})`).join(" | "));
});

// GitHub Pages sends no security headers at all, so a meta tag is the only
// policy the site can carry. Everything these pages load is same-origin, which
// is what lets the policy start from nothing and then name the rest.
test("every page ships a strict Content-Security-Policy", () => {
  for (const page of PAGES) {
    const html = read(page);
    const meta = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/);
    assert.ok(meta, `${page} carries a Content-Security-Policy`);
    const policy = meta[1];
    assert.match(policy, /^default-src 'none'/, `${page} starts from default-src 'none'`);
    for (const directive of [
      "script-src 'self'", "style-src 'self'", "font-src 'self'",
      "connect-src 'self'", "base-uri 'none'", "form-action 'none'",
      "object-src 'none'",
    ]) {
      assert.ok(policy.includes(directive), `${page} policy names ${directive}`);
    }
    assert.doesNotMatch(policy, /unsafe-inline|unsafe-eval/,
      `${page} policy allows no unsafe source`);
    // The policy has to sit before anything it governs is fetched.
    assert.ok(html.indexOf("Content-Security-Policy") < html.indexOf("<link"),
      `${page} declares the policy before the first subresource`);
  }
});

// The policy above only stays strict as long as no page needs 'unsafe-inline'.
// The theme bootstrap and the About script live in their own files for exactly
// that reason, and an inline script added later would break the page rather
// than the policy, silently, in whichever browser the author did not test.
test("no page carries an inline script or an inline style", () => {
  for (const page of PAGES) {
    const html = read(page);
    assert.doesNotMatch(html, /<script(?![^>]*\ssrc=)[^>]*>/,
      `${page} has no inline script; put it in a file the policy can allow`);
    assert.doesNotMatch(html, /<style[\s>]/, `${page} has no inline <style> block`);
    assert.doesNotMatch(html, /\sstyle="/, `${page} has no style attribute`);
  }
});
