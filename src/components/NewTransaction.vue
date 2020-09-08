<template>
  <div id="divNewTsContainer" class="container">
    <span class="md-title">New Transaction</span>
    <md-field>
      <label>Details</label>
      <md-textarea v-model="tsDetails" md-counter="40"></md-textarea>
    </md-field>
    <md-field>
      <label for="tsAmount">Amount</label>
      <md-input
        type="number"
        id="tsAmount"
        v-model="tsAmount"
        required
      ></md-input>
      <span class="md-error">There is an error</span>
    </md-field>

    <div>
      <label id="lblTsType">Transaction Type</label>
      <md-radio v-model="tsType" value="1">Debit</md-radio>
      <md-radio v-model="tsType" value="2">Credit</md-radio>
    </div>
    <md-button class="md-raised md-primary" @click="saveNew">
      Save
    </md-button>
    <!-- <router-link to="/List">
      <md-button class="md-primary">Go To List</md-button>
    </router-link> -->
  </div>
</template>

<script>
// import { Store } from "../store.js";
export default {
  name: "NewTransaction",
  data: function() {
    return {
      tsAmount: "",
      tsDetails: "",
      tsType: "",
      invalidInputMessage: "Invalid Input !!!",
    };
  },
  methods: {
    getNewTranscationDetails: function() {
      var ts = {
        id: this.id,
        tsAmount: this.tsAmount,
        tsDetails: this.tsDetails,
        tsType: this.tsType,
      };
      this.id = "";
      this.tsAmount = "";
      this.tsDetails = "";
      this.tsType = "";
      return ts;
    },

    saveNew: function() {
      // this.$store.commit("addNewTs", this.getNewTranscationDetails());
      this.$store.dispatch("saveNewTs", this.getNewTranscationDetails());
    },
  },
  watch: {
    instName: function(newVal, oldVal) {
      console.log("Ts Name modfied from " + oldVal + " to " + newVal);
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}

#lblTsType {
  padding-right: 26px;
  top: -5px;
  position: relative;
}
</style>
