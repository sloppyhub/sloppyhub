<template>
    <div>
        <md-card>
            <md-card-header>
                <span class="md-title">{{ userId }}</span>
                <md-button class="md-primary" @click.native="$refs['dlg-token'].open()">get token</md-button>
            </md-card-header>
            <md-card-content>
                <project v-for="project in projects" :key="project.project" :project="project.project" :services="project.services" />
            </md-card-content>
        </md-card>
        <md-dialog ref="dlg-token">
            <div style="width: 800px;"></div>
            <md-dialog-title>Access Token</md-dialog-title>
            <md-dialog-content>
                <div style="word-wrap: break-word;">{{ token }}</div>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>
<script>
import Project from '@/components/Project'

export default {
    name: 'account',
    props: {
        userId: {
            type: String,
        },
        token: {
            type: String,
        },
        projects: {
            type: Array,
        },
    },
    components: {
        Project,
    },
}
</script>
