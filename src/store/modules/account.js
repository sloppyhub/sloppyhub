import storage from '@/storage'

const type = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    SET_ALL: 'SET_ALL',
}

export default {
    namespaced: true,
    state: {
        accounts: [], // { userId,token } 
    },
    actions: {
        exist({ state }, { userId }) {
            let foundAccount = state.accounts.find(account => {
                return account.userId === userId
            })
            return foundAccount !== undefined
        },
        getByUserId({ state }, { userId }) {
            return state.accounts.find(account => {
                return account.userId === userId
            })
        },
        add({ commit, dispatch }, { userId, token }) {
            return new Promise((resolve, reject) => {
                dispatch('exist', { userId }).then(exist => {
                    if (exist) {
                        throw new Error('userId exist')
                    }

                    commit(type.ADD, { userId, token })
                    dispatch('save').then(() => {
                        resolve()
                    })
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        remove({ commit, dispatch }, { userId }) {
            commit(type.REMOVE, { userId })
            dispatch('save')
        },
        load({ commit }) {
            commit(type.SET_ALL, { accounts: storage.loadAccounts() })
        },
        save({ state }) {
            storage.saveAccounts(state.accounts)
        },
    },
    mutations: {
        [type.ADD](state, { userId, token }) {
            let foundAccount = state.accounts.find(account => {
                return account.userId === userId
            })
            if (foundAccount !== undefined) {
                return
            }
            state.accounts.unshift({
                userId,
                token,
            })
        },
        [type.REMOVE](state, { userId }) {
            state.accounts = state.accounts.filter((account) => {
                return account.userId !== userId
            })
        },
        [type.SET_ALL](state, { accounts }) {
            if (accounts === undefined) {
                return
            }
            state.accounts = accounts
        },
    },
}
