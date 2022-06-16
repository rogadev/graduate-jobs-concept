<script setup>
// Import TitleCase Helper
const { $titleCase } = useNuxtApp();

// Component Props
const { jobs, groups } = defineProps({
  jobs: {
    type: Array,
    required: true,
  },
  groups: {
    type: Array,
    required: true,
  },
});

const hasResults = jobs.length > 0; // Used in rendering either results or "no results found".
const showModal = ref(false);
const selectedJob = ref(null);
const subFilterInput = ref("");

const filteredJobResults = computed(() => {
  return jobs.filter((job) => {
    return job.title
      .toLowerCase()
      .includes(subFilterInput.value.toLowerCase().trim());
  });
});

const jobsRequiringExperience = computed(() => {
  return filteredJobResults.value.filter((job) => {
    return findGroup(job.noc).requires_experience;
  });
});

const jobsNotRequiringExperience = computed(() => {
  return filteredJobResults.value.filter((job) => {
    return !findGroup(job.noc).requires_experience;
  });
});

// Get related group details for a given NOC number.
function getGroupDetails(noc) {
  const group = findGroup(noc);

  return {
    noc,
    title: group.title,
    duties: group.duties,
    education: group.education,
    experience: group.experience,
    requirements: group.requirements,
    description: group.duties,
  };
}

// Search for a group by NOC number.
function findGroup(noc) {
  return groups.find((group) => {
    return group.noc === noc;
  });
}

function openModal(job) {
  setSelectedJob(job);
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function setSelectedJob(job) {
  const noc = jobs.find((j) => j.title === job.title).noc;
  selectedJob.value = {
    ...job,
    noc,
    group: getGroupDetails(noc),
  };
}

function clearSearch() {
  subFilterInput.value = "";
}
</script>

<template>
  <div class="output-area">
    <div v-if="hasResults">
      <div class="filter-section">
        <h3>Sub-Search These Results</h3>
        <p class="filter-section-sub-header">
          Start typing to filter through search results.
        </p>
        <div class="sub-search-area">
          <input type="text" v-model="subFilterInput" />
          <button @click.prevent="clearSearch">Clear</button>
        </div>
      </div>
      <div v-if="true">
        <h3>Jobs Available After Graduation</h3>
        <div class="results-area">
          <ResultChip
            v-for="(job, index) of jobsNotRequiringExperience"
            :key="job.title + index"
            :result="job.title"
            @click="openModal(job)"
          />
        </div>
      </div>
      <div v-if="true">
        <h3>Jobs Available With Credential &amp; Experience</h3>
        <div class="results-area">
          <ResultChip
            v-for="(job, index) of jobsRequiringExperience"
            :key="job.title + index"
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
.filter-section-sub-header {
  margin-left: 0.75rem;
}
.sub-search-area {
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  display: flex;
}
.sub-search-area > input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
}
.sub-search-area > button {
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
}
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