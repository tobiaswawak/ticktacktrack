import {createRouter, createWebHistory} from "vue-router"
import defaultView from "@/views/defaultView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: defaultView
    },
    {
      path: "/",
      name: "pageopener",
      component: defaultView
    }
  ]
})
export default router
