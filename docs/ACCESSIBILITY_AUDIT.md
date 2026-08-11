# Accessibility Audit and Remediation Record

## Scope

Tested surface: the CAIRN single-page product experience and its interactive dashboard, including navigation, tabs, deal filters, deal evidence, dialogs, form validation, and the mobile layout.

Automated rule tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, and `wcag22aa`.

## Controlled baseline

`audit/fixtures/legacy-dashboard.html` is a deliberately defective fixture used to make the before-state reproducible. The suite confirms these automated failures:

- `button-name` — an interactive control without an accessible name
- `color-contrast` — insufficient foreground/background contrast
- `select-name` — a select control without an accessible label

The fixture is not presented as a historical client build. It is controlled evidence created for this case study.

## Remediation implemented

| Risk | Implementation evidence |
| --- | --- |
| Navigation bypass | First-focus “Skip to main content” link and focusable main target |
| Ambiguous structure | Semantic header, main, sections, navigation, footer, headings, lists, and descriptions |
| Inoperable custom tabs | Proper tab roles, selected state, roving focus, and Arrow/Home/End support |
| Color-only status | Visible labels such as At risk, On track, and Needs review |
| Inaccessible chart | SVG title/description plus a screen-reader data table |
| Unclear filter state | Named group, pressed/selected state, and current deal state |
| Form errors lost to focus | Alert receives focus after invalid submission |
| Motion sensitivity | `prefers-reduced-motion` handling |
| Small-screen breakage | Responsive layout and an automated horizontal-overflow assertion |

## Automated result

Five Playwright scenarios pass. The configured axe scan reports no violations for the tested rendered states and rule tags.

This statement is intentionally narrow: automated tools cannot prove complete WCAG conformance.

## Evidence boundaries

Not claimed as complete:

- Legal compliance or certification
- Full WCAG success-criterion audit
- NVDA, JAWS, VoiceOver, or TalkBack validation
- Browser/assistive-technology matrix coverage
- Production analytics, user research, or real client outcomes

The next manual checks are recorded in `MANUAL_QA_PLAN.md`.

