<script setup>
const props = defineProps({
  details: {
    type: Object,
    required: true,
  },
});

const jobNoc = ref(props.details.noc);
const jobTitle = ref(props.details.title);
const jobDescription = ref(props.details.group.description);
const jobRequirements = ref(props.details.group.requirements);
const jobGroupName = ref(props.details.group.title);
</script>

<template>
  <div id="details-modal" class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2>{{ $titleCase(jobTitle) }}</h2>
      </div>
      <div class="modal-body">
        <div class="group-details">
          <h3>
            NOC Group:
            <span v-if="jobGroupName">{{ $titleCase(jobGroupName) }}</span>
            <span v-else>Unknown</span>
          </h3>
          <h3>
            NOC Code: <span v-if="jobNoc">{{ jobNoc }}</span
            ><small v-else><i>unknown</i></small>
          </h3>
        </div>
        <h4>Requirements</h4>
        <ul>
          <li v-for="requirement of jobRequirements">
            {{ requirement }}
          </li>
        </ul>
        <h4>Description</h4>
        <ul>
          <li v-for="description of jobDescription">
            {{ description }}
          </li>
        </ul>
        <h4>Industry Outlook</h4>
        <p>Job forecasting and industry outlook features coming soon...</p>
      </div>
      <div class="modal-footer">
        <button class="btn" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-details {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0 0 0;
  font-weight: bold;
}
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
  margin: 5% auto;
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
  font-weight: bold;
  padding: 14px 20px;
  margin: 8px 0 0 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
}
.btn:hover {
  background-color: #45a049;
}
</style>