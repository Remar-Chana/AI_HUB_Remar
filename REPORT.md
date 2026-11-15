# A11y Verification Report (Template)

This report compiles the compliance evidence for a given *Feature*, ensuring its development reached the "Certification Ready" definition.

> This report is a **versioned project record** — never add it to `.gitignore`. Evidence hidden from version control is not evidence: QA and leadership verify it before release, and audits read it after.

> **Marking legend (mandatory):**
> `[x]` verified, with the evidence described beside it · `[!]` verified and **failed** (fix it, or open an entry in `EXCEPTIONS.md`) · `[~]` partially verified, with what is missing written down · `[ ]` **not verified** — the reason MUST be written beside it.
> Marking `[x]` without reproducible evidence invalidates the whole report.

> **Headless agents.** An AI without a browser MUST still produce this report, marking `[ ]` every checkpoint that requires a browser or assistive technology, with the reason and who must run it. A partial, honest report is evidence; a missing report is not. Overall status is CONDITIONAL — never PASS — while any `[ ]` or `[!]` remains.

---

## 📌 Validation Context
- **Feature/Epic:** AI Hub Stitch landing page: model workbench and benchmark matrix
- **Test Date:** 11/15/2026
- **Covers interface as of:** Next.js production build before first repository commit
- **Standard version:** 2.5.0
- **Compliance Status:** ⚠️ CONDITIONAL
- **Verification Independence:** self-reported — *who verified: Codex, current implementation session; no independent reviewer*
- **Static gate (`verify-a11y.py`):** PASS — 0 errors, 1 warning (temporary Python 3.9 future-annotations shim; unmodified script TypeErrors on installed Python 3.9.6) — *run on: 11/15/2026.**

## 1. Technical Verification (Automated & Semantics)
Evidence obtained via static validators to ensure a structural technical baseline.
- [ ] **Axe-Core / Lighthouse:** Not run; no browser audit tool was installed in this session.
- [x] **HTML Semantics:** JSX inspection found native links/buttons, header/nav/main/footer landmarks, and no click handlers on generic elements.
- [x] **Heading Hierarchy (H1-H6):** Source inspection found one H1 followed by section H2s and card H3s.

## 2. Tab Order and Focus Management
Validation purely by keyboard (without mouse usage).
- [ ] **Focus Indicator:** Visible 2px focus outline is defined globally; keyboard/browser contrast appearance not independently checked.
- [ ] **Logical Navigation:** Source order follows the page layout; full keyboard traversal not run.
- [x] **Captured Focus (Modals/Overlays):** N/A — no custom modal/overlay; feedback uses native browser alerts.

## 3. Behavior and Task Return
Critical functional paths and Screen Reader validation.
- [ ] **Screen Reader Test:** Not run; a human reviewer must verify with VoiceOver + Safari or NVDA + Firefox.
  - Pair(s) used: Not run
  - Who ran it and when: Human reviewer — pending
  - Scenarios run: guide-buttons, guide-navigation, guide-tabs-accordion, guide-charts, guide-generative-ui, guide-images, guide-visual-perception, guide-responsive-mobile, guide-forms, guide-toasts-notifications; code-read only; screen-reader scenarios pending.
- [ ] **Voice Control:** Accessible names were checked against visible control text in source; no Voice Control session was available.
  - Tool or method: Source inspection
- [ ] **Interactive states inventoried:** Code-read: workbench presets (SQL/Python/math), run/clear, copy output, model deployment alerts, benchmark tabs (4 states), live status changes. Browser navigation not verified.
- [ ] **Status Change (`aria-live`):** Live regions added to stream output, stream status, and benchmark panel; assistive announcement not verified.
- [x] **Form Filling:** The prompt textarea has an explicit accessible name; no other form fields are present.

## 4. Visual Perception and Comprehension
Tests validating contrast and visual structure (color-independent).
- [ ] **Text & UI Contrast:** Representative pairs were computed; not every foreground/background state was exhaustively enumerated.
  Measured pairs — computed with `tools/contrast-check.py` or the WCAG formula, never estimated. The static gate recomputes every row; a ratio that does not match the arithmetic fails the build. One row per pair that carries meaning: body text, secondary text, links, focus ring, UI borders, each state.
  | Pair | Foreground | Background | Ratio | Floor | Result |
  | :--- | :--- | :--- | ---: | ---: | :--- |
  | Primary text | #f5f5f7 | #000000 | 19.29:1 | 4.5:1 | ✅ |
| Supporting text | #a1a1a6 | #1d1d1f | 6.54:1 | 4.5:1 | ✅ |
| Secondary label | #9b9ba1 | #333336 | 4.56:1 | 4.5:1 | ✅ |
| Inline link | #2997ff | #1d1d1f | 5.58:1 | 4.5:1 | ✅ |
| Button label | #ffffff | #0071e3 | 4.70:1 | 4.5:1 | ✅ |
| Focus outline | #2997ff | #000000 | 6.96:1 | 3:1 | ✅ |
| Copper status text | #e9a35e | #1d1d1f | 7.91:1 | 4.5:1 | ✅ |
- [x] **Redundancy:** Status values include text; colored indicators are supplementary.
- [ ] **Scale / Zoom:** Not verified in a browser; human reviewer must check 200% and 320 CSS px reflow.

## 5. Time-Based Media and Motion
N/A — no video, audio, or scroll-driven media. Repeating CSS animations were removed; reduced-motion overrides remain.

## 6. Cognitive Load and Flow
N/A — this page has no multi-step, authentication, or timed flow.
- [ ] **Nothing to remember:** No step requires the user to hold information from another screen. Password fields accept paste and declare `autocomplete`; no transcription CAPTCHA without an alternative (SC 3.3.8).
- [ ] **Nothing to retype:** Information already provided in the same process is auto-populated or offered for selection; state survives the Back button (SC 3.3.7).
- [ ] **Help in the same place:** Where a help mechanism exists, it appears in the same relative order on every screen of the flow (SC 3.2.6).
- [ ] **Text spacing:** Nothing is clipped or overlapped at line height 1.5×, paragraph 2×, letters 0.12× and words 0.16× (SC 1.4.12).
- [ ] **Timing:** Every limit can be turned off, adjusted or extended, with a warning (SC 2.2.1).
- [ ] **Conflicting needs:** If any decision served one accessibility need at the cost of another, both populations are named and the choice is recorded in `A11Y-DECISIONS.md`.

---
## 7. Functional Performance *(optional — EN 301 549 / NBR 17225 Annex B / VPAT)*
*Fill when the report backs a formal declaration. For each statement, record how the product supports usage:*
- **Without vision:** [ ]
- **With limited vision:** [ ]
- **Without perception of color:** [ ]
- **Without hearing:** [ ]
- **With limited hearing:** [ ]
- **Without vocal capability:** [ ]
- **With limited manipulation or strength:** [ ]
- **With limited reach:** [ ]
- **Minimizing photosensitive seizure triggers:** [ ]
- **With limited cognition:** [ ]

---
## 📝 Assessment Notes or Known Blockers
*Describe whether any exception behavior was detected or what measures were opened in `EXCEPTIONS.md`*

- **Note 1:** The report is conditional because no screen-reader or human browser audit was run.
- **Note 2:** The official static gate could not execute on the installed Python 3.9.6; its Python 3.10 union type annotation raised TypeError.
