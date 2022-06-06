## Nuxt will automatically read in any file in the ~/server/middleware to create server middleware for your project.

### Middleware handlers will run on every request before any other server route to add check and some headers, log requests, or extend the event's request object.

Middleware handlers should not return anything (nor close or respond to the request) and only inspect or extend the request context or throw an error.

```ts
// server/middleware/log.ts
export default defineEventHandler((event) => {
  console.log('New request: ' + event.req.url)
})
```

```ts
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  event.context.auth = { user: 123 }
})
```
