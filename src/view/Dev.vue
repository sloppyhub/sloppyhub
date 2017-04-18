<template>
    <div id="dev">
        <h2>components/Service</h2>
        <service :id="service.id" :apps="service.apps" />
        <h2>components/Project</h2>
        <project :project="project.project" :services="project.services" />
        <h2>components/Account</h2>
        <account :userId="account.userId" :token="account.token" :projects="account.projects" />
        <h2>components/CopyDialog</h2>
        <copy-dialog ref="copy-token" />
        <md-button @click.native="$refs['copy-token'].open({title:'token',content:Date()})">Copy</md-button>
        <h2>components/WidthLimitedDialog</h2>
        <width-limited-dialog ref="dialog">
            <md-dialog-title>Title</md-dialog-title>
            <md-dialog-content>
                The content of dialog
            </md-dialog-content>
            <md-dialog-actions>
                <md-button @click.native="$refs['dialog'].close()">Close</md-button>
            </md-dialog-actions>
        </width-limited-dialog>
        <md-button @click.native="$refs['dialog'].open()">Open</md-button>
    </div>
</template>
<script>
import Service from '@/components/Service'
import Project from '@/components/Project'
import Account from '@/components/Account'
import CopyDialog from '@/components/CopyDialog'
import WidthLimitedDialog from '@/components/WidthLimitedDialog'

export default {
    name: 'dev',
    components: {
        Service,
        Project,
        Account,
        CopyDialog,
        WidthLimitedDialog,
    },
    beforeMount() {
        let $vue = this
        this.$emit('init', {
            title: 'Dev',
            more: [{
                name: "Copy Date",
                action() {
                    $vue.$refs['copy-token'].open({
                        title: 'Now Date',
                        content: Date(),
                    })
                },
            }],
        })
    },
    data() {
        return {
            service: {
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
            },
            project: {
                "services": [{
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
                }, {
                    "id": "backend",
                    "apps": [{
                        "lastFailure": null,
                        "mem": 256,
                        "image": "vimagick/shadowsocks",
                        "instances": 1,
                        "env": {
                            "PASSWORD": "afvbwtnmy3"
                        },
                        "versions": [
                            "2017-03-29T06:27:17.832Z"
                        ],
                        "version": "2017-03-29T06:27:17.832Z",
                        "id": "ss",
                        "status": [
                            "running"
                        ]
                    }, {
                        "lastFailure": null,
                        "instances": 1,
                        "image": "mofon/docker-gotty",
                        "mem": 256,
                        "volumes": [{
                            "size": "8GB",
                            "container_path": "/data"
                        }],
                        "versions": [
                            "2017-03-29T06:27:17.832Z"
                        ],
                        "version": "2017-03-29T06:27:17.832Z",
                        "env": {
                            "USERNAME": "mofon",
                            "PASSWORD": "fsaby5v3vtat"
                        },
                        "id": "gotty",
                        "status": [
                            "running"
                        ]
                    }]
                }],
                "project": "exposer"
            },
            account: {
                'userId': 'jlihsef',
                'token': 'ljf3aijfln8u525mp5faebawn6wn6n6nabyv4ybvayuenynaetyvg3VRWTWBTWBBBWTWQFAAJLIWy2cya==',
                'projects': [{
                    "services": [{
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
                    }, {
                        "id": "backend",
                        "apps": [{
                            "lastFailure": null,
                            "mem": 256,
                            "image": "vimagick/shadowsocks",
                            "instances": 1,
                            "env": {
                                "PASSWORD": "afvbwtnmy3"
                            },
                            "versions": [
                                "2017-03-29T06:27:17.832Z"
                            ],
                            "version": "2017-03-29T06:27:17.832Z",
                            "id": "ss",
                            "status": [
                                "running"
                            ]
                        }, {
                            "lastFailure": null,
                            "instances": 1,
                            "image": "mofon/docker-gotty",
                            "mem": 256,
                            "volumes": [{
                                "size": "8GB",
                                "container_path": "/data"
                            }],
                            "versions": [
                                "2017-03-29T06:27:17.832Z"
                            ],
                            "version": "2017-03-29T06:27:17.832Z",
                            "env": {
                                "USERNAME": "mofon",
                                "PASSWORD": "fsaby5v3vtat"
                            },
                            "id": "gotty",
                            "status": [
                                "running"
                            ]
                        }]
                    }],
                    "project": "exposer"
                }],
            },
        }

    },
}
</script>
<style scoped>
#dev {
    padding: 0 20px;
    max-width: 860px;
    margin: 20px auto 0;
}
</style>
