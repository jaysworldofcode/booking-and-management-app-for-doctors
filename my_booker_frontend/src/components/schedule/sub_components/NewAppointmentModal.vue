<template>
    <a-drawer
      title="New Schedule"
      placement="right"
      :closable="true"
      :visible="getNewModalVisibility"
      :width="500"
      @close="onClose"
    >
        <a-form :form="form">
            <a-row :gutter="[8,8]">
                <a-col :span="24">
                    <a-form-item label="Title">
                        <a-input v-model="title" v-decorator="['title', { rules: [{ required: true, message: 'Please input your appointment title' }] }]" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Schedule" style="margin-bottom:0;">
                        <a-form-item :style="{ display: 'inline-block', width: '40%' }">
                            <a-date-picker v-model="schedule_date" v-decorator="['schedule_date', { rules: [{ required: true, message: 'Please input your appointment date' }] }]" />
                        </a-form-item>
                        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
                            -
                        </span>
                        <a-form-item :style="{ display: 'inline-block', width: '40%' }">
                            <a-time-picker v-model="schedule_time" use12-hours format="h:mm:ss A" v-decorator="['schedule_time', { rules: [{ required: true, message: 'Please input your appointment time' }] }]" />
                        </a-form-item>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Description">
                        <a-input type="textarea" v-model="description" v-decorator="['description']" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-button type="primary" class="w-100 mt-1r" :loading="is_loading" @click="save">Save</a-button>
                </a-col>
                <a-col :span="12">
                    <a-button class="w-100 mt-1r" :loading="is_loading" @click="cancel">Cancel</a-button>
                </a-col>
            </a-row>
        </a-form>
    </a-drawer>
</template>
<script>
    import { mapGetters, mapMutations } from "vuex"
    import appointment_types from '@/modules/store/appointment/type.js'
    import AppointmentsHelper from '@/modules/helpers/db.appointments_helper'

    export default {
        name: 'NewAppointmentModal',
        data() {
            return {
                form: this.$form.createForm(this, { name: 'dynamic_rule' }),
                is_loading: false
            }
        },
        computed: {
            ...mapGetters({
                getNewModalVisibility: appointment_types.GET_NEW_SCHEDULE_MODAL_VISIBILITY,
                getAppointmentFormFields: appointment_types.GET_MODAL_FIELD,
            }),
            title: {
                get() {
                    return this.getAppointmentFormFields.title
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'title',
                        value: newValue
                    })
                }
            },
            schedule_date: {
                get() {
                    return this.getAppointmentFormFields.schedule_date
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'schedule_date',
                        value: newValue.format("YYYY/MM/DD")
                    })
                }
            },
            schedule_time: {
                get() {
                    return this.getAppointmentFormFields.schedule_time
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'schedule_time',
                        value: newValue.format("HH:mm:ss")
                    })
                }
            },
            description: {
                get() {
                    return this.getAppointmentFormFields.description
                },
                set(newValue) {
                    this.setSingleModalField({
                        key: 'description',
                        value: newValue
                    })
                }
            },
        },
        methods: {
            ...mapMutations({
                setNewAppointmentModalVisibility: appointment_types.SET_NEW_SCHEDULE_MODAL_VISIBILITY,
                setSingleModalField: appointment_types.SET_MODAL_FIELD_SINGLE_VALUE
            }),
            onClose() {
                this.setNewAppointmentModalVisibility(false);
            },
            save(){
                this.form.validateFields(async err => {
                    if (!err) {
                        this.is_loading = true
                        await new AppointmentsHelper().createAppointment(
                            this.$route.query.i,
                            this.title,
                            this.schedule_date+' '+this.schedule_time,
                            process.env.VUE_APP_SAMPLE_USER_ID,
                            process.env.VUE_APP_SAMPLE_USER_ID,
                            this.description
                        );

                        this.resetFields()
                        this.setNewAppointmentModalVisibility(false);
                        this.is_loading = false
                    }
                });
            },
            resetFields(){
                this.form.resetFields()
                this.$store.dispatch(appointment_types.CLEAR_FORM_FIELDS)
            },
            cancel(){
                this.setNewAppointmentModalVisibility(false);
            },
        }
    }
</script>
<style scoped>
</style>