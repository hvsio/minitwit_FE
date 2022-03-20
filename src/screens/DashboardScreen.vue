<template>
  <div id="DashboardScreen">
    <twit-list-component :items="twitList.tweets" :isPaged=true :height="'100%'" @onClick="handleOnTwitClick" @onFollowClick="handleOnFollowClick"/>
  </div>
</template>

<script>
import TwitListComponent from "@/components/TwitListComponent.vue";
import { useColors } from "vuestic-ui";
import { computed } from "vue";
import { useFollowers, useTwits } from "../compositionStore/index"

export default {
  name: "DashboardScreen",
  props: {},
  components: {
    TwitListComponent,
  },
  setup() {
    const { getColors } = useColors();
    const { followUser } = useFollowers();
    const { getTwitList, flagTwit, fetchTwitList } = useTwits()
    const colors = computed(() => getColors());
    
    const handleOnTwitClick = (twit) => {
      flagTwit(twit.messageId, twit.flagged)
    }
    
    const handleOnFollowClick = (userId) => {
      followUser(userId)
    }

    fetchTwitList();
    return {
      colors,
      twitList: getTwitList(),
      handleOnTwitClick,
      handleOnFollowClick
    };
  },
};
</script>

<style lang="scss" scoped>
#DashboardScreen {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
