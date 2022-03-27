import { createRouter, createWebHashHistory } from "vue-router";
import { getLoggedInUser } from "../compositionStore/users/usersModule";

const DashboardScreen = () => import("@/screens/DashboardScreen.vue");
const UserEntranceScreen = () => import("@/screens/UserEntranceScreen.vue");
const UserProfileScreen = () => import("@/screens/UserProfileScreen.vue");

const routes = [
  {
    path: "/",
    name: "MiniTwit",
    component: DashboardScreen,
  },
  {
    path: "/user-entrance",
    name: "MiniTwit Login Page",
    component: UserEntranceScreen,
  },
  {
    path: "/user-profile/:id",
    name: "MiniTwit User Page",
    component: UserProfileScreen,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/user-profile") {
    const loggedUser = getLoggedInUser();
    if (Object.keys(loggedUser.value).length !== 0) {
      next({
        name: "MiniTwit User Page",
        params: {
          id: loggedUser.value.userId,
        },
      });
    } else {
      next();
    }
  }
  next()
});

export default router;
