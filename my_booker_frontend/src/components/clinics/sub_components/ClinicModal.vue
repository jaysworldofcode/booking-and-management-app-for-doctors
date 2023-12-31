<template>
    <a-drawer
      :title="title"
      placement="right"
      :closable="false"
      :visible="modalVisiblity"
      :width="500"
      @close="onClose"
    >
        <a-form :form="form">
            <a-row :gutter="[8,8]">
                <a-col :span="24">
                    <a-form-item label="Name">
                        <a-input v-model="name" v-decorator="[
                            'name',
                            { rules: [{ required: true, message: 'Please input your establishment name' }] },
                            ]" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Date Establish">
                        <a-date-picker v-model="date_establish"
                            v-decorator="['date_establish', { rules: [{ required: true, message: 'Please input date established' }] }]" :format="date_format"/>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Email">
                        <a-input v-model="email" v-decorator="[
                            'email',
                            { rules: [{ required: true, message: 'Please input your email' }] },
                            ]" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Contact Number">
                    <a-input
                        v-decorator="[
                            'contact_number',
                            {
                                rules: [{ required: true, message: 'Please input your phone number' }],
                            },
                        ]"
                        style="width: 100%"
                        v-model="contact_number"
                    >
                        <a-select
                        slot="addonBefore"
                        v-decorator="['prefix', { initialValue: '63' }]"
                        style="width: 70px"
                        v-model="selected_prefix_number"
                        >
                            <a-select-option value="63">
                                +63
                            </a-select-option>
                        </a-select>
                    </a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Address">
                        <a-input v-model="address" v-decorator="[
                            'address',
                            {
                                rules: [{ required: true, message: 'Please input your phone number' }],
                            },
                        ]" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Description">
                        <a-textarea v-model="description" v-decorator="[
                            'description',
                            { rules: [{ required: true, message: 'Please input your description' }] },
                            ]" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-button type="primary" class="w-100" @click="save">Save</a-button>
                </a-col>
                <a-col :span="12">
                    <a-button class="w-100" @click="cancel">Cancel</a-button>
                </a-col>
            </a-row>
        </a-form>
    </a-drawer>
</template>
<script>
    import { mapGetters, mapMutations } from "vuex"
    import clinics_types from '@/modules/store/clinics/type.js'
    import ClinicsHelper from '@/modules/helpers/db.clinics_helper.js'

    export default {
        name: 'ClinicModal',
        data() {
            return {
                selected_prefix_number: '+63',
                date_format: 'YYYY/MM/DD',
                form: this.$form.createForm(this, { name: 'dynamic_rule' }),
            }
        },
        props: [
            'title'
        ],
        computed: {
            ...mapGetters({
                getModalVisibility: clinics_types.GET_MODAL_VISIBILITY,
                getModalFields: clinics_types.GET_MODAL_FIELD
            }),
            name: {
                get() {
                    return this.getModalFields.name
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'name',
                        value: newValue
                    })
                }
            },
            date_establish: {
                get() {
                    return this.getModalFields.date_establish
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'date_establish',
                        value: newValue.format("YYYY/MM/DD")
                    })
                }
            },
            contact_number: {
                get() {
                    return this.getModalFields.contact_number
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'contact_number',
                        value: newValue
                    })
                }
            },
            address: {
                get() {
                    return this.getModalFields.address
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'address',
                        value: newValue
                    })
                }
            },
            description: {
                get() {
                    return this.getModalFields.description
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'description',
                        value: newValue
                    })
                }
            },
            email: {
                get() {
                    return this.getModalFields.email
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'email',
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
                setModalVisibility: clinics_types.SET_MODAL_VISIBILITY,
                setSingleModalField: clinics_types.SET_MODAL_FIELD_SINGLE_VALUE
            }),
            async save(){
                this.form.validateFields(async err => {
                    if (!err) {
                        await new ClinicsHelper().createClinic(
                            this.name,
                            this.email,
                            this.date_establish,
                            this.contact_number,
                            this.address,
                            this.getModalFields.description
                        );

                        this.$store.dispatch(clinics_types.FETCH_CLINICS)
                        this.resetFields()
                        this.setModalVisibility(false);
                    }
                });
            },
            cancel(){
                this.resetFields()
                this.setModalVisibility(false);
            },
            onClose() {
                this.setModalVisibility(false);
            },
            onChange(e) {
                this.placement = e.target.value;
            },
            resetFields(){
                this.form.resetFields()
                this.$store.dispatch(clinics_types.CLEAR_FORM_FIELDS)
            }
        }
    }
</script>
<style scoped>
</style>