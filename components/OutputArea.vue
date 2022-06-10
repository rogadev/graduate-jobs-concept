<script setup>
const props = defineProps({
  results: {
    type: Object,
    default: {},
  },
});

const showModal = ref(false);

const openModal = (jobSelected) => {
  console.log(jobSelected);
  // Set our selected job
  selectedJob.title = jobSelected;
  selectedJob.number = "";
  selectedJob.requirements = "";
  // Show the modal
  showModal.value = true;
};

const closeModal = () => {
  // Hide the modal
  showModal.value = false;
  // Reset the selected job
  selectedJob.title = "";
  selectedJob.number = "";
  selectedJob.requirements = "";
};

const selectedJob = reactive({
  title: "",
  number: "",
  requirements: "",
});

const graduateJobs = ref([]);
const experiencedJobs = ref([]);

watch(props.results, () => {
  for (const job of props.results.jobs) {
    if (job.requires_experience) {
      experiencedJobs.push(job);
    } else {
      graduateJobs.push(job);
    }
  }
  console.log(graduateJobs, experiencedJobs);
});
</script>

<template>
  <div class="output-area">
    <div v-if="results.length > 0">
      <div v-if="graduateJobs.length > 0">
        <h2>Applicable Jobs</h2>
        <p>
          This is an exhaustive list of positions you could potentially apply
          for upon graduation from your program.
        </p>
        <div class="results-area">
          <ResultChip
            v-for="result of results.after_graduation"
            :result="result"
            @click="openModal(result)"
          />
        </div>
      </div>
      <div v-if="experiencedJobs.length > 0">
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
            @click="openModal(result)"
            @close="closeModal"
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
    <JobDetailsModal
      v-if="showModal"
      :job-title="selectedJob.title"
      :noc-number="selectedJob.number"
      :job-requirements="selectedJob.requirements"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.output-area {
  width: 85%;
  margin: inherit auto;
}
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