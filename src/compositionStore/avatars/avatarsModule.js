import { generateAvatarByEmail } from "../../api/avatars/avatars";
import { reactive, computed } from "vue";

const state = reactive({
    avatars: {},
})

const mutations = {
    setLoading: (email, isLoading) => {
        state.avatars = {
            ...state.avatars,
            [email]: {
                ...state.avatars[email],
                isLoading,
            }
        }
    },

    setError: (email, e) => {
        state.avatars = {
            ...state.avatars,
            [email]: {
                ...state.avatars[email],
                error: e,
            }
        }
    },

    setAvatar: (email, avatar) => {
        state.avatars = {
            ...state.avatars,
            [email]: {
                ...state.avatars[email],
                avatar,
            }
        }
    }
}

const actions = {
    generateAvatarByEmail: async (email) => {
        mutations.setError(email, null)
        mutations.setLoading(email, true);
        try {
            const avatar = await generateAvatarByEmail(email);
            mutations.setAvatar(email, avatar);
        } catch (e) {
            console.error(e)
            mutations.setError(email,  require("../../assets/svgs/avatar_placeholder.svg"));
        }
        mutations.setLoading(email, false);
    }
}

const getAvatars = () => computed(() => state.avatars)
const fetchAvatarByEmail = (email) => actions.generateAvatarByEmail(email)

export {
    getAvatars,
    fetchAvatarByEmail
}

export default {
    getAvatars,
    fetchAvatarByEmail
}