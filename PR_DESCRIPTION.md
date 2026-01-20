# Summary
- Replace the E2E auth bypass with Firebase emulator-backed sign-in and seeded launcher data.
- Add emulator tooling (seed script, env switcher, firebase config converter) plus local/staging/production dev scripts.
- Document emulator requirements and update auth routing tests to validate the populated games list.

# Testing
- `npm run ci`
- `npm test`
- `npm run test:e2e:update`
- `npm run test:e2e`

# Questions / Open Issues
- None.

# Original User Prompt(s)
> Yes we need e2e coverage of all code as you produce it.
>
> Yes, you must always generate Linux CI baselines so that the PR looks clean.
>
> There's no E2E test that shows the user signing in and then seing teh launcher screen. There should be one. You may need to use firebase's auth emulator for the purpose.
>
> What I want is for there to be some games on the 'available games' list once the user logs in. This requires either using the real firebase backend for that or having an emulator running. I am not fussed about which way it is done. We can write a script to download the real firestore data for loading into the emulator - I put an example in the samples directory - and run the emulator locally - I think this would be my preferred testing approach, so that e2e really is as close to e2e as possible. If you look in the admin project now in samples, you can see the setup for having a production dev server, a staging dev server, and an emulator dev server - I guess I'd like this project set up very similarly.
