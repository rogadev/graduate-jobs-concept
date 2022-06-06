## Create a new file in server/api/hello.ts:

```ts
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    api: 'works',
  }
})
```
