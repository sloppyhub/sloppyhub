<template>
    <div>
        <!-- copy dialog -->
        <copy-dialog ref="copy-dialog" />
        <!-- undo -->
        <md-snackbar ref="undo-snackbar" md-position="bottom right" md-duration="7000">
            <span>{{ undo.title }}</span>
            <md-button class="md-accent" @click.native="undo.action">Undo</md-button>
        </md-snackbar>
        <!-- account editor dialog -->
        <width-limited-dialog ref="account-editor">
            <md-dialog-title>Edit Account</md-dialog-title>
            <md-dialog-content>
                <md-input-container :class="{'md-input-invalid':accountEditor.userIdError.length > 0}">
                    <label>User ID</label>
                    <md-input v-model="accountEditor.userId" />
                    <span class="md-error">{{ accountEditor.userIdError }}</span>
                </md-input-container>
                <md-input-container>
                    <label>Access Token</label>
                    <md-textarea v-model="accountEditor.token" />
                </md-input-container>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-accent" @click.native="editAccountDone">Done</md-button>
            </md-dialog-actions>
        </width-limited-dialog>
        <!-- main -->
        <md-card md-with-hover>
            <md-card-header>
                <md-card-header-text>
                    <span class="md-title">Accounts</span>
                </md-card-header-text>
                <md-menu md-direction="bottom left">
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>more_vert</md-icon>
                    </md-button>
                    <md-menu-content>
                        <md-menu-item @click.native="openAccountEditor({userId:'',token:''})">Add</md-menu-item>
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
    mapGetters,
    mapActions
} from 'vuex'

import CopyDialog from '@/components/CopyDialog'
import WidthLimitedDialog from '@/components/WidthLimitedDialog'

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
        WidthLimitedDialog,
    },
    data() {
        return {
            undo: {
                title: '',
                action() {},
            },
            accountEditor: {
                userId: '',
                token: '',
                oldUserId: '',
                userIdError: '',
            },
        }
    },
    computed: {
        ...mapState('account', {
            accounts: 'accounts',
        }),
        ...mapGetters({
            accountsMap: 'account/map',
        })
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
        openAccountEditor({
            userId,
            token
        }) {
            this.accountEditor.userId = userId
            this.accountEditor.token = token
            this.accountEditor.oldUserId = userId
            this.$refs['account-editor'].open()
        },
        editAccountDone() {
            if (this.accountEditor.userId == '') {
                this.accountEditor.userIdError = 'userId is empty'
                return
            }

            this.addAccount({
                userId: this.accountEditor.userId,
                token: this.accountEditor.token,
            })
            this.$refs['account-editor'].close()
        },
        ...mapActions({
            addAccount: 'account/add',
            loadAccounts: 'account/load',
            removeAccount: 'account/remove',
        })
    },
}
</script>
