# CatCaster Zapier app (P1-F scaffold)

Zapier Platform app that talks to the **public CatCaster API** (`/api/v1`). It does **not** use the internal `ZapierSocialProvider` publish adapter.

**Canonical open-source repo:** [github.com/picaro/catcaster-zapier](https://github.com/picaro/catcaster-zapier) (this directory is a monorepo mirror).

## Features (v0.1)

- **Auth:** API key (Bearer) + optional base URL
- **Triggers (REST hooks):** Post Published, Post Failed — registers `bundle.targetUrl` via `POST /api/v1/webhooks`
- **Actions:** Create Draft, Publish Post

## Local development

```bash
git clone https://github.com/picaro/catcaster-zapier.git
cd catcaster-zapier
npm install
npx zapier login
npx zapier push   # after linking a Zapier integration in the developer UI
npx zapier test
```

Set `CATCASTER_API_KEY` and `CATCASTER_PROJECT_ID` in Zapier environment variables for tests.

## Marketplace submission

1. Create a Zapier Platform app in [developer.zapier.com](https://developer.zapier.com)
2. Point the CLI at this directory (`zapier register "CatCaster"`)
3. Provide OAuth or API key instructions matching [Settings → Developer](https://www.catcaster.com/settings?tab=developer)
4. Document webhook signature verification for advanced users (`CatCaster-Signature`)

See `docs/external-ecosystem/MARKETPLACE.md` in the monorepo.
