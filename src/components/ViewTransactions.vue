<template>
  <div>
    <md-table
      v-model="searched"
      md-sort="name"
      md-sort-order="asc"
      md-card
      md-fixed-header
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Transaction List</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Search By Transaction Details..."
            v-model="search"
            @input="searchOnTable"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state md-label="No record found"> </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Transaction ID" md-sort-by="id" md-numeric>{{
          item.id
        }}</md-table-cell>
        <md-table-cell md-label="Transaction Date" md-sort-by="id" md-numeric>{{
          item.tsDate | getTransactionDate(item.tsDate)
        }}</md-table-cell>
        <md-table-cell md-label="Transaction Details" md-sort-by="tsDetails">{{
          item.tsDetails
        }}</md-table-cell>
        <md-table-cell md-label="Transaction Amount" md-sort-by="tsAmount">{{
          item.tsAmount
        }}</md-table-cell>
        <md-table-cell md-label="Transaction Type" md-sort-by="tsType">{{
          item.tsType | getTransactionType(item.tsType)
        }}</md-table-cell>
        <md-table-cell md-label="Actions" v-if="!item.isRevertedTs">
          <md-button class="md-accent" @click="revertTs(item.id)">
            Revert</md-button
          >
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-subheader>Closing Balance : {{ closingBalance }} </md-subheader>

    <ConfirmDialog
      v-bind:showModal="showModal"
      v-bind:content="modalContent"
      v-bind:title="modalTitle"
      v-on:on-callback="onModalCloseCallback"
    ></ConfirmDialog>
  </div>
</template>

<script lang="ts">
import ConfirmDialog from "../common/ConfirmDialog.vue";
const toLower = (text) => {
  if (text) {
    return text.toString().toLowerCase();
  }
  return text;
};

const searchByName = (items, term) => {
  if (term != null) {
    return items.filter((item) =>
      toLower(item.tsDetails).includes(toLower(term))
    );
  }
};

export default {
  name: "TransactionList",
  components: {
    ConfirmDialog,
  },
  data: function() {
    return {
      closingBalance: 0,
      search: null,
      showModal: false,
      cancelTsId: "",
      modalTitle: "Confirm Revert",
      modalContent: "Clicking YES will revert this transaction, Are your sure?",
    };
  },
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.transactions, this.search);
    },

    getClosingBalanace: function() {
      var ts = this.transactions;
      var totalDebited = ts
        .filter((t) => t.tsType == 1)
        .reduce((a, b) => a + parseInt(b["tsAmount"]), 0);
      var totalCredited = ts
        .filter((t) => t.tsType == 2)
        .reduce((a, b) => a + parseInt(b["tsAmount"]), 0);
      this.closingBalance = totalCredited - totalDebited;
    },

    onModalCloseCallback(clickedYes) {
      this.showModal = false;
      if (clickedYes && this.cancelTsId) {
        var currentTs = this.transactions.filter(
          (t) => t.id == this.cancelTsId
        )[0];
        this.$store.dispatch("saveNewTs", {
          tsType: currentTs.tsType == 1 ? 2 : 1,
          tsDetails: "Transaction reverted for ID :  " + currentTs.id,
          tsAmount: currentTs.tsAmount,
          revertedTsId: this.cancelTsId,
        });
        this.getClosingBalanace();
        // this.$store.commit("revertTransaction", currentTs[0]);
      }
    },

    revertTs(id) {
      this.showModal = !this.showModal;
      this.cancelTsId = id;
    },
  },
  created() {
    this.searched = this.transactions;
    this.getClosingBalanace();
  },
  filters: {
    getTransactionType(type) {
      return type == 1 ? "Debit" : "Credit";
    },
    getTransactionDate(date) {
      return new Date(date).toLocaleString();
    },
  },
  computed: {
    transactions: function() {
      return this.$store.getters.getTransactions;
    },
  },
};
</script>

<style scoped>
.md-table-cell:last-child .md-table-cell-container,
.md-table-head:last-child {
  text-align: center !important;
  display: flex;
  justify-content: center;
}

.md-table-cell {
  text-align: left;
}
.md-table-cell.md-numeric {
  text-align: left;
}
.md-title {
  text-align: left;
}
.md-subheader {
  font-size: 16px;
  font-weight: bold;
}

.reverted-ts {
  font-style: italic;
}
</style>
