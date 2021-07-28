import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import router from "./router/routes";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import store from "./shared/store.js";
import CurrencyBadge from "vue-currency-symbol";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(router);
Vue.use(CurrencyBadge);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
