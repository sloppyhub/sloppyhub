<template>
    <div>
        <App id="hello world" image="mofon/hello" :env="env" :instances="1" :mem="256" />
    </div>
</template>
<script>
import App from '@/components/App'

export default {
    name: 'dev',
    components: {
        App,
    },
    data() {
        return {
            env: {
                hello: "world",
            }
        }
    },
}
</script>
