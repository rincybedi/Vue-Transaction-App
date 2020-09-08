<template>
  <div>
    <md-tabs md-sync-route>
      <md-tab id="tab-view-ts" md-label="View" to="/View"></md-tab>
      <md-tab id="tab-add-ts" md-label="New" to="/New" exact></md-tab>
      <md-tab id="tab-reset-ts" md-label="Reset" to="/Reset"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: "TopNav",
};
</script>

<style scoped></style>
