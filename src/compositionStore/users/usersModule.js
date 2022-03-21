import { readonly, reactive, computed } from 'vue'
import store from '@/compositionStore/index'
import usersApi from '@/api/users/users.js'

const state = reactive({
    loggedUser: 0,
})

const mutations = {
    loginUser(userId) {
        state.loggedUser = userId;
        localStorage.setItem('loggedUser', userId)
    },
    
    logoutUser() {
        state.loggedUser = 0
        localStorage.setItem('loggedUser', 0)
    }
}

const actions = {
    registerUser: async (userData) => {
        try {
            const res = await usersApi.registerUser(userData);
            mutations.loginUser(res.userId);
        } catch (e) {
            console.error(e)
        }
    },

    loginUser: async (userData) => {
        try {
            const user = await usersApi.loginUser(userData)
            mutations.loginUser(user.userId)
        } catch (e) {
            console.error(e)
            return e.response.data;
        }
    }
}

const enforceLoggedUser = (id) => mutations.loginUser(id)
const getLoggedInUser = () => computed(() => state.loggedUser)
const logoutUser = () => mutations.logoutUser()
const loginUser = (userData) => actions.loginUser(userData)
const registerUser = (userData) => actions.registerUser(userData)

export {
    loginUser,
    registerUser,
    getLoggedInUser,
    logoutUser,
    enforceLoggedUser
}

export default {
    loginUser,
    registerUser,
    getLoggedInUser,
    logoutUser,
    enforceLoggedUser
}