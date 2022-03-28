import { reactive, computed } from "vue";
import { fetchAvatarByEmail } from "../avatars/avatarsModule";
import followersApi from "@/api/followers/follower.js";

const state = reactive({
  followers: [],
});

const mutations = {
  setFollowers: (followers) => {
    state.followers = followers;
  },

  removeFollower: (id) => {
    state.followers = [
      ...state.followers.filter((followerItem) => followerItem.id != id),
    ];
  },

  addFollower: (followObj) => {
    state.followers = [...state.followers, followObj];
  },
};

const actions = {
  fetchFollowers: async (userId) => {
    try {
      const result = await followersApi.followedUsers(userId);
      result.forEach((item) => fetchAvatarByEmail(item.email));
      mutations.setFollowers(result.length === 0 ? [] : result);
    } catch (e) {
      console.log(e);
    }
  },

  unfollowUser: async (id) => {
    try {
      await followersApi.unfollowUser(id);
      mutations.removeFollower(id);
    } catch (e) {
      console.log(e);
    }
  },

  followUser: async (user, loggedInUserId) => {
    const isAlreadyFollowed = state.followers.some(
      (entity) => entity.whomId === user.userId
    );

    if (isAlreadyFollowed) return;

    try {
      const userData = {
        WhoId: loggedInUserId,
        WhomId: user.userId,
      };
      const res = await followersApi.followUser(userData);
      mutations.addFollower({
        ...res,
        userId: user.userId,
        name: user.name,
        email: user.email
      });
    } catch (e) {
      console.error(e);
    }
  },
};

const getFollowers = () => computed(() => state.followers);
const fetchFollowers = (userId) => actions.fetchFollowers(userId);
const unfollowUser = (userId) => actions.unfollowUser(userId);
const followUser = (userId, loggedInUserId) => actions.followUser(userId, loggedInUserId);

export { getFollowers, fetchFollowers, unfollowUser, followUser };

export default {
  getFollowers,
  fetchFollowers,
  unfollowUser,
  followUser,
};
