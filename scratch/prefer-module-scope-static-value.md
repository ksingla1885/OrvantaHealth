# `react-doctor/prefer-module-scope-static-value`

Hoist the static array/object literal to module scope above the component: const FILTER_OPTIONS = ["all", "active", "done"]; function App() { ... }

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a VariableDeclarator with an Identifier id whose initializer (after stripParenExpression) is an ArrayExpression or ObjectExpression literal, declared directly in a component/hook body scope (enclosingComponentOrHookScope, which walks to the nearest enclosing function and stops there), where hasComponentLocalReferences finds NO reference resolving to a symbol inside the component bodyScope, and isBindingMutatedAfterInit finds no mutation. Module-level imports/globals captured in the value still count as hoistable (RANKED_ROLES = [ROLES.admin, ROLES.editor] fires). It deliberately fires inside memo()/forwardRef()-wrapped components and even when the binding is only READ via .includes/.find/.map/property access/index reads (read-only methods are excluded from MUTATING_RECEIVER_METHOD_NAMES). Does NOT fire on: primitives (const MAX = 100); empty accumulator literals that get mutated (const parts = []; parts.push(...)); values inside useMemo/useCallback callbacks or event handlers (the nearest enclosing function is the callback, not the component); values already at module scope or in lowercase/non-component helpers (makeApi); arrays/objects containing inline function expressions, since hasComponentLocalReferences flags any nested Arrow/FunctionExpression as a local capture (const handlers = [() => ..., () => ...]); bindings the detector already sees as mutated after init via isMutationContext — rebinding (OPTS = ...), property reassignment (CONFIG.mode = ...), index assignment (OPTS[0] = ...), delete CONFIG.x, or a mutating method call (OPTS.push(...), map.set(...)); and PascalCase non-hook factory functions that return a plain object literal (e.g. a ProseMirror plugin factory like AIHandlePlugin), which enclosingComponentOrHookScope drops via doesFunctionReturnsObjectLiteral because they are called once and never re-render. The only genuine residual false positives a reviewer should suppress: the binding IS mutated but through a path isMutationContext cannot resolve — an alias (const a = OPTS; a.push(x)) or by being passed into a function that mutates it in place — so hoisting would create a shared mutable module singleton; or the literal actually closes over local state/props/inner-function bindings that scope analysis failed to resolve, making the hoist break semantics.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the literal out of the component to module scope (above the component, after imports) since it references no local state: change function App() { const FILTER_OPTIONS = ["all","active","done"]; ... } to const FILTER_OPTIONS = ["all","active","done"]; function App() { ... } so the array/object is allocated once and memoised consumers receive a stable reference across renders. Only hoist if the binding is genuinely read-only after init across every path including aliases and functions it is passed to; if it is mutated in place, leave it in the component or refactor the mutation away (e.g. build the value from props/state during render) before hoisting.
