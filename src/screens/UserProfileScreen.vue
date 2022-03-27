<template>
  <div :class="isMe ? 'user-profile-page' : 'users-profile-page-inspection'">
    <div :class="isMe ? 'followers-wrapper' : 'followers-wrapper-full-screen'">
      <p>Followed People</p>
      <followers-component
        v-if="followers.length > 0"
        class="followed-users-list"
        :items="followers"
        @onClick="handleOnUnfollowClick"
      />
      <p v-else>No Followed People</p>
    </div>
    <div v-if="isMe" class="create-twit-wrapper">
      <add-twit-component></add-twit-component>
    </div>
    <div
      :class="isMe ? 'priv-twits-wrapper' : 'priv-twits-wrapper-full-screen'"
    >
      <p>Published Twits</p>
      <twit-list-component
        v-if="twitList.length > 0"
        class="twit-list-component"
        :isPersonal="true"
        :user="inspectedUser"
        :items="twitList"
        @onClick="handleOnTwitClick"
      />
      <p v-else>No Published Twits</p>
    </div>
  </div>
</template>
<script>
import AddTwitComponent from "@/components/AddTwitComponent.vue";
import FollowersComponent from "@/components/FollowersComponent.vue";
import TwitListComponent from "@/components/TwitListComponent.vue";
import { useFollowers, useTwits, useUsers } from "@/compositionStore/index";
import { useRoute } from "vue-router";
import { computed, watch, watchEffect } from "@vue/runtime-core";

export default {
  name: "UserProfileScreen",
  props: {},
  components: {
    AddTwitComponent,
    FollowersComponent,
    TwitListComponent,
  },
  setup() {
    const route = useRoute();
    const currentUserId = computed(() => route.params.id);
    const { getLoggedInUser } = useUsers();
    const { getFollowers, fetchFollowers, unfollowUser } = useFollowers();
    const {
      getPrivateTwitList,
      getInspectedUser,
      fetchPrivateTwitList,
      flagTwit,
    } = useTwits();
    const inspectedUser = getInspectedUser();
    const loggedInUser = getLoggedInUser();

    const isMe = computed(
      () => currentUserId.value == loggedInUser.value.userId
    );

    const handleOnUnfollowClick = (item) => {
      unfollowUser(item.id);
    };
    const handleOnTwitClick = (twit) => {
      flagTwit(twit.messageId, twit.flagged);
    };

    watchEffect(() => {
      if (!currentUserId.value) return
      fetchPrivateTwitList(currentUserId.value);
      fetchFollowers(currentUserId.value);
    },
    {
      flush: true,
    });
    return {
      followers: getFollowers(),
      handleOnUnfollowClick,
      handleOnTwitClick,
      twitList: getPrivateTwitList(),
      inspectedUser,
      currentUserId,
      isMe,
    };
  },
};
</script>
<style lang="scss">
@import "../_variables.scss";

.users-profile-page-inspection {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 2rem;
  min-height: 750px;
  box-sizing: border-box;

  .priv-twits-wrapper-full-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .followers-wrapper-full-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.user-profile-page {
  display: grid;
  grid-template-rows: [first] 35%[second] 65% [endline] auto;
  grid-template-columns: [col-first] 60% [col-sec] 40% [col-endline] auto;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding-top: 2rem;
  min-height: 750px;
  box-sizing: border-box;

  p {
    font-weight: bold;
  }

  [class$="-wrapper"] {
    width: 100%;
    height: 100%;
    justify-self: center;
    align-self: start;

    > * {
      margin: 0 auto auto !important;
    }
  }

  .followers-wrapper {
    overflow: hidden;
    grid-area: 1 / col-sec / endline / col-endline;

    > div {
      overflow-y: scroll;
    }

    .followed-users-list {
      margin-top: 1.5rem !important;
    }
  }

  .create-twit-wrapper {
    grid-area: 1 / 1 / second / col-sec;

    > * {
      width: 55% !important;
    }
  }

  .priv-twits-wrapper {
    overflow: hidden;
    grid-area: second / 1 / endline / col-sec;

    > div {
      width: 100% !important;
      height: 100% !important;
      overflow-x: scroll;
    }

    .twit-list-component {
      margin-top: 1.5rem !important;
    }

    .va-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .va-list-item {
      min-height: 150px !important;
      width: 55% !important;
      margin-top: 6px !important;
      margin-bottom: 6px !important;
    }

    .va-list-label {
      display: none;
    }
  }

  .followers-wrapper {
    > div {
      width: 100% !important;
      height: 100% !important;
    }

    .va-list {
      overflow: scroll;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
