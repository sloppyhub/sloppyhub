import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import project from './modules/project'
import launcher from './modules/launcher'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,
    modules: {
        account,
        project,
        launcher,
    },
})
