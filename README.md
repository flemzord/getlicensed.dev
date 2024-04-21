# getlicensed.dev

## Local env

```
wrangler d1 execute getlicensed-local --local --file ./server/database/migrations/0000_cuddly_skrulls.sql
```

## Deploy in production

```
npx wrangler d1 migrations apply getlicensed-prod --env=production --remote
```
