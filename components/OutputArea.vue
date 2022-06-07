<script setup>
defineProps({
  results: {
    type: Object,
    default: {},
  },
});

// Title case string, ignoring anything inside of brackets
function titleCase(str) {
  const words = str.split(" ");
  const result = [];

  words.forEach((word) => {
    result.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return result.join(" ");
}
</script>

<template>
  <div>
    <div v-if="results.length !== {}">
      <div v-if="results.after_graduation">
        <h2>Applicable Jobs</h2>
        <div v-for="result of results.after_graduation">
          {{ titleCase(result) }}
        </div>
      </div>
      <div v-if="results.with_experience">
        <h2>Future Positions</h2>
        <div v-for="result of results.with_experience">
          {{ titleCase(result) }}
        </div>
      </div>
    </div>
    <div v-else>
      <p>No results found.</p>
    </div>
  </div>
</template>