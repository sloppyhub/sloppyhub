import Vue from 'vue'
import Vuex from 'vuex'
import accounts from './modules/accounts'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,
    modules: {
        accounts,
    },
})
