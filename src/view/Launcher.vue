<template>
    <div>
        <div class="launcher" v-for="launcher in launchers" :key="launcher.name">
            <md-card md-with-hover>
                <md-card-header>
                    <md-card-header-text class="md-title">{{ launcher.name }}</md-card-header-text>
                    <md-menu md-direction="bottom left">
                        <md-button class="md-icon-button" md-menu-trigger>
                            <md-icon>more_vert</md-icon>
                        </md-button>
                        <md-menu-content>
                            <md-menu-item @click.native="$router.push('/launcher/editor/'+launcher.name)">Edit</md-menu-item>
                            <md-menu-item @click.native="remove({name:launcher.name})">Delete</md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </md-card-header>
                <md-card-content>
                    <pre>{{ launcher.script }}</pre>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapActions,
} from 'vuex'

export default {
    name: 'launcher',
    beforeMount() {
        this.$emit('init', {
            title: 'Launcher',
        })
    },
    mounted() {
        this.loadLaunchers()
    },
    computed: {
        ...mapState('launcher', {
            launchers: 'launchers',
        }),
    },
    methods: {
        ...mapActions('launcher', {
            loadLaunchers: 'load',
            remove: 'remove',
        })
    }
}
</script>
<style scoped>
.launcher {
    margin: 1rem 0;
}
</style>
