import {createRouter, createWebHistory} from "vue-router"
import timeTrack from "../views/timeTrack.vue";
import account from "../views/account.vue";
import home from "../views/home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/timeTrack",
      name: "timeTrack",
      component: timeTrack,
    },
    {
      path: "/account",
      name: "account",
      component: account,
    },
    {
      path: "/home",
      name: "home",
      component: home,
    },
    {
      path: "/",
      redirect: { path: "/home" }, // redirect property
    }

  ]
})
export default router
