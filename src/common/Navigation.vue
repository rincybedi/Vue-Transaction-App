<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Welcome to Transaction App</span>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Transaction App</span>
      </md-toolbar>

      <md-list md-sync-route>
        <md-list-item>
          <md-button id="tab-view-ts" class="md-list-item-text" to="/View"
            >View</md-button
          >
        </md-list-item>

        <md-list-item>
          <md-button id="tab-view-ts" class="md-list-item-text" to="/New"
            >New</md-button
          >
        </md-list-item>

        <md-list-item>
          <md-button id="tab-view-ts" class="md-list-item-text" to="/Reset"
            >Reset</md-button
          >
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  data: () => ({
    showNavigation: false,
    showSidepanel: false,
  }),
};
</script>

<style scoped></style>
