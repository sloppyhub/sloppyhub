import Vue from 'vue'
import Router from 'vue-router'
import Dev from '@/view/Dev'
import Overview from '@/view/Overview'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'dev',
        component: Dev,
    }, {
        path: '/overview',
        name: 'overview',
        component: Overview,
    }, ]
})
