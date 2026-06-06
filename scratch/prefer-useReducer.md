# `react-doctor/prefer-useReducer`

Group related state: `const [state, dispatch] = useReducer(reducer, { field1, field2, ... })`

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a component has 5 or more useState calls in its top-level body (RELATED_USE_STATE_THRESHOLD). The rule is a pure count — it does not verify the states are conceptually related, so a component with truly independent unrelated state slices can still trip it. Review the slices before refactoring.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Group the conceptually-related state into one reducer — const [state, dispatch] = useReducer(reducer, { field1, field2 }) — and dispatch typed actions like { type: 'fieldChanged', name, value }. Leave genuinely independent values as their own useState. Reducers also make state transitions easier to test in isolation. See https://react.dev/learn/extracting-state-logic-into-a-reducer
