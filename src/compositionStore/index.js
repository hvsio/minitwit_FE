import { provide, inject } from 'vue'
import sidebar from '@/compositionStore/sidebar/sidebarModule'
import async from '@/compositionStore/async/asyncModule'
import twits from '@/compositionStore/twits/twitsModule'
import users from '@/compositionStore/users/usersModule'
import followers from '@/compositionStore/followers/followersModule'
import avatars from '@/compositionStore/avatars/avatarsModule'

const initStore = () => {
    provide("useSidebar", sidebar)
    provide("useAsync", async)
    provide("useTwits", twits)
    provide("useUsers", users)
    provide("useFollowers", followers)
    provide("useSidebar", sidebar)
    provide("useAvatars", avatars)
}

const useAsync = () => inject("useAsync")
const useTwits = () => inject("useTwits")
const useUsers = () => inject("useUsers")
const useFollowers = () => inject("useFollowers")
const useSidebar = () => inject("useSidebar")
const useAvatars = () => inject("useAvatars")

export { 
    initStore,
    useSidebar,
    useAsync,
    useTwits,
    useUsers,
    useFollowers,
    useAvatars,
    async
}

export default {
    initStore,
    useSidebar,
    useAsync,
    useTwits,
    useUsers,
    useFollowers,
    useAvatars,
    async
}