<template>
    <div>
        <account v-for="account in accounts" :key="account.userId" :userId="account.userId" :token="account.token" />
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
        ...mapState('accounts', [
            'accounts',
        ]),
    },
    methods: {
        ...mapActions({
            loadAccounts: 'accounts/load',
        }),
    },

}
</script>
<style scoped>
</style>
