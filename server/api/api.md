## Nuxt will automatically read in any file in the ~/server/api to create api routes for your project with a /api prefix.

### Create a new file in server/api/hello.ts:

```ts
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    msg: 'works',
  }
})
```

Test this route by using `$fetch` in your client-side code:

```js
const data = ref({})
data.value = await $fetch('/api/hello')
```

```html
<div>{{ data.msg }}</div>
```
