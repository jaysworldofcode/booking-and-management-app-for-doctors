<template>
    <a-drawer
      :title="title"
      placement="right"
      :closable="false"
      :visible="modal_visibility"
      :width="500"
      @close="onClose"
    >
        <a-form :form="form">
            <a-row :gutter="[8,8]">
                <a-col :span="24">
                    <a-form-item label="Name">
                        <a-input v-model="name" v-decorator="[
                            'name',
                            {
                                rules: [{ required: true, message: 'Please input client name' }],
                            },
                        ]" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Birthdate">
                        <a-date-picker
                            v-decorator="[
                                'birthdate',
                                { rules: [{ required: true, message: 'Please input date established' }] }]"
                            :format="date_format"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-button type="primary" class="w-100" @click="save" :loading="is_loading">Save</a-button>
                </a-col>
                <a-col :span="12">
                    <a-button class="w-100" @click="cancel" :loading="is_loading">Cancel</a-button>
                </a-col>
            </a-row>
        </a-form>
    </a-drawer>
</template>
<script>
    export default {
        name: 'ClientModal',
        data() {
            return {
                date_format: 'YYYY/MM/DD',
                form: this.$form.createForm(this, { name: 'dynamic_rule' }),
                is_loading: false
            }
        },
        props: [
            'on_save',
            'on_close',
            'on_cancel',
            'modal_visibility'
        ],
        computed: {
        },
        methods: {
            cancel(){
                this.on_cancel()
            },
            onClose() {
                this.on_close()
            },
            save(){
                this.on_save()
            }
        }
    }
</script>
<style scoped>
</style>