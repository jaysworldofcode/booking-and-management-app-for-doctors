<template>
    <a-drawer
      :title="title"
      placement="right"
      :closable="false"
      :visible="getClientsModalVisibility"
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
                    <a-form-item label="Gender">
                    <a-radio-group
                        v-model="gender"
                        v-decorator="[
                            'gender',
                            {
                                rules: [{ required: true, message: 'Please input client name' }]
                            }
                        ]">
                        <a-radio value="male">
                            Male
                        </a-radio>
                        <a-radio value="female">
                            Female
                        </a-radio>
                        <a-radio value="unkown">
                            Unknown
                        </a-radio>
                    </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Birthdate">
                        <a-date-picker
                            v-model="birthdate"
                            v-decorator="[
                                'birthdate',
                                { rules: [{ required: true, message: 'Please input date established' }] }]"
                            :format="date_format"/>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Contact Number">
                        <a-input
                            v-model="contact_number"
                            v-decorator="[
                                'contact_number',
                                {
                                    rules: [{ required: true, message: 'Please input your phone number' }],
                                },
                            ]"
                            style="width: 100%"
                        >
                            <a-select
                            slot="addonBefore"
                            v-decorator="['prefix', { initialValue: '63' }]"
                            style="width: 70px"
                            >
                                <a-select-option value="63">
                                    +63
                                </a-select-option>
                            </a-select>
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Email">
                        <a-input
                            v-model="email"
                            v-decorator="[
                                'email',
                                { rules: [{ required: true, message: 'Please input your email' }] },
                            ]" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Address">
                        <a-input
                            v-model="address"
                            v-decorator="[
                                'address',
                                {
                                    rules: [{ required: true, message: 'Please input your phone number' }],
                                },
                            ]" />
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
    import { mapGetters, mapMutations } from "vuex";
    import client_types from '@/modules/store/clients/types.js'
    import ClientsHelper from '@/modules/helpers/db.clients_helper.js'

    export default {
        name: 'ClientModal',
        data() {
            return {
                selected_prefix_number: '+63',
                date_format: 'YYYY/MM/DD',
                form: this.$form.createForm(this, { name: 'dynamic_rule' }),
                is_loading: false
            }
        },
        props: [
            'title'
        ],
        computed: {
            ...mapGetters({
                getClients: client_types.GET_CLIENTS,
                getClientsModalVisibility: client_types.GET_CLIENT_MODAL_VISIBILITY,
                getClientsFormFields: client_types.GET_CLIENT_FORM_FIELDS,
            }),
            name: {
                get() {
                    return this.getClientsFormFields.name
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'name',
                        value: newValue
                    })
                }
            },
            contact_number: {
                get() {
                    return this.getClientsFormFields.contact_number
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'contact_number',
                        value: newValue
                    })
                }
            },
            birthdate: {
                get() {
                    return this.getClientsFormFields.birthdate
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'birthdate',
                        value: newValue.format("YYYY/MM/DD")
                    })
                }
            },
            email: {
                get() {
                    return this.getClientsFormFields.email
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'email',
                        value: newValue
                    })
                }
            },
            address: {
                get() {
                    return this.getClientsFormFields.address
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'address',
                        value: newValue
                    })
                }
            },
            gender: {
                get() {
                    return this.getClientsFormFields.gender
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'gender',
                        value: newValue
                    })
                }
            },
            modalVisiblity() {
                return this.getModalVisibility
            },
        },
        methods: {
            ...mapMutations({
                setModalVisibility: client_types.SET_CLIENT_MODAL_VISIBILITY,
                setSingleModalField: client_types.SET_MODAL_FIELD_SINGLE_VALUE
            }),
            async save(){
                this.form.validateFields(async err => {
                    if (!err) {
                        this.is_loading = true
                        await new ClientsHelper().createClient(
                            1,
                            this.name,
                            this.contact_number,
                            this.birthdate,
                            this.email,
                            this.address,
                            this.gender
                        );

                        this.$store.dispatch(client_types.FETCH_CLIENTS)
                        this.resetFields()
                        this.setModalVisibility(false)
                        this.is_loading = true
                    }
                });
            },
            cancel(){
                this.resetFields()
                this.setModalVisibility(false)
            },
            onClose() {
                this.setModalVisibility(false)
            },
            resetFields(){
                this.form.resetFields()
                this.$store.dispatch(client_types.CLEAR_FORM_FIELDS)
            }
        }
    }
</script>
<style scoped>
</style>