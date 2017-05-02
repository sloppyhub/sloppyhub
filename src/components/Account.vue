<template>
    <div>
        <md-card md-with-hover>
            <md-card-header>
                <md-card-header-text class="md-title">{{ userId }}</md-card-header-text>
                <md-button class="md-primary" @click.native="$refs['copy-dialog'].open({title:'Access Token',content:token})">Get Token</md-button>
            </md-card-header>
            <md-card-content>
                <md-list>
                    <div v-for="(project,index) in allProjects[userId]" :key="project.project">
                        <md-divider class="md-inset" v-show="index > 0" />
                        <md-subheader>
                            {{ project.project }}
                            <md-button class="md-dense md-warn" @click.native="deleteProject({userId,token,projectId:project.project})">delete</md-button>
                        </md-subheader>
                        <md-list-item v-for="sa in getServiceApps(project)" :key="sa.name">
                            <app :app="sa.app" :service="sa.service" :hostname="sa.hostname" />
                        </md-list-item>
                    </div>
                </md-list>
            </md-card-content>
        </md-card>
        <copy-dialog ref="copy-dialog" />
    </div>
</template>
<script>
import App from '@/components/App'
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
        App,
        CopyDialog,
    },
    mounted() {
        this.loadProjects({
            userId: this.userId,
            token: this.token,
        }).then(() => {}).catch(() => {})
    },
    computed: {
        ...mapState('project', {
            allProjects: 'projects',
        }),
    },

    methods: {
        ...mapActions({
            loadProjects: 'project/load',
            deleteProject: 'project/delete',
        }),
        getServiceApps(project) {
            let userId = this.userId
            let sa = []
            project.services.forEach(service => {
                service.apps.forEach(app => {
                    sa.push({
                        hostname: app.id + "." + service.id + "." + project.project + "." + userId,
                        service,
                        app,
                    })
                })
            })
            return sa
        },
    },
}
</script>
