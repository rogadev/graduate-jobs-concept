<script setup>
const props = defineProps({
  results: {
    type: Object,
    default: {},
  },
});

const hasResults = computed(() => {
  return Object.keys(props.results).length > 0;
});

const hasGraduateJobs = computed(() => {
  return new Array(props.results.after_graduation)[0].length > 0;
});

const hasExperiencedJobs = computed(() => {
  return new Array(props.results.with_experience)[0].length > 0;
});
</script>

<template>
  <div>
    <div v-if="hasResults">
      <div v-if="hasGraduateJobs">
        <h2>Applicable Jobs</h2>
        <p>
          This is an exhaustive list of positions you could potentially apply
          for upon graduation from your program.
        </p>
        <div class="results-area">
          <ResultChip
            v-for="result of results.after_graduation"
            :result="result"
          />
        </div>
      </div>
      <div v-if="hasExperiencedJobs">
        <h2>Future Positions</h2>
        <p>
          Future positions require a bit more experience in the industry but,
          with a bit of experience, these are all potential career paths for
          you.
        </p>
        <div class="results-area">
          <ResultChip
            v-for="result of results.with_experience"
            :result="result"
          />
        </div>
      </div>
      <div v-if="!hasGraduateJobs && !hasExperiencedJobs">
        <p>Sorry, no jobs were returned from your search.</p>
      </div>
    </div>
    <div v-else>
      <p>No results found.</p>
    </div>
  </div>
</template>

<style scoped>
.results-area {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 4rem;
  padding: 0.5rem;
}
@media (max-width: 768px) {
  .results-area {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 480px) {
  .results-area {
    grid-template-columns: 1fr;
  }
}
</style>