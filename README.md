# Behavior Pattern Reflection

Eight-scenario, author-created reflection at `/toxic-trait-test/`. It is not a diagnostic or validated assessment.

## Release contract

- Ads remain fully suspended while the 2026-09-03 invalid-traffic restriction is active.
- Public funnel: `toxic_trait_view` -> `start` -> `progress` (four accepted answers) -> `complete`, with success-only `share`, `next_click`, and delegated `related_click`.
- Events contain only `event_category`; answers, result labels, scores, locale, URL, and timing stay private.
- Each answer adds one point to one mapped label; the first matching label breaks ties.
- Verify from the workspace root with `npm run verify:toxic-trait`.
