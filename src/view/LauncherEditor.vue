<template>
    <div>
        <md-card md-with-hover>
            <md-card-header>
                <md-card-header-text class="md-title">Edit Launcher</md-card-header-text>
                <md-menu md-direction="bottom left">
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>more_vert</md-icon>
                    </md-button>
                    <md-menu-content>
                        <md-menu-item @click.native="save">Save</md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-card-header>
            <md-card-content>
                <md-input-container :class="{'md-input-invalid':nameError.length > 0}">
                    <label>Name</label>
                    <md-input v-model.trim="name" @focusout.native="checkName" :required="true"></md-input>
                    <span class="md-error">{{ nameError }}</span>
                </md-input-container>
                <md-input-container :class="{'md-input-invalid':scriptError.length > 0}">
                    <label>Script</label>
                    <md-textarea v-model="script" @focusout.native="format" style="font-family: monospace;"></md-textarea>
                    <span class="md-error">{{ scriptError }}</span>
                </md-input-container>
            </md-card-content>
            <md-card-actions>
                <md-button @click.native="$router.back()">Cancel</md-button>
                <md-button class="md-accent" @click.native="done">Done</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    name: 'launcher-editor',
    beforeMount() {
        this.$emit('init', {
            left_button: 'arrow_back',
            title: 'Launcher Editor'
        })
    },
    data() {
        return {
            name: '',
            script: '',
            oldName: '',
            nameError: '',
            scriptError: '',
        }
    },
    mounted() {
        if (this.$route.params.name != undefined) {
            this.name = this.$route.params.name
        } else {
            this.name = ''
        }
        this.oldName = this.name
        this.loadLaunchers().then(() => {
            let l = this.launchers[this.name]
            if (l !== undefined) {
                this.script = l.script
            }
        })
    },
    computed: {
        ...mapGetters('launcher', {
            launchers: 'map',
        })
    },
    methods: {
        checkName() {
            this.nameError = ''
            try {
                if (this.name == '') {
                    throw Error('name is empty')
                }
                return true
            } catch (err) {
                this.nameError = err.toString()
                return false
            }
        },
        format() {
            this.scriptError = ''
            try {
                let data = JSON.parse(this.script)
                this.script = JSON.stringify(data, null, '  ')
                return true
            } catch (err) {
                this.scriptError = err.toString()
                return false
            }
        },
        save() {
            let nameChecked = this.checkName()
            let formatted = this.format()
            if (!(nameChecked && formatted)) {
                return false
            }

            if (this.oldName == '') {
                this.addLauncher({
                    name: this.name,
                    script: this.script,
                }).then(() => {
                    this.oldName = name
                })
                return true
            }
            if (this.oldName !== this.name) {
                this.renameLauncher({
                    name: this.oldName,
                    newName: this.name,
                }).then(() => {
                    this.oldName = name
                })
            }
            if (this.launchers[this.name] !== undefined) {
                this.editLauncher({
                    name: this.name,
                    script: this.script,
                })

            } else {
                this.addLauncher({
                    name: this.name,
                    script: this.script,
                })
            }

            return true
        },
        done() {
            if (this.save()) {
                this.$router.back()
            }
        },
        ...mapActions('launcher', {
            addLauncher: 'add',
            renameLauncher: 'rename',
            editLauncher: 'edit',
            loadLaunchers: 'load',
        })
    }
}
</script>
<style scoped>
.error {
    color: red;
    font-size: 95%;
}
</style>
