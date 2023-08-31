<template>
    <a-drawer
      :title="title"
      placement="right"
      :closable="false"
      :visible="modalVisiblity"
      :width="500"
      @close="onClose"
    >
        <a-row :gutter="[8,8]">
            <a-col :span="24">
                <a-form-item label="Name">
                    <a-input v-model="name" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Date Establish">
                    <a-date-picker v-model="date_establish" v-decorator="['date-picker']" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Contact Number">
                <a-input
                    v-decorator="[
                    'phone',
                    {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
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
                    <a-input v-model="address" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Description">
                    <a-textarea v-model="description" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-button type="primary" class="w-100" @click="save">Save</a-button>
            </a-col>
            <a-col :span="12">
                <a-button class="w-100" @click="cancel">Cancel</a-button>
            </a-col>
        </a-row>
    </a-drawer>
</template>
<script>
    import { mapGetters, mapMutations } from "vuex";
    import clinics_types from '@/modules/store/clinics/type.js'

    export default {
        name: 'ClinicModal',
        data() {
            return {
                selected_prefix_number: '+63'
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
                        value: newValue.format("MM-DD-YYYY")
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
            modalVisiblity() {
                return this.getModalVisibility
            },
        },
        methods: {
            ...mapMutations({
                setModalVisibility: clinics_types.SET_MODAL_VISIBILITY,
                setSingleModalField: clinics_types.SET_MODAL_FIELD_SINGLE_VALUE
            }),
            save(){
                this.setModalVisibility(false);
            },
            cancel(){
                this.setModalVisibility(false);
            },
            onClose() {
                this.setModalVisibility(false);
            },
            onChange(e) {
                this.placement = e.target.value;
            },
        }
    }
</script>
<style scoped>
</style>