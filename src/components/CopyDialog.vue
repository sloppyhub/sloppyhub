<template>
    <div>
        <md-dialog ref="dialog">
            <div class="dialog">
                <div style="width: 600px"></div>
                <md-dialog-title>{{ title }}</md-dialog-title>
                <md-dialog-content>
                    <div style="word-wrap: break-word;">{{ content }}</div>
                </md-dialog-content>
                <md-dialog-actions>
                    <md-button @click.native="close">Cancel</md-button>
                    <md-button class="md-primary" v-clipboard="content" @success="onsuccess" @error="onerror">Copy</md-button>
                </md-dialog-actions>
            </div>
        </md-dialog>
        <md-snackbar ref="toast-copied" md-position="bottom right" md-duration="1800">
            <span>Copied {{ title }}</span>
        </md-snackbar>
    </div>
</template>
<script>
import Vue from 'vue'
import VueClipboards from 'vue-clipboards'

Vue.use(VueClipboards)

export default {
    name: 'copy-dialog',
    data() {
        return {
            title: '',
            content: '',
        }
    },
    methods: {
        open({
            title,
            content,
        }) {
            this.title = title
            this.content = content
            this.$refs['dialog'].open()
        },
        close() {
            this.$refs['dialog'].close()
        },
        onsuccess() {
            this.$refs['toast-copied'].open()
            this.close()
        },
        onerror() {

        },
    },
}
</script>
<style>
.dialog {
    max-width: 600px;
}
</style>
