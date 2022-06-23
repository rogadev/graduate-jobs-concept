<script setup>
useHead({
  title: "VIU Graduate Career Outlooks - Careers by Program",
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

let selectedProgram;
const programs = await $fetch("/api/v1/programs");
</script>

<template>
  <div>
    <nuxt-link to="/">Back</nuxt-link>
    <h1>Search for Jobs by Program</h1>
    <select
      class="select-field"
      name="credential_type"
      id="credential_type"
      v-model="selectedProgram"
    >
      <option v-for="option of programs" :value="option.nid" :key="option.nid">
        {{ option.title }}
      </option>
    </select>
    <button>Search</button>
  </div>
</template>

<style scoped>
.select-field {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}
</style>