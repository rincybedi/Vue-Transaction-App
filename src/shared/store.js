import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const getNewTranscationsId = function(transactions) {
  return transactions.length + 1;
};
export default new Vuex.Store({
  state: {
    transactions: [
      {
        tsAmount: 30,
        tsDetails: "Debited",
        tsType: 1,
        id: 1,
        tsDate: "",
      },
      {
        tsAmount: 20,
        tsDetails: "Credited",
        tsType: 2,
        id: 2,
        tsDate: "",
      },
    ],
  },
  mutations: {
    addNewTs(state, payload) {
      this.state.transactions.push({
        id: getNewTranscationsId(this.state.transactions),
        tsAmount: payload.tsAmount,
        tsDetails: payload.tsDetails,
        tsType: payload.tsType,
        tsDate: Date.now(),
      });
    },

    deleteAllTs() {
      this.state.transactions = [];
    },

    revertTransaction(payload) {
      console.log(payload.id);
      payload.tsDetails = "Transaction reverted for id" + payload.id;
      if (payload.tsType == 1) {
        payload.tsType = 2;
      } else {
        payload.tsType = 2;
      }
      this.mutations.addNewTs(payload);
    },
  },
  getters: {
    getTransactions: function(state) {
      return state.transactions;
    },
  },
  actions: {
    saveNewTs(context, payload) {
      context.commit("addNewTs", payload);
    },
    revertTs(context, payload) {
      context.commit("revertTransaction", payload);
    },
  },
});
