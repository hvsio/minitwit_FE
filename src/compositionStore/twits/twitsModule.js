import { reactive, computed } from 'vue'
import twitsApi from '@/api/twits/twits.js'

const state = reactive({
    twitList: {
        tweets: [],
        page: 1,
        totalPages: 1
    },
    usersTwitList: [],
})

const mutations = {
    setTwitList: (twitList) => {
        state.twitList = twitList
    },

    setUsersTwitList: (twitList) => {
        state.usersTwitList = twitList
    },

    addPublicTwit: (twit) => {
        state.twitList = [
            ...state.twitList,
            twit
        ]
    },

    addPrivateTwit: (twit) => {
        state.usersTwitList = [
            ...state.usersTwitList,
            twit
        ]
    },

    updateTwit: (messageId, flagged) => {
        const twitIndex = state.twitList.findIndex(twitItem =>
            twitItem.messageId == messageId
        )
        const newTwit = {
            ...state.twitList[twitIndex],
            flagged
        }

        state.twitList = [
            ...state.twitList.slice(0, twitIndex),
            newTwit,
            ...state.twitList.slice(twitIndex + 1)
        ]
    }
}

const actions = {
    getTwitList: async (page, pageSize) => {
        try {
            const result = await twitsApi.fetchTwits(page, pageSize)
            console.log(result)
            mutations.setTwitList(result)
        } catch (e) {
            console.error(e)
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
            mutations.updateTwit(messageId, !flagged)
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

const getPrivateTwitList = () => computed(() => state.usersTwitList)
const getTwitList = () => computed(() =>state.twitList)
const fetchTwitList = (page, pageSize) => actions.getTwitList(page, pageSize)
const fetchPrivateTwitList = (userId) => actions.getUsersTwitList(userId)
const flagTwit = (messageId, flagged) => actions.toggleFlag(messageId, flagged)
const addTwit = (twitData) => actions.addTwit(twitData)

export {
    getTwitList,
    getPrivateTwitList,
    fetchTwitList,
    fetchPrivateTwitList,
    addTwit,
    flagTwit
}

export default {
    getTwitList,
    getPrivateTwitList,
    fetchTwitList,
    fetchPrivateTwitList,
    addTwit,
    flagTwit
}