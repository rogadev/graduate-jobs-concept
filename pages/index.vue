<script setup>
// Reactive Variables
const credential = ref("Degree");
const keywords = ref("Computer Science");
const duration = ref("");
const loading = ref(false);
const hasSearched = ref(false);
const jobs = ref([]);
const groups = ref([]);
const searchCount = ref(0);

// Watchers for UI/UX
watch(credential, () => {
  if (credential.value !== "Degree") {
    duration.value = "";
  }
});

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
  // bodyAttrs: {
  //   class: 'test'
  // }
});

// Search Function
async function search() {
  // Loading...
  loading.value = true;
  // Prepare our search request.
  const url = new URL("/api/v1/jobs-by-credential", window.location.origin);
  url.searchParams.append("credential", credential.value);
  url.searchParams.append("keywords", keywords.value);
  if (duration.value) url.searchParams.append("duration", duration.value);
  // Fetch our data.
  const data = await $fetch(url);
  // Update our jobs and groups.
  jobs.value = data.jobs;
  groups.value = data.groups;
  // Increase search count.
  searchCount.value++;
  // We've run at least 1 search. Flipping hasSearched will render the search results area.
  hasSearched.value = true;
  // No longer loading
  loading.value = false;
}
</script>

<template>
  <div>
    <div class="input-container">
      <h1>Search for Jobs by Credential</h1>
      <div class="input-area">
        <label for="credential_type">After a</label>
        <select
          class="select-field"
          name="credential_type"
          id="credential_type"
          v-model="duration"
          v-if="credential === 'Degree'"
        >
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
        </select>
        <select
          class="select-field"
          name="credential_type"
          id="credential_type"
          v-model="credential"
        >
          <option value="Degree">Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Certificate">Certificate</option>
        </select>

        <label for="credential_type">in</label>
        <input
          type="text"
          name="credential_type"
          id="credential_type"
          :placeholder="keywords"
          v-model="keywords"
          @keyup.enter="search"
        />
        <button type="button" @click="search">Look for jobs</button>
      </div>
    </div>

    <div v-if="hasSearched">
      <p class="loading-text" v-if="loading">Loading...</p>
      <OutputArea v-else :key="searchCount" :jobs="jobs" :groups="groups" />
    </div>
  </div>
</template>

<style scoped>
.loading-text {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
}
.input-container {
  width: 100%;
}
h1 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}
.input-area {
  width: 85%;
  margin: 0 auto 1rem auto;
  min-width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(227, 227, 227);
  border-radius: 5px;
  box-shadow: 3px 4px 5px rgb(204, 204, 204);
  padding: 0.5rem;
}
input {
  border: 1px solid rgb(207, 207, 207);
  border-radius: 3px;
  outline: none;
  padding: 0.5rem;
  margin: 0.5rem;
  width: 380px;
}

label:nth-of-type(1) {
  margin-left: 0.75rem;
}
button {
  background-color: rgb(8, 0, 255);
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  margin-right: 0.75rem;
  width: fit-content;
  font-weight: bolder;
  cursor: pointer;
  transition: background-color, box-shadow;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
  box-shadow: 3px 4px 5px rgb(220, 220, 220);
}
button:hover {
  background-color: #1da804;
  box-shadow: 3px 4px 5px rgb(238, 238, 238);
}
.select-field {
  width: fit-content;
  margin: 0.5rem;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 3px;
  padding: 0.5rem;
  outline: none;
}
label {
  font-weight: semi-bold;
  font-size: 1.25rem;
}

@media (max-width: 950px) {
  .input-area {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .select-field {
    width: 400px;
  }
  label:nth-of-type(1) {
    margin-left: 0;
  }
  button {
    width: 400px;
    margin: 1rem auto;
  }
}
@media (max-width: 470px) {
  input {
    width: calc(100% - 3rem);
  }
  button {
    width: calc(100% - 2rem);
  }
  .select-field {
    width: calc(100% - 2rem);
  }
}
</style>