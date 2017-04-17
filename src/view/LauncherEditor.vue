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
                <md-input-container>
                    <label>Name</label>
                    <md-input v-model.trim="name" @focusout.native="checkName" :required="true"></md-input>
                </md-input-container>
                <span class="error" v-show="typeof nameError === 'string' && nameError.length > 0">{{ nameError }}</span>
                <md-input-container>
                    <label>Script</label>
                    <md-textarea v-model="script" @focusout.native="format" style="font-family: monospace;"></md-textarea>
                </md-input-container>
                <span class="error" v-show="typeof error === 'string' && error.length > 0">{{ error }}</span>
            </md-card-content>
            <md-card-actions>
                <md-button @click.native="$router.back()">Cancel</md-button>
                <md-button class="md-accent" @click.native="done">Done</md-button>
            </md-card-actions>
        </md-card>
        <pre>{{ name }}</pre>
        <hr />
        <pre>{{ script }}</pre>
        <pre>{{ launchers }}</pre>
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
            error: '',
            nameError: '',
        }
    },
    mounted() {
        this.name = this.$route.params.name
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
                if (this.name === '') {
                    throw Error('name is empty')
                }
                return true
            } catch (err) {
                this.nameError = err.toString()
                return false
            }
        },
        format() {
            this.error = ''
            try {
                let data = JSON.parse(this.script)
                this.script = JSON.stringify(data, null, '  ')
                return true
            } catch (err) {
                this.error = err.toString()
                return false
            }
        },
        save() {
            if (!this.checkName() || !this.format()) {
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
            if (this.launchers[this.name] === undefined) {
                this.addLauncher({
                    name: this.name,
                    script: this.script,
                })
                return true
            }

            this.editLauncher({
                name: this.name,
                script: this.script,
            })
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
