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

const selectedProgramNid = ref(0);
const searchResults = ref([]);
const selectedJob = ref({});
const showModal = ref(null);

const programs = await $fetch("/api/v1/programs");

const updateSearch = async () => {
  console.log(selectedProgramNid.value);
  const url = new URL("/api/v1/jobs-by-program", window.location.origin);
  url.searchParams.append("nid", selectedProgramNid.value);
  searchResults.value = await $fetch(url);
};

const jobs = computed(() => {
  if (Object.keys(searchResults.value).length === 2) {
    return searchResults.value.jobs;
  }
});

const groups = computed(() => {
  if (Object.keys(searchResults.value).length === 2) {
    return searchResults.value.groups;
  }
});

function getGroupDetails(noc) {
  const group = groups.value.find((group) => {
    return group.noc === noc;
  });

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

function setSelectedJob(job) {
  const noc = jobs.value.find((j) => j.title === job.title).noc;
  selectedJob.value = {
    ...job,
    group: getGroupDetails(noc),
  };
}

const openModal = (job) => {
  setSelectedJob(job);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedJob.value = {};
};
</script>

<template>
  <div>
    <nuxt-link to="/">Back</nuxt-link>
    <h1>Search for Jobs by Program</h1>
    <select
      class="select-field"
      name="credential_type"
      id="credential_type"
      v-model="selectedProgramNid"
    >
      <option v-for="option of programs" :value="option.nid" :key="option.nid">
        {{ option.title }}
      </option>
    </select>
    <button @click="updateSearch">Search</button>
    <div v-if="Object.keys(searchResults).length > 0">
      <ResultChip
        v-for="job in jobs"
        :key="job.noc"
        :result="job.title"
        @click="openModal(job)"
      />
    </div>
    <JobDetailsModal
      v-if="showModal"
      :details="selectedJob"
      @close="closeModal"
    />
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