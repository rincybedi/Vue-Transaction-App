import Vue from "vue";
import VueRouter from "vue-router";
import ViewTransactions from "../components/ViewTransactions";
import ResetTransactions from "../components/ResetTransactions";
import PageNotFound from "../common/PageNotFound";

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
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: "history",
});

export default router;
