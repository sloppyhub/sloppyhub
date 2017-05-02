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
                            <md-menu-item @click.native="projectLauncher = launcher;$refs['launch-project-dialog'].open()">Run</md-menu-item>
                            <md-menu-item @click.native="remove({name:launcher.name})">Delete</md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </md-card-header>
                <md-card-content>
                    <pre>{{ launcher.script }}</pre>
                </md-card-content>
            </md-card>
        </div>
        <width-limited-dialog ref="launch-project-dialog">
            <md-dialog-title>Launch Project</md-dialog-title>
            <md-dialog-content>
                <md-input-container>
                    <label>Account</label>
                    <md-select v-model="projectLauncher.userId" required>
                        <md-option v-for="account in accounts" :key="account.userId" :value="account.userId">{{ account.userId }}</md-option>
                    </md-select>
                </md-input-container>
                <div>
                    <div class="md-title">{{ projectLauncher.errorMessage }}</div>
                    <p>{{ projectLauncher.errorReason }}</p>
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button @click.native="launchProject">Run</md-button>
            </md-dialog-actions>
            <md-progress md-indeterminate v-show="projectLauncher.loading"></md-progress>
        </width-limited-dialog>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapActions,
} from 'vuex'

import WidthLimitedDialog from '@/components/WidthLimitedDialog'
import axios from 'axios'

export default {
    name: 'launcher',
    beforeMount() {
        let $vue = this
        this.$emit('init', {
            title: 'Launcher',
            more: [{
                name: 'Add Launcher',
                action() {
                    $vue.$router.push('/launcher/editor')
                }
            }]
        })
    },
    components: {
        WidthLimitedDialog,
    },
    data() {
        return {
            projectLauncher: {
                name: '',
                script: '',
                userId: '',
                loading: false,
                errorMessage: '',
                errorReason: '',
            }
        }
    },
    mounted() {
        this.loadLaunchers()
        this.loadAccounts()
    },
    computed: {
        ...mapState('launcher', {
            launchers: 'launchers',
        }),
        ...mapState('account', {
            accounts: 'accounts',
        }),
        ...mapGetters({
            accountsMap: 'account/map',
        })
    },
    methods: {
        launchProject() {
            let token = this.accountsMap[this.projectLauncher.userId].token
            this.projectLauncher = {...this.projectLauncher,
                loading: true
            }
            axios.post('https://api.sloppy.io/v1/apps', this.projectLauncher.script, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            }).then(resp => {
                this.projectLauncher = {...this.projectLauncher,
                    loading: false
                }
                this.$refs['launch-project-dialog'].close()
            }).catch(err => {
                this.projectLauncher = {...this.projectLauncher,
                    loading: false,
                    errorMessage: err.response.data.message,
                    errorReason: err.response.data.reason,
                }
            })
        },
        ...mapActions('launcher', {
            loadLaunchers: 'load',
            remove: 'remove',
        }),
        ...mapActions({
            loadAccounts: 'account/load',
        })
    }
}
</script>
<style scoped>
.launcher {
    margin: 1rem 0;
}
</style>
