<template>
    <div>
        <copy-dialog ref="copy-dialog" />
        <md-snackbar ref="undo-snackbar" md-position="bottom right" md-duration="7000">
            <span>{{ undo.title }}</span>
            <md-button class="md-accent" @click.native="undo.action">Undo</md-button>
        </md-snackbar>
        <md-card>
            <md-card-header>
                <md-card-header-text>
                    <span class="md-title">Accounts</span>
                </md-card-header-text>
                <md-menu md-direction="bottom left">
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>more_vert</md-icon>
                    </md-button>
                    <md-menu-content>
                        <md-menu-item>Add</md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-card-header>
            <md-card-content>
                <md-list>
                    <md-list-item v-for="account in accounts" :key="account.userId" @click.native="">
                        <span>{{ account.userId }}</span>
                        <md-menu md-direction="bottom left">
                            <md-button class="md-icon-button" md-menu-trigger>
                                <md-icon>more_vert</md-icon>
                            </md-button>
                            <md-menu-content>
                                <md-menu-item @click.native="getAccountToken(account)">Get Token</md-menu-item>
                                <md-menu-item @click.native="removeAccountWithUndo(account)">Delete</md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
import {
    mapState,
    mapActions
} from 'vuex'

import CopyDialog from '@/components/CopyDialog'

export default {
    name: 'settings',
    beforeMount() {
        this.$emit('init', {
            title: 'Settings',
        })
    },
    mounted() {
        this.loadAccounts()
    },
    components: {
        CopyDialog,
    },
    data() {
        return {
            undo: {
                title: '',
                action() {},
            }
        }
    },
    computed: {
        ...mapState('account', {
            accounts: 'accounts',
        }),
    },
    methods: {
        getAccountToken(account) {
            this.$refs['copy-dialog'].open({
                title: 'Access Token of ' + account.userId,
                content: account.token
            })
        },
        removeAccountWithUndo(account) {
            let removedAccount = {
                userId: account.userId,
                token: account.token,
            }
            this.removeAccount(account).then(() => {
                this.undo.title = "delete account " + removedAccount.userId
                this.undo.action = () => {
                    this.addAccount(removedAccount)
                    this.$refs['undo-snackbar'].close()
                }
                this.$refs['undo-snackbar'].open()
            })
        },
        ...mapActions({
            addAccount: 'account/add',
            loadAccounts: 'account/load',
            removeAccount: 'account/remove',
        })
    },
}
</script>
