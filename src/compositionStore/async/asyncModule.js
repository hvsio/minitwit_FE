import { readonly, reactive, computed } from 'vue'

const state = reactive({
    isLoading: false,
    error: undefined
})

const actions = {
    setLoading: (isLoading) => {
        state.isLoading = isLoading
    },

    setError: (e) => {
        state.error = e
    }
}

const getLoading = () => computed(() => state.isLoading)
const getError = () => computed(() => state.error)
const setLoading = (isLoading) => actions.setLoading(isLoading)
const setError = (e) => actions.setError(e)

export {
    getLoading,
    getError,
    setLoading,
    setError
}

export default {
    state: readonly(state),
    actions: readonly(actions),
    getLoading,
    getError,
    setLoading,
    setError
}