# Portfolioblog01
### Hono framework based backend for a portfolio blog 


To install dependencies:

```bash
bun install
```

Running in dev environment:

```bash
bun run dev.ts
```
## Endpoints

Healthcheck endpoint at /hcheck verifies if backend can establish connection with database.

GET /posts/?page=1&pageSize=7 returns paginated list of posts
- **page** is page number
- **pageSize** is page size accordinly

GET /posts/post-slug returns a post with specified slug


POST /posts stores the post into a database

TODO: 
- Storing tags
- Full text search
- search autocomplete menu endpoint
- front end (?)

This project was created using `bun init` in bun v1.3.13. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
