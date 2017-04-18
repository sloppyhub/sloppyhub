<template>
    <div>
        <width-limited-dialog ref="dialog">
            <md-dialog-title>{{ title }}</md-dialog-title>
            <md-dialog-content>
                <div style="word-wrap: break-word;">{{ content }}</div>
            </md-dialog-content>
        </width-limited-dialog>
        <md-snackbar ref="toast-copied" md-position="bottom right" md-duration="1800">
            <span>Copied {{ title }}</span>
        </md-snackbar>
    </div>
</template>
<script>
import Vue from 'vue'
import copy from 'copy-to-clipboard'
import WidthLimitedDialog from '@/components/WidthLimitedDialog'

export default {
    name: 'copy-dialog',
    components: {
        WidthLimitedDialog,
    },
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
            this.trycopy()
        },
        close() {
            this.$refs['dialog'].close()
        },
        trycopy() {
            if (!copy(this.content)) {
                this.$refs['dialog'].open()
                return
            }
            this.$refs['toast-copied'].open()
            this.close()
        },
    },
}
</script>
