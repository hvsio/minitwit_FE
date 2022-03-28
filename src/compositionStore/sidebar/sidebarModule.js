import { reactive, computed } from "vue";
import { logoutUser } from "../users/usersModule";

const state = reactive({
  isSidebarMinimized: false,
  selectedSidebarItem: "/",
  sidebarItems: [
    {
      title: "Timeline",
      icon: require("../../assets/svgs/dashboard_black.svg"),
      iconSelected: require("../../assets/svgs/dashboard_white.svg"),
      to: "/",
      visibleToLoggedUser: "always",
    },
    {
      title: "Login or register",
      icon: require("../../assets/svgs/login_black.svg"),
      iconSelected: require("../../assets/svgs/login_white.svg"),
      to: "/user-entrance",
      visibleToLoggedUser: false,
    },
    {
      title: "User profile/create twit",
      icon: require("../../assets/svgs/tweet_logo.svg"),
      iconSelected: require("../../assets/svgs/tweet_logo.svg"),
      to: "/user-profile",
      visibleToLoggedUser: true,
    },
    {
      title: "Logout",
      icon: require("../../assets/svgs/logout.svg"),
      iconSelected: require("../../assets/svgs/logout.svg"),
      visibleToLoggedUser: true,
      function: () => logoutUser(),
    },
  ]
});

const mutations = {
  toggleSidebar: () => {
    state.isSidebarMinimized = !state.isSidebarMinimized
  },

  setSelectedSidebarItem: (sidebarItem) => {
      state.selectedSidebarItem = sidebarItem
  }
};

const getSidebarMinimized = () => computed(() => state.isSidebarMinimized)
const getSelectedSidebarItem = () => computed(() => state.selectedSidebarItem)
const getSidebarItems = () => computed(() => state.sidebarItems)
const toggleSidebar = () => mutations.toggleSidebar()
const selectSidebar = (sidebarItem) => mutations.setSelectedSidebarItem(sidebarItem)

export {
    getSidebarItems,
    getSidebarMinimized,
    getSelectedSidebarItem,
    toggleSidebar,
    selectSidebar
}

export default {
    getSidebarItems,
    getSidebarMinimized,
    getSelectedSidebarItem,
    toggleSidebar,
    selectSidebar
}