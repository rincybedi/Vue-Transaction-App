import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const getNewTranscationsId = function(transactions) {
  return transactions.length + 1;
};
export default new Vuex.Store({
  state: {
    transactions: [],
  },
  mutations: {
    addNewTs(context, payload) {
      this.state.transactions.push({
        id: getNewTranscationsId(this.state.transactions),
        tsAmount: payload.tsAmount,
        tsDetails: payload.tsDetails,
        tsType: payload.tsType,
        tsDate: Date.now(),
        isRevertedTs: payload.revertedTsId > 0 ? true : false,
      });

      if (payload.revertedTsId > 0) {
        Vue.set(
          this.state.transactions.filter(
            (t) => t.id == payload.revertedTsId
          )[0],
          "isRevertedTs",
          true
        );
      }
    },

    deleteAllTs() {
      this.state.transactions = [];
    },

    revertTransaction(payload) { 
      this.addNewTs(payload);
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
