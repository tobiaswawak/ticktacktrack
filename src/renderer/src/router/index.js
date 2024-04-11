import {createRouter, createWebHistory} from "vue-router"
import defaultView from "@/views/defaultView.vue";
import account from "../views/account.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: defaultView
    },
    {
      path: "/account",
      name: "account",
      component: account
    }
  ]
})
export default router
