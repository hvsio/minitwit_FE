<template>
  <div id="DashboardScreen">
    <div class="content-list">
      <div class="progress-bar" v-if="isLoading">
        <va-progress-circle indeterminate color="black" :thickness="0.2" size="large" />
      </div>
      <twit-list-component
        v-else
        :items="twitsPaged.tweets"
        :height="'100%'"
        @onClick="handleOnTwitClick"
        @onFollowClick="handleOnFollowClick"
      />
    </div>
    <div class="content-pager">
      <va-pagination
        :model-value="twitsPaged.page"
        @update:modelValue="handlePageChange"
        :pages="twitsPaged.totalPages"
        size="large"
        color="black"
        :visible-pages="3"
        :disabled=isLoading
      />
    </div>
  </div>
</template>

<script>
import TwitListComponent from "@/components/TwitListComponent.vue";
import { useColors } from "vuestic-ui";
import { computed } from "vue";
import { useFollowers, useTwits, useAsync } from "../compositionStore/index";

export default {
  name: "DashboardScreen",
  props: {},
  components: {
    TwitListComponent,
  },
  setup() {
    const { getColors } = useColors();
    const { followUser } = useFollowers();
    const { getTwitList, flagTwit, fetchTwitList } = useTwits();
    const { getLoading, setLoading, getError } = useAsync();
    const colors = computed(() => getColors());

    const twitsPaged = getTwitList();

    const handleOnTwitClick = (twit) => {
      flagTwit(twit.messageId, twit.flagged);
    };

    const handleOnFollowClick = (userId) => {
      followUser(userId);
    };

    const handlePageChange = (page) => {
      fetchTwitList(page)
    };

    fetchTwitList(twitsPaged.page === undefined ? 1 : twitsPaged.page);
    return {
      colors,
      isLoading: getLoading(),
      setLoading,
      error: getError(),
      twitsPaged,
      handleOnTwitClick,
      handleOnFollowClick,
      handlePageChange,
    };
  },
};
</script>

<style lang="scss" scoped>
#DashboardScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .content-list {
    display: flex;
    justify-content: center;
    flex-grow: 2;
  }

  .progress-bar {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .content-pager {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    padding-bottom: 12px;
  }
}
</style>
