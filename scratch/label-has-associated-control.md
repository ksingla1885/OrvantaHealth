# `react-doctor/label-has-associated-control`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/label-has-associated-control>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a <label> neither wraps an input/select/textarea (or configured control component) nor has an htmlFor pointing at one, or when the label has no accessible text content. The rule walks children up to `depth` (default 2). False positive: a custom Label/Input pair where labelComponents and controlComponents are not configured for your design system.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Either wrap the control inside the label (<label>Surname <input type='text' /></label>) or use htmlFor with a matching id (<label htmlFor='surname'>Surname</label><input id='surname' />). Ensure the label has visible text. For custom components, configure labelComponents/controlComponents/labelAttributes in the rule options. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/label-has-associated-control
