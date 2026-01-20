# Summary
- Add platform-specific E2E snapshots and docs so Mac/Windows/Linux can coexist with zero-pixel tolerance.
- Add a Linux snapshot update workflow runnable via `gh workflow run`.
- Update Playwright config and docs to target Linux in CI.

# Testing
- `npm run ci`
- `npm test`
- `npm run test:e2e`

# Questions / Open Issues
- None.

# Original User Prompt(s)
> We are going to convert this repository into a repository agents can work in effectively. I want to have an E2E zero pixel diff tolerance standard, a workflow that causes agents to generate PRs, precommits that enforce testing. In the sample_setup_stuff are files to review, review all the files; and there are two example repositories, a food logger and a tabletop game repository. This repository is the launcher for the tabletop game system. Reveiw all of tehse documents and put up a PR with changes to make this repository an effective place for you to work.
