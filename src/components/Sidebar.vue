<template>
  <div id="Sidebar">
    <va-sidebar
      :width="width"
      :minimized="minimized"
      :minimizedWidth="minimizedWidth"
    >
      <template v-for="(item, index) in items" :key="index">
        <div v-show="isVisible(item.visibleToLoggedUser)">
          <va-sidebar-item
            :to="item.to ? item.to : '/'"
            :active="isSelectedSidebarItem(item.to)"
            :active-color="color"
            @click="handleItemClick(item)"
          >
            <va-sidebar-item-content>
              <va-icon :name="item.icon" :color="iconColor" />
              <va-sidebar-item-title
                v-if="!minimized"
                :style="`height: ${itemTitleHeight}`"
              >
                {{ item.title }}
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </div>
      </template>
    </va-sidebar>
  </div>
</template>

<script>
import { computed, watchEffect } from "vue";
import { useSidebar } from "@/compositionStore/index";
import { useRouter } from "vue-router";
import { getLoggedInUser } from "@/compositionStore/users/usersModule";

export default {
  name: "Sidebar",
  props: {
    items: {
      type: Array,
      required: true,
      default: [],
    },
    color: {
      type: String,
      required: false,
      default: "#AAAAAA",
    },
    iconColor: {
      type: String,
      required: false,
      default: "#FFF",
    },
    width: {
      type: String,
      default: "16rem",
    },
    minimized: {
      type: Boolean,
      required: true,
    },
    minimizedWidth: {
      type: String,
      required: false,
      default: "4.5rem",
    },
    itemTitleHeight: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  components: {},
  emits: ["onItemClick"],
  setup(props, context) {
    const router = useRouter();
    const { getSelectedSidebarItem, selectSidebar } = useSidebar();
    const selectedSidebarItem = getSelectedSidebarItem();
    const loggedInUser = getLoggedInUser();
    const loggedUser = computed(() => (Object.keys(loggedInUser.value).length != 0 ? true : false));

    //functions
    const isVisible = (val) => {
      if (val == "always") return true;
      else return loggedUser.value === val;
    };

    const isSelectedSidebarItem = (sidebarItem) => {
      if (sidebarItem == "/user-profile") return `${sidebarItem}/${loggedInUser.value.userId}` == selectedSidebarItem.value;
      else return sidebarItem == selectedSidebarItem.value;
    }

    const handleItemClick = (item) => {
      context.emit("onItemClick", item);
    };

    watchEffect(() => selectSidebar(router.currentRoute.value.fullPath));
    return {
      handleItemClick,
      isSelectedSidebarItem,
      isVisible,
      selectedSidebarItem
    };
  },
};
</script>

<style lang="scss">
#Sidebar {
  .va-sidebar-item {
    padding: 0.5rem;
  }
}
</style>
