# CAIRN Case Study

## Summary

CAIRN is a self-initiated technical case study for a fictional B2B revenue-intelligence product. The brief was to preserve a high-end editorial visual language while repairing the accessibility and interaction risks that commonly appear in complex SaaS dashboards.

Role: product design, front-end engineering, accessibility remediation, interaction design, and automated regression coverage.

Stack: React 19, TypeScript, Vite, CSS, Playwright, and axe-core.

## The business problem

Revenue teams need to understand not only a forecast number, but the evidence and risk behind it. Dense dashboards often make that harder through unlabeled controls, color-only states, inaccessible charts, unclear focus behavior, and layouts that break on smaller screens. Those barriers also increase support cost and reduce confidence in the product.

## The solution

The experience is organized as a clear path from signal to decision:

1. A concise positioning page explains the product and its value.
2. A workflow section turns raw activity into risk and recommended actions.
3. An interactive product view lets users filter deals and inspect supporting evidence.
4. Request-access and product-tour dialogs demonstrate production-like form and state behavior.

Accessibility was implemented as part of the product architecture rather than added as a visual overlay. The UI includes semantic landmarks, a first-focus skip link, keyboard tab behavior, visible selected states, accessible names, non-color status text, a chart data alternative, focused form errors, reduced-motion handling, and responsive overflow safeguards.

## Verification

The automated suite contains five passing end-to-end scenarios. It verifies a reproducible legacy baseline, a clean configured axe scan, keyboard-operated tabs, deal-filter state, focused validation errors, successful form completion, first-focus skip navigation, and mobile overflow behavior.

The automated result is evidence for the tested pages and rules only. Screen-reader validation and a full manual WCAG audit remain separate QA steps and are not claimed as complete.

## Business value

- Reduces friction in high-value product workflows
- Gives engineering teams reproducible accessibility regression coverage
- Preserves brand quality while improving operability and clarity
- Makes risk and forecast evidence easier to understand across roles
- Creates a stronger foundation for broader manual and assistive-technology testing

