<template>
  <div>
    <ConfirmDialog
      v-bind:showModal="showModal"
      v-bind:content="modalContent"
      v-bind:title="modalTitle"
      v-on:on-callback="onModalCloseCallback"
    ></ConfirmDialog>

    <md-button class="md-raised md-accent" @click="showModal = !showModal"
      >Reset All Transactions</md-button
    >
  </div>
</template>

<script>
import ConfirmDialog from "../common/ConfirmDialog.vue";
export default {
  name: "ResetTransaction",
  components: {
    ConfirmDialog,
  },
  data: function() {
    return {
      showModal: false,
      modalTitle: "Confirm delete",
      modalContent:
        "Clicking YES will delete all the transactions, Are your sure?",
    };
  },
  methods: {
    showResetConfirmDialog: function() {},
    onModalCloseCallback: function(clickedYes) {
      this.showModal = false;
      if (clickedYes) {
        this.$store.commit("deleteAllTs");
      }
      //   alert(clickedYes);
    },
  },
};
</script>
