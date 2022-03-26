import { reactive, computed } from 'vue'
import usersApi from '@/api/users/users.js'

const state = reactive({
    loggedUser: {},
})

const mutations = {
    loginUser(user) {
        state.loggedUser = user;
        localStorage.setItem('loggedUser', JSON.stringify(user));
    },
    
    logoutUser() {
        state.loggedUser = {}
        localStorage.setItem('loggedUser', JSON.stringify({}))
    }
}

const actions = {
    registerUser: async (userData) => {
        try {
            const user = await usersApi.registerUser(userData);
            mutations.loginUser(user);
        } catch (e) {
            console.error(e)
        }
    },

    loginUser: async (userData) => {
        try {
            const user = await usersApi.loginUser(userData)
            mutations.loginUser(user)
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