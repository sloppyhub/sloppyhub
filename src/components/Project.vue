<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title">{{ project }}</div>
            </md-card-header>
            <md-card-content>
                <service v-for="service in services" :key="service.id" :id="service.id" :apps="service.apps" />
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
import Service from '@/components/Service'

export default {
    name: 'project',
    props: {
        project: {
            type: String,
        },
        services: {
            type: Array,
        },
    },
    components: {
        Service,
    }
}
</script>
