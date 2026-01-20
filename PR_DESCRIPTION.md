# Summary
- Split the sign-in flow into its own route and redirect the root route to sign-in.
- Add a launcher route with an Orbit View placeholder and application list fed by a shared store.
- Introduce a launcher store to manage auth state and Firestore application subscriptions.

# Testing
- `npm run ci`
- `npm test`
- `npm run test:e2e`

# Questions / Open Issues
- None.

# Original User Prompt(s)
> OK I rebased and merged that design. Looks good. Checkout main, pull, implement phase 1 of the design.
