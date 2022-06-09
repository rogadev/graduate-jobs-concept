<script setup>
const loading = ref(false);
const results = ref({});
const credential = ref("Degree");
const keywords = ref("Computer Science");
const duration = ref("");
const hasSearched = ref(false);

const search = async () => {
  hasSearched.value = true;
  const url = new URL("/api/v1/jobs-by-credential", window.location.origin);
  url.searchParams.append("credential", credential.value);
  url.searchParams.append("keywords", keywords.value);
  if (duration.value !== "")
    url.searchParams.append("duration", keywords.value);

  loading.value = true;
  results.value = await $fetch(url);
  loading.value = false;
};

watch(credential, () => {
  if (credential.value !== "Degree") {
    duration.value = "";
  }
});
</script>

<template>
  <div>
    <h1>Search for Jobs by Credential</h1>
    <div class="input-area">
      <div class="input-grouping">
        <label for="credential_type">After a</label>
        <select
          class="select-field"
          name="credential_type"
          id="credential_type"
          v-model="duration"
          v-if="credential === 'Degree'"
        >
          <option value=""></option>
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
      <p v-if="loading">Loading...</p>
      <OutputArea :results="results" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}
.input-area {
  width: fit-content;
  margin: inherit auto;
}

.input-grouping {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid rgb(227, 227, 227);
  border-radius: 5px;
  box-shadow: 3px 4px 5px rgb(204, 204, 204);
  padding: 0.5rem;
  width: fit-content;
}
input {
  border: 1px solid rgb(207, 207, 207);
  border-radius: 3px;
  outline: none;
  padding: 0.5rem;
  margin: 0.5rem;
  width: 400px;
}
select {
  border: 1px solid rgb(207, 207, 207);
  border-radius: 3px;
  padding: 0.5rem;
  outline: none;
}
label:nth-of-type(1) {
  margin-left: 0.75rem;
}
button {
  background-color: rgb(8, 0, 255);
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5rem;
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
  padding: 0.25rem 0.5rem;
}

@media (max-width: 840px) {
  .input-area {
    max-width: 80%;
    margin: inherit auto;
  }
  .input-grouping {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
  .input-grouping > label {
    padding-left: 10px;
  }
}
@media (max-width: 570px) {
  .input-area {
    max-width: 100%;
  }
}
@media (max-width: 470px) {
  .input-area {
    width: auto;
  }
  .input-grouping {
    width: auto;
  }
  input {
    width: calc(100% - 2rem);
  }
}
</style>