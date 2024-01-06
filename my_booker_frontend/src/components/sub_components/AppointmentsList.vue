<template>
    <div>
        <a-row>
            <a-col :span="24">
                <div class="action-button-appointments-tab-header">
                    <a-button type="dashed" icon="appstore" @click="showFilterModal">
                        Filter
                    </a-button>
                </div>
            </a-col>
            <a-col :span="24">
                <a-list
                    class="demo-loadmore-list"
                    :loading="is_fetching_appointments"
                    item-layout="horizontal"
                    :data-source="appointments_list"
                >
                    <a-list-item slot="renderItem" slot-scope="item, index" class="text-align-start">
                        <a-list-item-meta
                            class="text-align-start"
                            :description="formatDate(item.schedule_datetime)"
                        >
                            <span slot="title" href="https://www.antdv.com/">
                                <span>{{ item.title }}</span>
                                <a-tag :color="getStatusTypesConfig(item.status).color" class="ml-5 mr-5">
                                    {{ getStatusTypesConfig(item.status).name }}
                                </a-tag>
                                <span>
                                    <a-icon type="message" />
                                    {{ item.appointments_comments.length+' comments' }}
                                </span>
                            </span>
                            <a-avatar
                                slot="avatar"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </a-list-item-meta>
                        <a-tooltip placement="topLeft" title="View Appointment">
                            <a-button type="dashed" shape="circle" icon="eye" @click="viewAppointment(item, index)" />
                        </a-tooltip>
                    </a-list-item>
                </a-list>
            </a-col>
        </a-row>
        <FilterAppointmentModal :on_modal_closed="modalClosed" :is_show_modal="is_show_filter_modal" :on_filter="onFilterAppointments"/>
    </div>
</template>
<script>
import moment from 'moment'
import FilterAppointmentModal from '@/components/sub_components/FilterAppointmentModal.vue'
import StatusTypesConfig from '@/constants/status_types.js'

export default {
    name: 'AppointmentsList',
    props: [
        'appointments_list',
        'is_fetching_appointments',
        'onFilterAppointments',
        'FilterAppointmentModal',
        'on_view_appointment_details'
    ],
    components: {
        FilterAppointmentModal,
    },
    data() {
        return {
            is_show_filter_modal: false,
            is_show_modal_details: false,
            view_appointment: {}
        };
    },
    methods: {
        formatDate(date){
            return moment(date).format('DD-MM-YYYY HH:MM')
        },
        showFilterModal(){
            this.is_show_filter_modal = true
        },
        modalClosed(){
            this.is_show_filter_modal = false
        },
        viewAppointment(data, index){
            this.on_view_appointment_details(data, index)
        },
        getStatusTypesConfig(status){
            return StatusTypesConfig(status)
        }
    },
}
</script>
<style scoped>

.action-button-appointments-tab-header {
    display: flex;
    justify-content: flex-end;
}
</style>