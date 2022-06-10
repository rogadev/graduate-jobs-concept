<script setup>
// Import TitleCase Helper
const { $titleCase } = useNuxtApp();

// Component Props
const props = defineProps({
  jobs: {
    type: Array,
    required: true,
  },
  groups: {
    type: Array,
    required: true,
  },
});

// Reactive Variables
const showModal = ref(false);
const selectedJob = ref(null);

// Used in rendering either results or "no results found".
const hasResults = computed(() => {
  return props.jobs.length > 0;
});

// Sort jobs by experience requirements to render in the UI.
const noExpJobs = computed(() => {
  return props.jobs.filter((job) => {
    return job.requires_experience === false;
  });
});
const expJobs = computed(() => {
  return props.jobs.filter((job) => {
    return job.requires_experience === true;
  });
});

// Compute wether each job group has jobs or not.
const hasExperiencedJobs = computed(() => {
  return expJobs.value.length > 0;
});
const hasNoExperiencedJobs = computed(() => {
  return noExpJobs.value.length > 0;
});

// Get related group details for a given NOC number.
function getGroupDetails(noc) {
  const group = findGroup(noc);
  const title = group.title;
  const requirements = group.requirements;
  const description = group.description;
  return {
    title,
    requirements,
    description,
  };
}

// Search for a group by NOC number.
function findGroup(noc) {
  const group = props.groups.find((group) => {
    return group.noc === noc;
  });
  return group;
}

function openModal(job) {
  showModal.value = true;
  setSelectedJob(job);
}

function closeModal() {
  showModal.value = false;
}

function setSelectedJob(job) {
  selectedJob.value = {
    ...job,
    group: getGroupDetails(job.noc),
  };
}
</script>

<template>
  <div class="output-area">
    <div v-if="hasResults">
      <div v-if="hasNoExperiencedJobs">
        <h3>Jobs Available After Graduation</h3>
        <div class="results-area">
          <ResultChip
            v-for="job in noExpJobs"
            :result="job.title"
            @click="openModal(job)"
          />
        </div>
      </div>
      <div v-if="hasExperiencedJobs">
        <h3>Jobs Available With Credential &amp; Experience</h3>
        <div class="results-area">
          <ResultChip
            v-for="job in expJobs"
            :result="job.title"
            @click="openModal(job)"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <p>
        No results found. Try searching for different keywords. Check your
        spelling and remember to use the correct verbage. (ex. Instead of
        'computer engineer' try 'computer engineering')
      </p>
    </div>

    <!-- Modal -->
    <JobDetailsModal
      v-if="showModal"
      :details="selectedJob"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
h3 {
  margin-left: 0.75rem;
}
.output-area {
  width: 85%;
  margin: 3rem auto 0 auto;
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