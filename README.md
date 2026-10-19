# Massive user load — Azure AD B2C proof of concept

A small library to create users **at volume** against Azure Active Directory B2C: batching, throttling, and error handling against a directory that will rate-limit you if you are naive about it.

- `azureB2cClient.js` — directory client · `loadComponents/` — batching and load logic
- `massiveUsersLoad.js` — entry point · `microsoftGraphClient.js` — Graph API access

**Context:** 2019. It is here because it is the earliest piece of load-and-failure work in this account — the argument that later shows up in production incident work is already in this repo: the API is the constraint, not your loop.
