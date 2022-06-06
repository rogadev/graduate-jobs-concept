<template>
  <div>
    <h1>test</h1>
    <div>test</div>
    <p>{{ data }}</p>
  </div>
</template>

<script setup>
const data = ref({});
data.value = await $fetch("/api/v1/jobs", {
  method: "post",
  body: { body: "this is the body" },
});
</script>