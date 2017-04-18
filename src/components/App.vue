<template>
    <div class="app">
        <copy-dialog ref="copy-dialog" />
        <div>
            <div class="md-title">{{ app.id }}
                <md-chip>{{ service.id }}</md-chip>
            </div>
            <div class="md-subtitle">{{ app.image }}</div>
        </div>
        <md-list>
            <md-list-item v-show="domainURL.length > 0">
                Web: <a :href="domainURL" target="_blank">{{ domainURL }}</a>
            </md-list-item>
            <md-list-item>
                <div style="flex-grow: 1;">hostname:</div>
                <div style="flex-grow: 0;word-wrap: break-word;">{{ hostname }}</div>
                <md-button class="md-icon-button" style="flex-grow: 0;" @click.native="$refs['copy-dialog'].open({title:'hostname',content:hostname})">
                    <md-icon>content_copy</md-icon>
                </md-button>
            </md-list-item>
            <md-list-item>RAM: {{ app.mem }} MB</md-list-item>
            <md-list-item>Instances: {{ app.instances }}</md-list-item>
            <md-list-item>
                <div style="width: 100%;display: flex; flex-flow: row nowrap; align-items: flex-start;justify-content: space-around;">
                    <div class="md-subtitle" style="flex-grow: 0;margin-right: 1rem;">Env:</div>
                    <md-table style="flex-grow: 1;">
                        <md-table-body>
                            <md-table-row v-for="($value,$key) in app.env" :key="$key">
                                <md-table-cell>{{ $key }}</md-table-cell>
                                <md-table-cell>{{ $value }}</md-table-cell>
                            </md-table-row>
                        </md-table-body>
                    </md-table>
                </div>
            </md-list-item>
        </md-list>
    </div>
</template>
<script>
import CopyDialog from '@/components/CopyDialog'

export default {
    name: 'app',
    props: {
        app: {
            type: Object
        },
        service: {
            type: Object,
        },
        hostname: {
            type: String,
        },

    },
    components: {
        CopyDialog,
    },
    computed: {
        domainURL() {
            if (this.app.domain == undefined) {
                return ''
            }
            return 'https://' + this.app.domain.uri + '/'
        },
    },
}
</script>
<style scoped>
.app {
    width: 100%;
}
</style>
