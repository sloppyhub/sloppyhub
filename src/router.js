import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'dev',
        component: {
            template: '<h1>Development</h1>',
        }
    }]
})
