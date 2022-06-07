<script setup>
const props = defineProps({
  result: {
    type: String,
    required: true,
  },
});

/**
 * Title case string, ignoring anything inside of brackets
 * @param {string} str  - string to be title cased
 * @returns {string}    - title cased string
 */
function titleCase(str) {
  const words = str.split(" ");
  const result = [];

  words.forEach((word) => {
    result.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return result.join(" ");
}

const output = ref(titleCase(props.result));
</script>

<template>
  <div class="result">
    {{ output }}
  </div>
</template>

<style scoped>
.result {
  background-color: aliceblue;
  border: 1px solid rgb(200, 227, 250);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  transition: box-shadow 0.1s ease-in-out;
  cursor: pointer;
}
.result:hover {
  background-color: rgb(221, 239, 255);
  box-shadow: 3px 3px 5px rgb(204, 204, 204);
}
</style>