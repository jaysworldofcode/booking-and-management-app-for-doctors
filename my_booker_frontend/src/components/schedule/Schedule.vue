<template>
    <div class="container-schedule">
        <a-row type="flex" justify="space-between" class="mb-1r">
            <a-col :span="4" type="flex" justify="end">
                <!-- <a-form-item>
                    <a-input placeholder="Search">
                        <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item> -->
            </a-col>
            <a-col :span="4" type="flex" justify="end">
                <div class="flex-row justify-content-end align-items-center">
                    <a-button type="primary" @click="showNewAppointmentModal">
                        <a-icon type="plus-circle" /> Add New Schedule
                    </a-button>
                </div>
            </a-col>
        </a-row>
        <a-spin v-if="is_fetching_appointments" />
        <a-calendar
            v-else
            v-model="data"
            @select="selectHandle"
            @change="changeHandle"
        >
            <template slot="dateCellRender" slot-scope="value">
                <ul class="events">
                    <li v-for="(item, index) in getListData(value)" :key="item.content">
                        <div v-if="index == 0">
                            <a-tag color="pink">
                                {{ getListData(value).length }}
                            </a-tag>
                            <a-badge :status="item.type" :text="item.content" />
                        </div>
                        <a-badge v-else :status="item.type" :text="item.content" />
                    </li>
                </ul>
            </template>
            <!-- <template slot="monthCellRender" slot-scope="value"> -->
                <!-- <div v-if="getMonthData(value)" class="notes-month">
                    <section>{{getMonthData(value)}}</section>
                    <span>Backlog number</span>
                </div> -->
            <!-- </template> -->
        </a-calendar>
        <ViewScheduleModal :appointments="view_schedules_data" />
        <NewAppointmentModal />
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { ref } from 'vue';
import appointment_types from '@/modules/store/appointment/type.js';
import ViewScheduleModal from '@/components/schedule/sub_components/ViewScheduleModal.vue';
import NewAppointmentModal from "@/components/schedule/sub_components/NewAppointmentModal.vue";
import AppointmentsHelper from '@/modules/helpers/db.appointments_helper.js'
import moment from 'moment'
import StatusTypesConfig from '@/constants/status_types.js'

export default {
    name: 'Schedule',
    data() {
        return {
            tag_item: [
                {
                    id: "tag1",
                    type: "blue",
                    content: "标签1",
                },
                {
                    id: "tag2",
                    type: "orange",
                    content: "标签2",
                },
            ],
            checkDate: [],
            dragged: null,
            draggedParent: null,
            data: ref(),
            calendar_content: {},
            is_fetching_appointments: false,
            selected_date: moment().startOf('month').format('YYYY-MM-DD'),
            view_schedules_data: [],
        };
    },
    components: {
        ViewScheduleModal,
        NewAppointmentModal,
    },
    computed: {
        ...mapGetters({
            getViewScheduleList: appointment_types.GET_VIEW_SCHEDULE_LIST,
        }),
    },
    methods: {
        ...mapMutations({
            setViewScheduleModalVisibility: appointment_types.SET_VIEW_SCHEDULE_MODAL_VISIBILITY,
            setNewAppointmentModalVisibility: appointment_types.SET_NEW_SCHEDULE_MODAL_VISIBILITY
        }),
        showNewAppointmentModal(){
            this.setNewAppointmentModalVisibility(true);
        },
        getListData(value) {
            if(value.format('YYYY-MM-DD') in this.calendar_content){
                return this.calendar_content[value.format('YYYY-MM-DD')]
            }

            return  [];
        },
        getMonthData(value) {
            if (value.month() === 8) {
                return 1394;
            }
        },
        PanelChangeHandle(date, mode){
            console.log("PanelChange");
        },
        selectHandle(date){
            console.log(date.clone().format('YYYY-MM-DD'))

            this.view_schedules_data = date.clone().format("YYYY-MM-DD") in this.calendar_content? this.calendar_content[date.clone().format("YYYY-MM-DD")]:[]
            console.log(this.view_schedules_data)
            this.setViewScheduleModalVisibility(true);
        },
        async changeHandle(date){
            const selected_mode = document.querySelector('.ant-radio-button-wrapper-checked').textContent.toLowerCase()
            
            if(selected_mode == 'month' && this.selected_date == date.clone().startOf('month').format('YYYY-MM-DD') && Object.keys(this.calendar_content).length != 0){
                return
            }

            this.is_fetching_appointments = true
            this.calendar_content = []

            var from = null
            var to = null


            if(selected_mode == 'month'){
                from = date.startOf('month').format("YYYY-MM-DD")
                to = date.endOf('month').format("YYYY-MM-DD")
            }else{
                from = date.startOf('year').format("YYYY-MM-DD")
                to = date.endOf('year').format("YYYY-MM-DD")
            }

            await this.getAppointments(from, to)
            this.is_fetching_appointments = false
        },
        async getAppointments(from, to){
            var filter = {
                from,
                to,
                clinic_id: process.env.VUE_APP_SAMPLE_CLINIC_ID,
                hide_comments: true
            }

            var appointments = await new AppointmentsHelper().filterAppointments(filter)

            for (var i = 0; i < appointments.data.length; i++) {
                let appointment = appointments.data[i];

                const status_config = StatusTypesConfig(appointment.status)
                appointment.status_name = status_config.name
                appointment.status_color = status_config.color
                appointment.type = 'success'
                appointment.content = appointment.title

                if(moment(appointment.schedule_datetime).format("YYYY-MM-DD") in this.calendar_content){
                    this.calendar_content[moment(appointment.schedule_datetime).format("YYYY-MM-DD")].push(appointment);
                }else{
                    this.calendar_content[moment(appointment.schedule_datetime).format("YYYY-MM-DD")] = [{
                        ...appointment
                    }]
                }
            }
        }
    },
    mounted(){
        this.changeHandle(moment())
    }
}
</script>
<style scoped>
.container-schedule {
    background-color: white;
    height: 100% !important;
}
ul {
  list-style: none !important;
}
</style>