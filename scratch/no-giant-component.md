# `react-doctor/no-giant-component`

Extract logical sections into focused components: `<UserHeader />`, `<UserActions />`, etc.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any uppercase-named function declaration or arrow-assigned component whose body spans more than 300 source lines (start to end line of the function body). The line-count threshold is a heuristic — a long but cohesive JSX-heavy component can still be readable, while a shorter component with tangled responsibilities can be a worse offender. Use judgment beyond the raw count.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Identify the distinct logical sections (header, list, footer, side panel, action bar) and extract each into a focused subcomponent like <UserHeader /> or <UserActions />. Lift shared data fetching and effects into custom hooks. Resist premature splits that obscure data flow; aim for each extracted piece to have a single responsibility. See https://react.dev/learn/thinking-in-react
