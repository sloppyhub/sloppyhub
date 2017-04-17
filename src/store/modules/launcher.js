import storage from '@/storage'

const type = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    EDIT: 'EDIT',
    RENAME: 'RENAME',
    SET_ALL: 'SET_ALL',
}

const helper = {
    exist(launchers, { key, value }) {
        if (key == undefined || key == '' || value == undefined) {
            return false
        }

        let found = launchers.find((launcher) => {
            return launcher[key] === value
        })

        return found !== undefined
    },
    existName(launcher, { name }) {
        return this.exist(launcher, {
            key: 'name',
            value: name,
        })
    },
}

export default {
    namespaced: true,
    state: {
        launchers: [], // [{name:"",script:""}] name is unique 
    },
    actions: {
        save({ state }) {
            storage.saveLaunchers(state.launchers)
        },
        load({ commit }) {
            commit(type.SET_ALL, { launchers: storage.loadLaunchers() })
        },
        add({ commit, dispatch }, { name, script }) {
            return new Promise((resolve, reject) => {
                try {
                    commit(type.ADD, { name, script })
                    dispatch('save').then(() => {
                        resolve()
                    })
                } catch (err) {
                    reject(err)
                }
            })
        },
        remove({ commit, dispatch }, { name }) {
            return new Promise((resolve, reject) => {
                try {
                    commit(type.REMOVE, { name })
                    dispatch('save').then(() => {
                        resolve()
                    })
                } catch (err) {
                    reject(err)
                }
            })
        },
        edit({ commit, dispatch }, { name, script }) {
            return new Promise((resolve, reject) => {
                try {
                    commit(type.EDIT, { name, script })
                    dispatch('save').then(() => {
                        resolve()
                    })
                } catch (err) {
                    reject(err)
                }
            })
        },
        rename({ commit, dispatch }, { name, newName }) {
            return new Promise((resolve, reject) => {
                try {
                    commit(type.RENAME, { name, newName })
                    dispatch('save').then(() => {
                        resolve()
                    })
                } catch (err) {
                    reject(err)
                }
            })
        },
    },
    mutations: {
        [type.SET_ALL](state, { launchers }) {
            if (launchers == undefined) {
                return
            }
            state.launchers = launchers
        },
        [type.ADD](state, { name, script }) {
            if (name == '' || name == undefined) {
                throw Error('name is empty')
            }
            if (helper.existName(state.launchers, { name })) {
                return
            }

            state.launchers.unshift({
                name,
                script,
            })
        },
        [type.REMOVE](state, { name }) {
            state.launchers = state.launchers.filter((launcher) => {
                return launcher.name !== name
            })
        },
        [type.EDIT](state, { name, script }) {
            state.launchers = state.launchers.map((launcher) => {
                if (launcher.name === name) {
                    launcher.script = script
                }
                return launcher
            })
        },
        [type.RENAME](state, { name, newName }) {
            if (newName == '' || newName == undefined) {
                throw Error('newName is empty')
            }
            if (!helper.existName(state.launchers, { name })) {
                throw Error('name is not exist in launchers')
            }
            if (helper.existName(state.launchers, { name: newName })) {
                throw Error('newName is exist in launchers')
            }
            state.launchers = state.launchers.map((launcher) => {
                if (launcher.name === name) {
                    launcher.name = newName
                }
                return launcher
            })
        },
    }
}
