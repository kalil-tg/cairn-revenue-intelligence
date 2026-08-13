# CAIRN Evidence Capsule — Product Rescue & Hardening

Verified: 13 August 2026

## What this proves

CAIRN demonstrates a repeatable rescue workflow for a complex React product:
capture a failing baseline, define acceptance checks, repair the interaction and
accessibility defects, and keep the repaired behavior behind automated gates.

This is a self-initiated portfolio system for a fictional B2B product. It is not
paid client work and it does not claim measured commercial uplift.

## Starting risk

The controlled legacy dashboard fixture reproduces three common product defects:

- an unnamed button;
- insufficient color contrast;
- an unnamed select control.

The fixture remains in the repository so the baseline is reproducible instead of
being described only in marketing copy.

## Acceptance matrix

| Product boundary | Acceptance evidence |
|---|---|
| Automated accessibility | Configured axe scan returns zero violations on the tested product page and WCAG tag set |
| Keyboard tabs | Arrow navigation moves focus to the next tab and updates the visible metric |
| Filter state | Selected opportunity exposes `aria-current` and updates the evidence panel |
| Form failure | Empty submission produces a focused alert instead of a silent error |
| Form recovery | Valid email and role complete the request-access state |
| Skip navigation | First Tab focuses the skip link |
| Mobile layout | 390×844 viewport has no horizontal document overflow |
| Motion | Reduced-motion handling is implemented in the product CSS and remains part of manual review |

## Live verification result

Executed locally on 13 August 2026:

- TypeScript typecheck: **passed**.
- ESLint with zero allowed warnings: **passed**.
- Production Vite build: **passed in 1.03s**.
- Browser regression suite: **5/5 passed in 27.1s** using one Chromium worker.
- Main production JavaScript bundle: **216.77 kB / 66.53 kB gzip**.
- Main production CSS bundle: **27.53 kB / 6.54 kB gzip**.

These results prove only the checked repository state and scenarios. They do not
replace screen-reader, high-contrast, zoom, device, or full WCAG conformance work.

## Rescue method demonstrated

1. **Baseline:** preserve a controlled failing fixture.
2. **Boundary map:** identify navigation, state, form, chart, and responsive risks.
3. **Acceptance first:** express the repaired behavior as executable tests.
4. **Targeted repair:** change semantics, focus behavior, state communication, and layout without discarding the visual direction.
5. **Regression shield:** run type, lint, build, browser, and axe gates together.
6. **Evidence handoff:** publish what passed and state what remains manual.

## Commercial relevance

The same method applies to production SaaS work where teams need to repair a
checkout, dashboard, onboarding flow, permissions surface, or release regression
without an uncontrolled rewrite. The first paid stage can be scoped as an async
diagnostic and acceptance matrix; implementation follows only after the failure
and completion criteria are agreed.

## Proposal-ready proof line

> I use a baseline-to-regression workflow rather than beginning with a rewrite. In
> CAIRN, the controlled legacy fixture reproduces known defects, while the repaired
> React product passes typecheck, zero-warning lint, production build, and five
> Playwright/axe scenarios covering keyboard state, form recovery, and mobile
> overflow. I would apply the same evidence-first method to your failing flow.

## Verification commands

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm exec playwright test --reporter=line --workers=1
```

## Related evidence

- `tests/accessibility.spec.ts`
- `audit/fixtures/legacy-dashboard.html`
- `docs/ACCESSIBILITY_AUDIT.md`
- `docs/MANUAL_QA_PLAN.md`
- `docs/CASE_STUDY.md`
