<template>
  <div id="details-modal" class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2>{{ titleCase(jobTitle) }}</h2>
      </div>
      <div class="modal-body">
        <p>NOC# {{ nocNumber || "error" }}</p>
        <p>{{ jobRequirements || "error" }}</p>
      </div>
      <div class="modal-footer">
        <button class="btn" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["job-title", "noc-number", "job-requirements"]);

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
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0); /* fallback only */
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-header {
  background-color: #f1f1f1;
  padding: 20px;
  font-size: 20px;
  text-align: center;
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 7px;
}
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-top: -8px;
}
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.btn {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0 0 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
}
</style>