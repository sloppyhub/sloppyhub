<template>
    <div class="app">
        <md-card>
            <md-card-header>
                <div class="md-title">{{ id }}</div>
                <div class="md-subtitle">{{ image }}</div>
            </md-card-header>
            <md-card-content>
                <md-list>
                    <md-list-item>mem: {{ mem }} MB</md-list-item>
                    <md-list-item>instances: {{ instances }}</md-list-item>
                    <md-list-item>
                        <span>env</span>
                        <md-list-expand>
                            <md-list>
                                <md-list-item v-for="($value,$key) in env" :key="$key">
                                    {{ $key }} : {{ $value }}
                                </md-list-item>
                            </md-list>
                        </md-list-expand>
                    </md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
export default {
    name: 'app',
    props: {
        id: {
            type: String
        },
        image: {
            type: String
        },
        instances: {
            type: Number
        },
        mem: {
            type: Number
        },
        env: {
            type: Object
        },
    },
}
</script>
<style scoped>
</style>
