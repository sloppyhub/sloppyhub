<template>
    <div>
        <div v-for="account in accounts" :key="account.userId" style="margin: 1rem 0;">
            <account :userId="account.userId" :token="account.token" />
        </div>
    </div>
</template>
<script>
import Account from '@/components/Account'


import {
    mapState,
    mapActions
} from 'vuex'


export default {
    name: 'overview',
    components: {
        Account,
    },
    beforeMount() {
        let $vue = this
        this.$emit('init', {
            title: 'Overview',
            more: [],
        })
    },
    mounted() {
        this.loadAccounts()
    },
    computed: {
        ...mapState('account', [
            'accounts',
        ]),
    },
    methods: {
        ...mapActions({
            loadAccounts: 'account/load',
        }),
    },

}
</script>
<style scoped>
</style>
