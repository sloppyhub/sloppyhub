<template>
    <div id="app" class="root">
        <md-sidenav class="md-left md-fixed" ref="sidenav">
            <md-list>
                <md-list-item v-for="nav in sidenav" :key="nav.name">
                    <router-link exact :to="nav.path">{{ nav.name }}</router-link>
                </md-list-item>
            </md-list>
        </md-sidenav>
        <md-toolbar class="header">
            <!-- left_button -->
            <md-button class="md-icon-button" v-show="shouldShowLeftButton" @click.native="leftButtonAction">
                <md-icon>{{ left_button }}</md-icon>
            </md-button>
            <!-- title -->
            <h2 class="md-title" style="flex: 1;">{{ title }}</h2>
            <!-- more -->
            <md-menu md-direction="bottom left" v-show="more.length > 0">
                <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon>more_vert</md-icon>
                </md-button>
                <md-menu-content>
                    <md-menu-item v-for="item in more" :key="item.name" @click.native="item.action()">{{ item.name }}</md-menu-item>
                </md-menu-content>
            </md-menu>
        </md-toolbar>
        <div class="body">
            <router-view class="width-limit" @init="init"></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {
            // init by init()
            left_button: 'menu', // option 'menu' | 'arrow_back'
            title: '', // required string
            more: [], // option [{ name:'',action: ()=>{} }]

            // sidenav
            sidenav: [{
                name: 'Overview',
                path: '/overview',
            }, {
                name: 'Dev',
                path: '/',
            }, ], // [{name:'',path:''}]
        }
    },
    mounted() {
        this.$router.beforeEach((to, from, next) => {
            this.$refs['sidenav'].close()
            next()
        })
    },

    methods: {
        init(attr) {
            console.log(attr)
            if (attr.left_button === 'menu' || attr.left_button === "arrow_back") {
                this.left_button = attr.left_button
            } else {
                this.left_button = 'menu'
            }

            if (typeof attr.title === 'string') {
                this.title = attr.title
            } else {
                throw new Error('expect $emit("init",{title})')
            }

            if (typeof attr.more === 'object') {
                this.more = attr.more
            } else {
                this.more = []
            }

            console.log(typeof attr.more)
            console.log(this.more.length)
        },
        shouldShowLeftButton() {
            return left_button === 'menu' || left_button === 'arrow_back'
        },
        leftButtonAction() {
            switch (this.left_button) {
                case 'menu':
                    this.$refs['sidenav'].open()
                    break
                case 'arrow_back':
                    this.$router.back()
                    break
            }
        },
    }
}
</script>
<style scoped>
.root {
    height: 100%;
    width: 100%;
    position: fixed;
    display: flex;
    flex-flow: column nowrap;
}

.body {
    width: 100%;
    height: 100%;
    overflow-x: auto;
}

.body .width-limit {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 2rem;
    padding: 0 1rem;
}
</style>
