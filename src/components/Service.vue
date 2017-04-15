<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title">{{ id }}</div>
            </md-card-header>
            <md-card-content>
                <app v-for="app in apps" :key="app.id" :id="app.id" :image="app.image" :mem="app.mem" :instances="app.instances" :env="app.env" />
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
import App from '@/components/App'
export default {
    name: 'service',
    props: {
        id: {
            type: String,
        },
        apps: {
            type: Array,
        }
    },
    components: {
        App,
    }
}
</script>
