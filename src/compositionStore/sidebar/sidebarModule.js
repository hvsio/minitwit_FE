import { reactive, computed } from "vue";
import { logoutUser } from "../users/usersModule";

const state = reactive({
  isSidebarMinimized: false,
  selectedSidebarItem: "/",
  sidebarItems: [
    {
      title: "Timeline",
      to: "/",
      visibleToLoggedUser: "always",
    },
    {
      title: "Login or register",
      to: "/user-entrance",
      visibleToLoggedUser: false,
    },
    {
      title: "User profile/create twit",
      to: "/user-profile",
      visibleToLoggedUser: true,
    },
    {
      title: "Logout",
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