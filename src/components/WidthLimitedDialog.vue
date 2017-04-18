<template>
    <div>
        <md-dialog ref="dialog">
            <div class="dialog">
                <div style="width: 600px"></div>
                <slot />
            </div>
        </md-dialog>
    </div>
</template>
<script>
export default {
    name: 'width-limited-dialog',
    methods: {
        open() {
            this.$refs['dialog'].open()
        },
        close() {
            this.$refs['dialog'].close()
        },
    }
}
</script>
<style scoped>
.dialog {
    max-width: 600px;
}
</style>
