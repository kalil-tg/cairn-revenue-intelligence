# Manual Accessibility QA Plan

Automated checks are complete for the current portfolio scope. Before claiming broader conformance in a real engagement, run and record the following manual work.

## Keyboard and focus

- Traverse every action in logical order with Tab and Shift+Tab
- Confirm focus remains visible at 200% and 400% zoom
- Verify dialog open, close, initial focus, Escape behavior, and focus return
- Verify tab Home, End, Left, and Right behavior in every rendered state
- Confirm no keyboard trap and no content becomes unreachable

## Screen readers

- NVDA with current Chrome and Firefox on Windows
- VoiceOver with Safari on macOS and iOS
- TalkBack with Chrome on Android if the product targets mobile workflows
- Check landmarks, headings, form messages, tab announcements, filter state, chart alternative, and dynamic deal updates

## Visual and cognitive checks

- Windows High Contrast / forced colors
- 200% and 400% browser zoom without loss of content or function
- Text spacing overrides and increased default font size
- Contrast review for hover, focus, disabled, error, and selected states
- Plain-language review for instructions, status, and validation

## Compatibility record

For each combination, record browser version, assistive technology version, viewport, scenario, outcome, defect severity, reproduction steps, and retest result.

