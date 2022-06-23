<script setup>
useHead({
  title: "VIU Graduate Career Outlooks",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [
    {
      name: "description",
      content:
        "Search for careers and career outlooks in Canada based on a given VIU credential.",
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css",
      integrity:
        "sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor",
      crossorigin: "anonymous",
    },
  ],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js",
      integrity:
        "sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2",
      crossorigin: "anonymous",
    },
  ],
});
</script>

<template>
  <div>
    <h1>Welcome</h1>
    <ul>
      <li>
        <nuxt-link to="/by-program">Search for jobs by program</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/by-credential">Search for jobs by credential</nuxt-link>
      </li>
    </ul>
  </div>
</template>