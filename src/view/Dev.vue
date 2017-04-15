<template>
    <div>
        <service :id="id" :apps="apps" />
    </div>
</template>
<script>
import Service from '@/components/Service'

export default {
    name: 'dev',
    components: {
        Service,
    },
    data() {
        return {
            "id": "frontend",
            "apps": [{
                "domain": {
                    "uri": "exposer.sloppy.zone"
                },
                "mem": 256,
                "image": "mofon/exposer",
                "instances": 1,
                "lastFailure": null,
                "port_mappings": [{
                    "container_port": 9000
                }],
                "status": [
                    "running"
                ],
                "id": "exposer-daemon",
                "versions": [
                    "2017-03-29T06:27:17.832Z"
                ],
                "version": "2017-03-29T06:27:17.832Z",
                "env": {
                    "FORWARD_KEY": "jvw3mfrrnwvlrjif"
                }
            }]
        }

    },
}
</script>
