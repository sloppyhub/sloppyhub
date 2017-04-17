import storage from '@/storage'

const type = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    SET_ALL: 'SET_ALL',
}

const helper = {
    exist(accounts, { key, value }) {
        if (key == undefined || key == '' || value == undefined) {
            return false
        }

        let found = accounts.find((account) => {
            return account[key] === value
        })

        return found !== undefined
    },
    existUserId(accounts, { userId }) {
        return this.exist(accounts, {
            key: 'userId',
            value: userId,
        })
    },
}

export default {
    namespaced: true,
    state: {
        accounts: [], // { userId,token } 
    },
    getters: {
        map(state) { // userId as key
            let m = {}
            state.accounts.forEach(account => {
                m[account.userId] = account
            })
            return m
        },
    },
    actions: {
        add({ state, commit, dispatch }, { userId, token }) {
            return new Promise((resolve, reject) => {
                if (helper.existUserId(state.accounts, { userId })) {
                    reject(Error(`userId ${userId} is exist`))
                }

                commit(type.ADD, { userId, token })
                dispatch('save').then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })

            })
        },
        remove({ commit, dispatch }, { userId }) {
            return new Promise((resolve, reject) => {
                commit(type.REMOVE, { userId })
                dispatch('save').then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
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
            if (userId == undefined || token == undefined || helper.existUserId(state.accounts, { userId })) {
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
