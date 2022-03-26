<template>
  <div id="TwitListComponent" :style="{ height: height, width: width }">
    <va-list>
      <va-list-label class="label" :color="labelColor">
        {{ label }}
      </va-list-label>

      <va-list-item
        v-for="(item, index) in items"
        :key="index"
        :style="{
          padding: itemPadding,
          margin: itemMargin,
        }"
      >
        <va-list-item-section class="content">
          <div class="header">
            <va-list-item-label>
              {{ isPersonal ? user.userName : item.user.userName }} 👾
            </va-list-item-label>
            <va-list-item-label>
              {{ isPersonal ? user.email : item.user.email }} 💬 
            </va-list-item-label>
          </div>
          <va-list-item-label :color="textColor">
            {{ isPersonal ? item.text : item.msg.text }}
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section class="actionButtonsWrapper">
          <img class="flagBtn"
            :src="item.flagged ? require('../assets/svgs/red_flagged.svg') : require('../assets/svgs/flagged.svg')"
            @click="handleItemClick(item)"
          />
          <img class="followBtn"
            v-if="showFollowButton(item)"
            :src="require('../assets/svgs/follow.svg')"
            @click="followUser(item.authorId)"
          />
        </va-list-item-section>
      </va-list-item>
    </va-list>
  </div>
</template>

<script>
import { useFollowers, useUsers } from "@/compositionStore/index"

export default {
  name: "TwitListComponent",
  props: {
    isPersonal: {
      type: Boolean,
      required: false,
      default: false,
    },
    user: {
      type: Object,
      required: (props) => props.isPersonal ? true : false,
      default: null,
    },
    items: {
      type: Array,
      required: true,
      default: [],
    },
    width: {
      type: String,
      required: false,
      default: "400px",
    },
    height: {
      type: String,
      required: false,
      default: "500px",
    },
    label: {
      type: String,
      required: false,
      default: "Twits",
    },
    labelColor: {
      type: String,
      required: false,
      default: "#FFF",
    },
    textColor: {
      type: String,
      required: false,
      default: "#FFF",
    },
    itemBackgroundColor: {
      type: String,
      required: false,
      default: "#AAAAAA",
    },
    itemPadding: {
      type: String,
      required: false,
      default: "12px",
    },
    itemMargin: {
      type: String,
      required: false,
      default: "12px",
    }
  },
  components: {},
  emits: ["onClick"],
  setup(props, context) {
    const { getFollowers } = useFollowers();
    const { getLoggedInUser } = useUsers();
    const loggedInUser = getLoggedInUser();
    const followers = getFollowers();

    const isAlreadyFollowed = (authorId) => {
      return followers.value.some(entry => entry.whomId === authorId)
    }

    const isMe = (authorId) => {
      return authorId === loggedInUser.value.userId
    }

    const showFollowButton = (item) => {
      return props.isPersonal ? false : !isAlreadyFollowed(item.msg.authorId) && !isMe(item.msg.authorId) && Object.keys(loggedInUser.value).length != 0
    }

    const handleItemClick = (item) => context.emit("onClick", item);
    const followUser = (userId) => context.emit("onFollowClick", userId);

    return {
      handleItemClick,
      loggedInUser,
      followUser,
      showFollowButton,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../genericStyles.scss"; 
@import "../_variables.scss"; 

#TwitListComponent {
  margin: 2rem auto;

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
            flex-basis: 90%;
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
