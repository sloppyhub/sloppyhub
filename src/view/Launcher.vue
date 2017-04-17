<template>
    <div>
        <div class="launcher" v-for="launcher in launchers" :key="launcher.name">
            <md-card>
                <md-card-header>
                    <div class="md-title">{{ launcher.name }}</div>
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
        })
    }
}
</script>
<style scoped>
.launcher {
    margin: 1rem 0;
}
</style>
