<template>
  <div id="FollowersComponent">
    <va-list>
      <va-list-item
        class="follower-card"
        v-for="(item, index) in followers"
        :key="index"
      >
        <va-list-item-section class="actionButtonsWrapper">
          <img class="picture" :src="require('../assets/svgs/unfollow.svg')" />
        </va-list-item-section>
        <va-list-item-section class="content">
          <router-link :to="{ name: 'MiniTwit User Page', params: { id: item.userId } }">
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

        <va-list-item-section class="actionButtonsWrapper">
          <img
            class="unfollowBtn"
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

export default {
  name: "FollowersComponent",
  props: {
    items: {
      type: Array,
      required: true,
      default: [],
    },
  },
  components: {},
  emits: ["onClick"],
  setup(props, context) {
    const followers = computed(() => props.items);
    const handleItemClick = (item) => {
      context.emit("onClick", item);
    };

    return {
      followers,
      handleItemClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../genericStyles.scss";
@import "../_variables.scss";

#FollowersComponent {
  .va-list {
    padding: 0 0 2rem 0 !important;

    .va-list-item {
      background-color: $twit-background;

      @include roundedBorders;
      @include shadow;
      box-shadow: unset;
      > * {
        display: block !important;

        .va-list-item-section {
          &.content {
            flex-basis: 66%;
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
