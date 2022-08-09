import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) next();
  else next("/login");
  userStore.loadingSession = false;
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./../views/Home.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("./../views/Editar.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    component: () => import("./../views/Login.vue"),
  },
  {
    path: "/Register",
    component: () => import("./../views/Register.vue"),
  },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
