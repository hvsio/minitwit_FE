<template>
  <div id="FollowersComponent">
    <va-list>
      <va-list-item
        class="follower-card"
        v-for="(item, index) in followers"
        :key="index"
      >
        <avatar-component class="avatar" :image="avatars[item.email]" />
        <va-list-item-section class="content">
          <router-link
            :to="{ name: 'MiniTwit User Page', params: { id: item.userId } }"
          >
            <div class="header">
              <va-list-item-label>
                {{ item.name }}
              </va-list-item-label>
              <va-list-item-label>
                {{ item.email }}
              </va-list-item-label>
            </div>
          </router-link>
        </va-list-item-section>

        <va-list-item-section v-if="showButton" class="actionButtonsWrapper">
          <img
            class="unfollow-btn"
            :src="require('../assets/svgs/unfollow.svg')"
            @click="handleItemClick(item)"
          />
        </va-list-item-section>
      </va-list-item>
    </va-list>
  </div>
</template>

<script>
import { computed } from "vue";
import { useAvatars } from "@/compositionStore/index";
import AvatarComponent from "@/components/AvatarComponent";

export default {
  name: "FollowersComponent",
  props: {
    items: {
      type: Array,
      required: true,
      default: [],
    },
    showButton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  components: {
    AvatarComponent,
  },
  emits: ["onClick"],
  setup(props, context) {
    const { getAvatars } = useAvatars();
    const followers = computed(() => props.items);
    const handleItemClick = (item) => {
      context.emit("onClick", item);
    };

    return {
      followers,
      avatars: getAvatars(),
      handleItemClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../genericStyles.scss";
@import "../_variables.scss";

#FollowersComponent {
  .unfollow-btn {
    cursor: pointer;
  }
  .va-list {
    overflow-y: scroll;
    padding: 20px;
    box-sizing: content-box;

    .va-list-item {
      background-color: $twit-background;

      @include roundedBorders;
      @include shadow;
      box-shadow: unset;
      > * {
        display: block !important;

        .avatar {
          padding-right: 12px;
        }
        .va-list-item-section {
          &.content {
            flex-basis: 60%;
            text-align: left;
          }

          &.actionButtonsWrapper {
            @include roundedBorders;
            @include shadow;
            display: flex;
            flex-direction: row;
            margin: auto 0.5rem;
            background-color: $twit-btn-background;
            flex-basis: 100px;
            justify-content: space-evenly;
            column-gap: 0.5rem;

            > * {
              width: 2rem;
              margin: auto 5px;
            }
          }
          .header {
            margin-bottom: 20px;
          }

          .va-list-item-label {
            -webkit-line-clamp: unset !important;
          }
        }
      }
    }
  }
}
</style>
