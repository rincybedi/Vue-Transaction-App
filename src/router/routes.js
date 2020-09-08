import Vue from "vue";
import VueRouter from "vue-router";
import ViewTransactions from "../components/ViewTransactions";
import ResetTransactions from "../components/ResetTransactions";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "View",
    component: ViewTransactions,
  },
  {
    path: "/View",    
    name: "View",
    component: ViewTransactions,
  },
  {
    path: "/Reset",
    name: "Reset",
    component: ResetTransactions,
  },
  {
    path: "/New",
    name: "New",
    component: () => import("../components/NewTransaction"),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: "history",
});

export default router;
