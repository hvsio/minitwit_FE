<template>
  <div id="app">
    <div class="app-content">
      <div class="navbar">
        <navbar :navbarColor="colors.black" :iconColor="colors.primaryColor" />
      </div>
      <div class="container">
        <sidebar
          class="sidebar"
          :items="sidebarItems"
          :minimized="isSidebarMinimized"
          :color="colors.darkGrey"
          :iconColor="colors.primaryColor"
          @onItemClick="handleSidebarItemClick"
        />
        <router-view class="router-content" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import { useColors } from "vuestic-ui";
import { computed } from "vue";
import { initStore } from "@/compositionStore/index";
import {
  getSidebarItems,
  getSidebarMinimized,
} from "@/compositionStore/sidebar/sidebarModule";
import { enforceLoggedUser } from "@/compositionStore/users/usersModule";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
  },
  setup() {
    initStore();
    const { getColors } = useColors();
    const colors = computed(() => getColors());
    const storedUserString = localStorage.getItem("loggedUser");
    const storedUser = JSON.parse(storedUserString);

    if (!!storedUser && Object.keys(storedUser).length != 0) {
      enforceLoggedUser(storedUser);
    }

    const handleSidebarItemClick = (item) => {
      if (!item.hasOwnProperty("function")) return;

      item.function(item);
    };

    return {
      colors,
      isSidebarMinimized: getSidebarMinimized(),
      sidebarItems: getSidebarItems(),
      handleSidebarItemClick,
    };
  },
};
</script>

<style lang="scss">
@import "./genericStyles.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .app-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: url("./assets/svgs/background.svg");
    background-size: cover;

    .container {
      display: flex;
      overflow: scroll;
      height: 100%;
      width: 100%;
    }

    .router-content {
      overflow: scroll;
    }
  }
}
</style>
