import Vue from 'vue'
import Router from 'vue-router'
import Dev from '@/view/Dev'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'dev',
        component: Dev,
    }]
})
