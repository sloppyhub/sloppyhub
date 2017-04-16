import * as storage from '@/storage'
import Vue from 'vue'
import axios from 'axios'

const type = {
    SET_PROJECTS: 'SET_PROJECTS',
}

export default {
    namespaced: true,
    state: {
        projects: {}, // userId:[ projects ] 
    },
    actions: {
        load({ state, commit }, { userId, token }) {
            return new Promise((resolve, reject) => {
                axios.get('https://api.sloppy.io/v1/apps/', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    }
                }).then((resp) => {
                    commit(type.SET_PROJECTS, { userId, projects: resp.data.data })
                    resolve(resp.data.data)
                }).catch(err => {
                    if (err.response) {
                        reject(err.response.data)
                    }
                })
            })
        },
    },
    mutations: {
        [type.SET_PROJECTS](state, { userId, projects }) {
            Vue.set(state.projects, userId, projects)
        },
    }
}
