# Project Workflow

This document outlines the standard workflow for contributing to Launcher UI.

## Development Process

1. **Branching**
   - Always create a new branch for each task or feature.
   - Branch names should be descriptive (e.g., `feature/launcher-cards`, `fix/auth-state`).

2. **Iterative Development**
   - Commit often.
   - Push to your branch frequently to record history.

3. **Pull Requests**
   - Create a Pull Request (PR) for your changes using `gh pr create`.
   - Use `PR_DESCRIPTION.md` as the PR body:
     `gh pr create --title "..." --body-file PR_DESCRIPTION.md`
   - The PR body **must** include the original user prompt(s) and any relevant user comments verbatim.
   - Update the PR description as the task evolves.

4. **Artifacts**
   - All planning and documentation artifacts (e.g., `implementation_plan.md`, walkthroughs) must be committed to the repo in `docs/` or another agreed location.

## Documentation
- **E2E Testing**: See `E2E_GUIDE.md`.
