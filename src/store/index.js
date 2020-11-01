import Vue from 'vue'
import Vuex from 'vuex'
import { setitem, getitem } from '@/utils/strong.js'

Vue.use(Vuex)
const LOGIN_KEY = 'LOGIN_token'

export default new Vuex.Store({
    state: {
        user: getitem(LOGIN_KEY)
    },
    mutations: {
        setuserkey(state, key) {
            state.user = key
            setitem(LOGIN_KEY, state.user)
        }

    },
    actions: {},
    modules: {}
})