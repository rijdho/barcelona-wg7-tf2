# Changelog

All notable changes to this repository are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Nothing has been released or tagged yet: the brief is v0.1 as a working document, the site
is live, and the WG7-TF2 community review starts with the meeting of 1 September 2026.

## [Unreleased]

### Fixed

- Draft explorer: buttons the app hides (clear selection, copy link, suggest a change)
  were visible on screen, and the suggestion button rendered as a dead link. `.btn`
  declares a display, which outranks the user agent rule for `hidden`; the neutralizing
  rule existed only in the main stylesheet.
- Deep links: a well-formed id that does not exist (`#A9`, `#S99`) threw while building
  the selection graph, leaving the map without its connecting lines for the rest of the
  visit. Both explorers now validate the hash against the data instead of against a shape.
- Small screens: below 940px the rail hid the navigation and the credit line, so the draft
  and About views were unreachable and the author, license and source links disappeared.
  The rail now wraps, keeping both.
- The "Source" citation on the explorer and the brief reference in About pointed at a
  Google Doc that requires sign-in and access. Both now point at the full text in this
  repository; the WG7 working copy is kept in About, labeled as access-restricted.
- The issue form described the explorer's GitHub button as the channel that needs no
  account; that is the shared spreadsheet.
- Two benefit definitions had lost a clause against the source document: B1 did not close
  with "enabling verification and trust", and B2 omitted "open science policy
  implementation" from its list. Restored in English, German and Spanish, and in the
  markdown brief.
- The draft stylesheet changed without its `?v=` being bumped, so cached browsers kept
  serving the previous version.

### Changed

- The brief is labeled v0.1 everywhere, matching the Google Doc that circulates to WG7.
  The repository previously carried it as v1.0 while the document itself said 0.1, so the
  explorer cited a version its own source did not use.
- About: the credits section replaces its "still to be filled" placeholder, and the text
  now says the fuller taxonomy is published as a labeled draft rather than pending.
- The draft banner reads "Draft v1.0 · working example" without the author credit.
- The theme toggle and the source link are translated instead of English-only.

### Added

- `tests/draft.test.mjs`: integrity and locale parity of the draft taxonomy, plus the
  contract that the draft may extend the brief but not contradict it.
- `tests/site.test.mjs`: page invariants for hidden state, small-screen navigation and
  credit line, relative link targets, and asset versioning.

### Removed

- Three UI strings orphaned when the Contribute view was folded back into the map view.

## 2026-08-17

- First public version: the brief as a machine-readable taxonomy, the interactive
  explorer (EN/DE/ES, light/dark, deep links), the generated benefits map, the draft
  stakeholder taxonomy, the GitHub issue and spreadsheet suggestion channels with CSV
  export, and the Pages deploy gated by the test suite.
