<template>
    <a-drawer
      title="Filter Appointment"
      placement="right"
      :closable="true"
      :visible="is_show_modal"
      :width="500"
      @close="onModalClosed"
    >
        <a-form :form="form">
            <a-row :gutter="[8,8]">
                <a-col :span="24">
                    <a-form-item label="Filter date">
                        <a-range-picker v-model="form_fields.target_date">
                            <a-icon slot="suffixIcon" type="calendar" />
                        </a-range-picker>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="Status">
                        <a-select v-model="form_fields.status">
                            <a-select-option value="">
                                Choose status
                            </a-select-option>
                            <a-select-option value="0">
                                Created
                            </a-select-option>
                            <a-select-option value="1">
                                Success
                            </a-select-option>
                            <a-select-option value="2">
                                Cancelled
                            </a-select-option>
                            <a-select-option value="3">
                                Rescheduled
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-button type="primary" class="w-100" @click="filter">Filter</a-button>
                </a-col>
                <a-col :span="12">
                    <a-button class="w-100" @click="clear">Clear</a-button>
                </a-col>
            </a-row>
        </a-form>
    </a-drawer>
</template>
<script>

export default {
    name: 'FilterAppointmentModal',
    props: [
        'is_show_modal',
        'on_modal_closed',
        'on_filter'
    ],
    data() {
        return {
            form: this.$form.createForm(this, { name: 'dynamic_rule' }),
            form_fields: {
                target_date: [],
                status: null
            }
        };
    },
    methods: {
        onModalClosed(){
            this.on_modal_closed()
        },
        clear(){
            this.form_fields = {
                target_date: [],
                status: ''
            }
            this.form.resetFields()
            console.log('clear fields')
        },
        filter(){
            var filter = {
                status: this.form_fields.status,
            }

            if(this.form_fields.target_date.length == 2){
                filter.from = this.form_fields.target_date[0].format("YYYY-MM-DD")
                filter.to = this.form_fields.target_date[1].format("YYYY-MM-DD")
            }

            this.on_filter(filter)
            this.on_modal_closed()
        }
    },
}
</script>
<style scoped>
</style>