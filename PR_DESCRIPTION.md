## Summary

- what changed: Refactored `HushhTechFooter` component to split types into a separate file and resolved broken imports across `Home`, `Profile`, `Community`, and `Discover Fund A` pages.
- why it changed: To fix Vite Fast Refresh warnings and restore build stability after refactoring.
- linked issue: none - this is an internal refactoring of footer components
- acceptance criteria covered: Footer must be accessible and type-safe without triggering terminal noise.
- risk area touched: `ui`, `ci`
- reviewer focus: Verify that the footer still renders correctly on mobile and that tests pass.

## Validation

- [x] Ran `npm run lint` and verified that `HushhTechFooter.tsx` and `useFooterVisibility.ts` are clean.
- [x] Ran `npm run test` and verified that `navigationCurrentPageSemantics.test.ts` passes after the refactor.
- [x] Ran `npx tsc --noEmit` to ensure no type regressions.
- ran: `npm run lint`, `npm run test`, `npx tsc --noEmit`
- did not run: production deployment
- reviewer should verify: Check the footer visibility on onboarding pages to ensure the hook fix works as expected.

## Notes

- deployment impact: None.
- migration or env requirements: None.
- rollback or release notes: Standard UI component refactor.
- follow-up work if any: None.
- reviewer callouts: @pranaovs
