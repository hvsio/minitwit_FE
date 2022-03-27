import { reactive, computed } from 'vue'
import twitsApi from '@/api/twits/twits.js'

const state = reactive({
    twitList: {
        twits: [],
        page: 1,
        totalPages: 1
    },
    usersTwitList: {
        user: {},
        twits: []
    },
})

const mutations = {
    setTwitList: (twitList) => {
        state.twitList = {
            ...twitList
        }
    },

    setUsersTwitList: (twitList) => {
        state.usersTwitList = {
            ...twitList
        }
    },

    addPublicTwit: (twit) => {
        state.twitList.twits = [
            ...state.twitList.twits,
            twit
        ]
    },

    addPrivateTwit: (twit) => {
        state.usersTwitList.twits = [
            ...state.usersTwitList.twits,
            twit
        ]
    },

    removeTwit: (messageId) => {
        state.twitList.twits = [
            ...state.twitList.twits.filter(twit => twit.msg.messageId !== messageId)
        ]

        state.usersTwitList.twits = [
            ...state.usersTwitList.twits.filter(twit => twit.messageId !== messageId)
        ]
    }
}

const actions = {
    getTwitList: async (page, pageSize) => {
        let count = 0
        let maxTries = 2
        while (true) {
            try {
                const result = await twitsApi.fetchTwits(page - count, pageSize)
                mutations.setTwitList(result)
                break
            } catch (e) {
                console.error(e)
                if (++count === maxTries) {
                    throw e
                }
            }
        }
    },

    getUsersTwitList: async (userId) => {
        try {
            const result = await twitsApi.fetchPersonalTwits(userId)
            mutations.setUsersTwitList(result)
        } catch (e) {
            console.error(e)
        }
    },

    toggleFlag: async (messageId, flagged) => {
        try {
            await twitsApi.flagTwit({
                MessageId: messageId,
                FlagMessage: !flagged
            })
            mutations.removeTwit(messageId)
        } catch (e) {
            console.error(e)
        }
    },

    addTwit: async (twitData) => {
        try {
            await twitsApi.createTwit(twitData);
            const twitState = {
                authorId: twitData.AuthorId,
                text: twitData.Text
            }
            mutations.addPublicTwit(twitState)
            mutations.addPrivateTwit(twitState)
        } catch (e) {
            console.error(e)
        }
    }
}

const getPrivateTwitList = () => computed(() => state.usersTwitList.twits)
const getInspectedUser = () => computed(() => state.usersTwitList.user)
const getTwitList = () => computed(() =>state.twitList)
const fetchTwitList = (page, pageSize) => actions.getTwitList(page, pageSize)
const fetchPrivateTwitList = (userId) => actions.getUsersTwitList(userId)
const flagTwit = (messageId, flagged) => actions.toggleFlag(messageId, flagged)
const addTwit = (twitData) => actions.addTwit(twitData)

export {
    getTwitList,
    getPrivateTwitList,
    getInspectedUser,
    fetchTwitList,
    fetchPrivateTwitList,
    addTwit,
    flagTwit
}

export default {
    getTwitList,
    getPrivateTwitList,
    getInspectedUser,
    fetchTwitList,
    fetchPrivateTwitList,
    addTwit,
    flagTwit
}