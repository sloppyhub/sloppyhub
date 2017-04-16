import * as storage from '@/storage'

const type = {
    ADD_ACCOUNT: 'ADD_ACCOUNT',
    REMOVE_ACCOUNT: 'REMOVE_ACCOUNT',
    SET_ACCOUNTS: 'SET_ACCOUNTS',
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
        load({ state, commit }) {
            commit(type.SET_ACCOUNTS, { accounts: storage.loadAccounts() })
        },
        save({ state }) {
            storage.saveAccounts(state.accounts)
        },
    },
    mutations: {
        [type.ADD_ACCOUNT](state, { userId, token }) {
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
        [type.REMOVE_ACCOUNT](state, { userId }) {
            state.accounts = state.accounts.filter((account) => {
                return account.userId !== userId
            })
        },
        [type.SET_ACCOUNTS](state, { accounts }) {
            if (accounts === undefined) {
                return
            }
            state.accounts = accounts
        },
    },
}
