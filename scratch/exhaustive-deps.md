# `react-doctor/exhaustive-deps`

Match the deps array to what the hook callback actually captures, or stabilize/move recreated values instead of blindly adding them.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-deps>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on useEffect/useLayoutEffect/useInsertionEffect/useCallback/useMemo/useImperativeHandle (plus configured additionalHooks) when the callback's closure captures a reactive value missing from the deps array, or the array lists something the callback never uses, or it contains a duplicate, spread, literal, computed-member, ref.current, useEffectEvent, or inline-recreated (object/array/function/regex) dependency; it also flags missing/non-array deps and outer-variable assignments. Values it treats as stable and deliberately does NOT require are useState/useReducer setters, dispatch, startTransition, useRef bindings, useEffectEvent handlers, module-scope/imported constants, and primitive-literal local consts. False positive: a captured value the author intentionally excludes (e.g. a mount-only effect or a function known to be referentially stable) that the static check cannot prove safe.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add the genuinely reactive captures to the deps array (useEffect(() => { read(id); }, [id])). If a value is recreated each render, stabilize it (wrap functions in useCallback, objects/arrays in useMemo) or move it inside the callback; for setState use the updater form setCount(c => c + 1) so count drops out of deps. Depend on the ref itself, not ref.current, and never spread or list literal/computed expressions. Only when exclusion is truly intentional, add a linter suppression comment (e.g. oxlint-disable-next-line) with a written justification rather than silencing broadly. See https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-deps
