<template>
    <div>
        <md-card>
            <md-card-header>
                <span class="md-title">{{ userId }}</span>
                <md-button class="md-primary" @click.native="$refs['dlg-token'].open({title:'Access Token',content:token})">get token</md-button>
            </md-card-header>
            <md-card-content>
                <project v-for="project in allProjects[userId]" :key="project.project" :project="project.project" :services="project.services" />
            </md-card-content>
        </md-card>
        <copy-dialog ref="dlg-token" />
    </div>
</template>
<script>
import Project from '@/components/Project'
import CopyDialog from '@/components/CopyDialog'
import {
    mapState,
    mapActions,
} from 'vuex'
export default {
    name: 'account',
    props: {
        userId: {
            type: String,
        },
        token: {
            type: String,
        },
    },
    components: {
        Project,
        CopyDialog,
    },
    mounted() {
        this.loadProjects({
            userId: this.userId,
            token: this.token,
        }).then(() => {}).catch(() => {})
    },
    computed: {
        ...mapState('projects', {
            allProjects: 'projects',
        }),
    },

    methods: {
        ...mapActions({
            loadProjects: 'projects/load',
        })
    },
}
</script>
