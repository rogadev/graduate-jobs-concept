<script setup>
const loading = ref(false);
const results = ref({});
const credential = ref("Degree");
const field = ref("Computer Science");

const search = () => {
  const url = new URL("/api/v1/jobs", window.location.origin);
  url.searchParams.append("credential", credential.value);
  url.searchParams.append("field", field.value);

  loading.value = true;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      results.value = data;
      loading.value = false;
    })
    .catch((err) => {
      console.error(err);
      loading.value = false;
    });
};
</script>

<template>
  <div>
    <h1>VIU Program Graduate Jobs</h1>
    <div class="input-area">
      <div class="input-grouping">
        <label for="credential_type"
          >Type of credential - try "diploma" or "degree"</label
        >
        <input
          type="text"
          name="credential_type"
          id="credential_type"
          v-model="credential"
        />
      </div>
      <div class="input-grouping">
        <label for="credential_type"
          >Field of Study - try "computer engineering" or "computer
          science"</label
        >
        <input
          type="text"
          name="credential_type"
          id="credential_type"
          v-model="field"
        />
      </div>
      <button type="button" @click="search">Look for jobs</button>
    </div>

    <p v-if="loading">Loading...</p>
    <OutputArea :results="results" />
  </div>
</template>

<style scoped>
.input-area {
  width: fit-content;
}
.input-grouping {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border: 1px solid black;
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
.input-area > button {
  background-color: rgb(8, 0, 255);
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5rem;
  width: fit-content;
  font-weight: bolder;
  cursor: pointer;
  transition: background-color, box-shadow;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
  box-shadow: 3px 4px 5px rgb(220, 220, 220);
}
.input-area > button:hover {
  background-color: #1da804;
  box-shadow: 3px 4px 5px rgb(238, 238, 238);
}
</style>