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
        <a-calendar
            v-model="data"
            @PanelChange="PanelChangeHandle"
            @select="selectHandle"
            @change="changeHandle"
        >
            <template slot="dateCellRender" slot-scope="value">
                <ul class="events">
                    <li v-for="item in getListData(value)" :key="item.content">
                        <a-badge :status="item.type" :text="item.content" />
                    </li>
                </ul>
            </template>
            <template slot="monthCellRender" slot-scope="value">
                <div v-if="getMonthData(value)" class="notes-month">
                    <section>{{getMonthData(value)}}</section>
                    <span>Backlog number</span>
                </div>
            </template>
        </a-calendar>
        <ViewScheduleModal />
        <NewAppointmentModal />
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { ref } from 'vue';
import appointment_types from '@/modules/store/appointment/type.js';
import ViewScheduleModal from '@/components/schedule/sub_components/ViewScheduleModal.vue';
import NewAppointmentModal from "@/components/schedule/sub_components/NewAppointmentModal.vue";

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
            data: ref()
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
            let listData;
            switch (value.date()) {
                case 8:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                ]; break;
                case 10:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                    { type: 'error', content: 'This is error event.' },
                ]; break;
                case 15:
                listData = [
                    { type: 'warning', content: 'This is warning event' },
                    { type: 'success', content: 'This is very long usual event。。....' },
                    { type: 'error', content: 'This is error event 1.' },
                    { type: 'error', content: 'This is error event 2.' },
                    { type: 'error', content: 'This is error event 3.' },
                    { type: 'error', content: 'This is error event 4.' },
                ]; break;
                default:
            }
            return listData || [];
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
            this.setViewScheduleModalVisibility(true);
        },
        changeHandle(date){
            console.log("change");
        },
    }
}
</script>
<style scoped>
.container-schedule {
    background-color: white;
    height: 100% !important;
}
</style>