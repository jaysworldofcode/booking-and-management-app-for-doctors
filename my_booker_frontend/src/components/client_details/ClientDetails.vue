<template>
    <div class="page-container">
        <a-back-top />
        <a-skeleton v-if="is_loading_client_details" avatar :paragraph="{ rows: 4 }" />
        <div v-else>
            <a-row>
                <a-col :span="6">
                    <a-row id="client_details">
                        <a-col :span="24">
                            <a-avatar :size="100">{{ Array.from(client_details.name)[0].toUpperCase() }}</a-avatar>
                        </a-col>
                        <a-col :span="24" class="mt-4">
                            <a-tag color="green">
                                Active
                            </a-tag>
                        </a-col>
                        <a-col :span="24" class="mt-4">
                            <span class="client-name"> {{ client_details.name }}</span>
                        </a-col>
                        <a-col :span="24" class="mt-4">
                            <a-button type="primary" @click="showNewAppointmentModal">
                                Add New Appointment
                            </a-button>
                        </a-col>
                        <a-col :span="24" class="mt-4">
                            <a-button type="danger">
                                Set as Inactive
                            </a-button>
                        </a-col>
                        <a-col :span="24" class="mt-4">
                            <FieldItemDetails title="Contact Number" :data="client_details.contact_number" class="mt-4" />
                            <FieldItemDetails title="Email" :data="client_details.email" class="mt-4" />
                            <FieldItemDetails title="Birthdate" :data="client_details.birthdate" class="mt-4" />
                            <FieldItemDetails title="Address" :data="client_details.address" class="mt-4" />
                            <FieldItemDetails title="Gender" :data="client_details.gender" class="mt-4" />
                            <FieldItemDetails title="Date Registered" :data="client_details.created_at" class="mt-4" />
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="18">
                    <a-row>
                        <a-col :span="24">
                            <div style="background: #ECECEC; padding: 30px">
                                <a-row :gutter="16">
                                    <a-col :span="8">
                                        <a-card @click="appointment_count_click(1)">
                                            <a-statistic
                                                title="Attended"
                                                :value="client_appointments_count.success"
                                                :value-style="{ color: '#3f8600' }"
                                                style="margin-right: 50px"
                                            >
                                                <template #prefix>
                                                <a-icon type="check-circle" />
                                                </template>
                                            </a-statistic>
                                        </a-card>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-card @click="appointment_count_click(3)">
                                            <a-statistic
                                                title="Rescheduled"
                                                :value="client_appointments_count.rescheduled"
                                                class="demo-class"
                                                :value-style="{ color: '#cf1322' }"
                                            >
                                                <template #prefix>
                                                <a-icon type="warning" />
                                                </template>
                                            </a-statistic>
                                        </a-card>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-card @click="appointment_count_click(2)">
                                            <a-statistic
                                                title="Cancelled"
                                                :value="client_appointments_count.cancelled"
                                                class="demo-class"
                                                :value-style="{ color: '#cf1322' }"
                                            >
                                                <template #prefix>
                                                <a-icon type="warning" />
                                                </template>
                                            </a-statistic>
                                        </a-card>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-col>
                        <a-col v-if="is_view_appointment_details" :span="24">
                            <a-page-header
                                title="View Appointment Details"
                                @back="() => is_view_appointment_details = false"
                            />
                                <a-row>
                                        <a-col :span="24" v-if="view_appointment.status == 1">
                                            <a-alert
                                                message="Success"
                                                :description="'This appointment is mark as success '+getTimeline(view_appointment.updated_at)"
                                                type="success"
                                                show-icon
                                            />
                                        </a-col>
                                        <a-col :span="24" v-if="view_appointment.status == 3">
                                            <a-alert
                                                message="Rescheduled"
                                                :description="'This appointment is mark as resceduled '+getTimeline(view_appointment.updated_at)"
                                                type="warning"
                                                show-icon
                                            />
                                        </a-col>
                                        <a-col :span="24" v-if="view_appointment.status == 2">
                                            <a-alert
                                                message="Cancelled"
                                                :description="'This appointment is mark as cancelled '+getTimeline(view_appointment.updated_at)"
                                                type="error"
                                                show-icon
                                            />
                                        </a-col>
                                        <a-col :span="24" v-if="view_appointment.status == 0">
                                        <div class="appointment-action-button">
                                            <a-tooltip placement="topLeft" :loading="is_appointment_today_status_updating" @click="updateStatusOnViewAppointment(view_appointment.id, 1)" title="Mark as attended">
                                                <a-button type="primary" shape="circle" icon="check" />
                                            </a-tooltip>
                                            <a-tooltip placement="topLeft" :loading="is_appointment_today_status_updating" @click="updateStatusOnViewAppointment(view_appointment.id, 3)" title="Mark as missed">
                                                <a-button type="dashed" shape="circle" icon="exclamation" />
                                            </a-tooltip>
                                            <a-tooltip placement="topLeft" :loading="is_appointment_today_status_updating" @click="updateStatusOnViewAppointment(view_appointment.id, 2)" title="Mark as cancelled">
                                                <a-button type="danger" shape="circle" icon="close" />
                                            </a-tooltip>
                                        </div>
                                    </a-col>
                                    <a-col :span="24">
                                        <FieldItemDetails :is_remove_border="true" title="Appointment Title" :data="view_appointment.title" />
                                    </a-col>
                                    <a-col :span="24">
                                        <FieldItemDetails :is_remove_border="true" title="Appointment Description" :data="view_appointment.description" />
                                    </a-col>
                                    <a-col v-if="is_comment_for_today_loading == false" :span="24">
                                        <Comments
                                            :comments="view_appointment.appointments_comments"
                                            :comment_view_status="view_appointment.is_show_comments"
                                            :on_change_comment_view_status="isViewAppointmentStatusComment"/>
                                    </a-col>
                                    <a-col v-else :span="24">
                                        <a-skeleton avatar :paragraph="{ rows: 1 }" />
                                        <a-skeleton avatar :paragraph="{ rows: 1 }" />
                                    </a-col>
                                    <a-col :span="24">
                                        <NewComment :appointment_id="view_appointment.id" :onCommentSubmit="onCommentSubmit" :index="view_appointment.index"/>
                                    </a-col>
                                </a-row>
                        </a-col>
                        <a-col v-else :span="24">
                            <div>
                                <a-tabs default-active-key="1" v-model="tab_active_key" @change="selectedTab" size="large">
                                    <a-tab-pane key="1" tab="Today">
                                        <a-row v-for="(item, index) in appointment_today" v-bind:key="index">
                                            <a-col :span="24">
                                                <a-divider orientation="left" class="color-scheme-3 font-weight-bold">
                                                    <a-icon type="folder-open" class="mr-4" /><span>{{ 'Appointment #'+(index+1) }}</span>
                                                </a-divider>
                                            </a-col>
                                            <a-col :span="24" v-if="item.status == 1">
                                                <a-alert
                                                    message="Success"
                                                    :description="'This appointment is mark as success '+getTimeline(item.updated_at)"
                                                    type="success"
                                                    show-icon
                                                />
                                            </a-col>
                                            <a-col :span="24" v-if="item.status == 3">
                                                <a-alert
                                                    message="Rescheduled"
                                                    :description="'This appointment is mark as resceduled '+getTimeline(item.updated_at)"
                                                    type="warning"
                                                    show-icon
                                                />
                                            </a-col>
                                            <a-col :span="24" v-if="item.status == 2">
                                                <a-alert
                                                    message="Cancelled"
                                                    :description="'This appointment is mark as cancelled '+getTimeline(item.updated_at)"
                                                    type="error"
                                                    show-icon
                                                />
                                            </a-col>
                                            <a-col :span="24" v-if="item.status == 0">
                                                <div class="appointment-action-button">
                                                    <a-tooltip placement="topLeft" :loading="is_appointment_today_status_updating" @click="updateStatus(item.id, 1)" title="Mark as attended">
                                                        <a-button type="primary" shape="circle" icon="check" />
                                                    </a-tooltip>
                                                    <a-tooltip placement="topLeft" :loading="is_appointment_today_status_updating" @click="updateStatus(item.id, 3)" title="Mark as missed">
                                                        <a-button type="dashed" shape="circle" icon="exclamation" />
                                                    </a-tooltip>
                                                    <a-tooltip placement="topLeft" :loading="is_appointment_today_status_updating" @click="updateStatus(item.id, 2)" title="Mark as cancelled">
                                                        <a-button type="danger" shape="circle" icon="close" />
                                                    </a-tooltip>
                                                </div>
                                            </a-col>
                                            <a-col :span="24">
                                                <FieldItemDetails :is_remove_border="true" title="Appointment Title" :data="item.title" />
                                            </a-col>
                                            <a-col :span="24">
                                                <FieldItemDetails :is_remove_border="true" title="Appointment Description" :data="item.description" />
                                            </a-col>
                                            <a-col v-if="is_comment_for_today_loading == false" :span="24">
                                                <Comments
                                                    :comments="item.appointments_comments"
                                                    :comment_view_status="item.is_show_comments"
                                                    :index="index"
                                                    :on_change_comment_view_status="changeAppointmentTodayViewStatusComment"/>
                                                    
                                            </a-col>
                                            <a-col v-else :span="24">
                                                <a-skeleton avatar :paragraph="{ rows: 1 }" />
                                                <a-skeleton avatar :paragraph="{ rows: 1 }" />
                                            </a-col>
                                            <a-col :span="24">
                                                <NewComment :appointment_id="item.id" :onCommentSubmit="onCommentSubmitToday" :index="index"/>
                                            </a-col>
                                        </a-row>
                                    </a-tab-pane>
                                    <a-tab-pane key="2" tab="Appointments">
                                        <a-row>
                                            <a-col :span="24">
                                                <AppointmentsList
                                                    :appointments_list="appointments"
                                                    :is_fetching_appointments="is_fetching_appointments"
                                                    :onFilterAppointments="filterAppointments"
                                                    :on_view_appointment_details="viewAppointment"
                                                />
                                            </a-col>
                                        </a-row>
                                    </a-tab-pane>
                                    <a-tab-pane key="3" tab="Invoice" force-render>
                                        Content of Tab Pane 2
                                    </a-tab-pane>
                                </a-tabs>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
        <NewAppointmentModal />
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
import client_types from '@/modules/store/clients/types.js'
import appointment_types from '@/modules/store/appointment/type.js'
import FieldItemDetails from '@/components/sub_components/FieldItemDetails.vue'
import AppointmentsList from '@/components/sub_components/AppointmentsList.vue'
import NewComment from '@/components/sub_components/NewComment.vue'
import Comments from '@/components/sub_components/Comments.vue'
import NewAppointmentModal from "@/components/schedule/sub_components/NewAppointmentModal.vue"
import AppointmentsHelper from '@/modules/helpers/db.appointments_helper.js'
import lottie_loader_options from '@/modules/functions/lottie_loader_option.js'
import moment from 'moment'

export default {
    name: 'ClientDetails',
    data() {
        return {
            is_comment_for_today_loading: false,
            is_fetching_appointments: false,
            is_view_appointment_details: false,
            view_appointment: {},
            current_appointments_filter: {},
            is_appointment_today_status_updating: false,
            tab_active_key: '1'
        };
    },
    components: {
        FieldItemDetails,
        NewComment,
        NewAppointmentModal,
        Comments,
        AppointmentsList,
    },
    computed: {
        ...mapGetters({
            is_loading_client_details: client_types.GET_FETCHING_CLIENT_DETAILS_STATUS,
            client_details: client_types.GET_VIEW_CLIENT_DETAILS,
            appointment_today: client_types.GET_CLIENT_APPOINTMENT_TODAY,
            appointments: client_types.GET_APPOINTMENTS,
            client_appointments_count: client_types.GET_CLIENT_APPOINTMENTS_COUNT
        }),
    },
    methods: {
        ...mapMutations({
            setNewAppointmentModalVisibility: appointment_types.SET_NEW_SCHEDULE_MODAL_VISIBILITY,
            setAppointmentTodayComment: client_types.SET_APPOINTMENTS_TODAY_COMMENT,
            setAppointments: client_types.SET_APPOINTMENTS,
            setAppointmentTodayCommentHideStatus: client_types.SET_APPOINTMENTS_TODAY_COMMENT_HIDE_STATUS,
            setAppointmentsCommentHideStatus: client_types.SET_APPOINTMENTS_COMMENT_HIDE_STATUS
        }),
        getLottieLoaderOptions(){
            return lottie_loader_options
        },
        showNewAppointmentModal(){
            this.setNewAppointmentModalVisibility(true);
        },
        getClientDetails(id){
            this.$store.dispatch(client_types.FETCH_CLIENT_DETAILS, id)
        },
        selectedTab(key){
            this.filterAppointments({})
        },
        async onCommentSubmitToday(comment, appointments_id, index){
            this.is_comment_for_today_loading = true;
            await new AppointmentsHelper().createAppointmentComment(
                [],
                comment,
                appointments_id,
                process.env.VUE_APP_SAMPLE_USER_ID
            )

            const comments = await new AppointmentsHelper().getAppointmentComment(appointments_id)
            this.setAppointmentTodayComment({
                index,
                value: comments
            })
            this.is_comment_for_today_loading = false
        },
        async onCommentSubmit(comment, appointments_id, index){
            this.is_comment_for_today_loading = true;
            await new AppointmentsHelper().createAppointmentComment(
                [],
                comment,
                appointments_id,
                process.env.VUE_APP_SAMPLE_USER_ID
            )

            const comments = await new AppointmentsHelper().getAppointmentComment(appointments_id)
            this.view_appointment.appointments_comments = comments

            this.is_comment_for_today_loading = false
        },
        async filterAppointments(filter){
            this.is_fetching_appointments = true
            filter.client_id = this.$route.query.i

            var appointments = await new AppointmentsHelper().filterAppointments(filter)
            appointments.data = appointments.data.map((element, index) =>  {
                return {"is_show_view_modal": false, "is_show_comments": false, ...element}
            })
            this.setAppointments(appointments.data)
            this.is_fetching_appointments = false
            this.current_appointments_filter = filter
        },
        viewAppointment(data, index){
            this.is_view_appointment_details = true
            data.index = index
            this.view_appointment = data
            this.view_appointment.is_show_comments = false
        },
        async updateStatus(appointment_id, status){
            this.is_appointment_today_status_updating = true

            await new AppointmentsHelper().updateStatus(
                appointment_id,
                status
            ).then((response) => {
            })

            await this.getClientDetails(this.$route.query.i)
            await this.filterAppointments(this.current_appointments_filter)

            this.is_appointment_today_status_updating = false
            this.$notification['success']({
                message: 'Success',
                description:
                    'Status updated',
            });
        },
        async updateStatusOnViewAppointment(appointment_id, status){
            this.is_appointment_today_status_updating = true

            await new AppointmentsHelper().updateStatus(
                appointment_id,
                status
            ).then((response) => {
            })

            await this.getClientDetails(this.$route.query.i)
            await this.filterAppointments(this.current_appointments_filter)
            this.view_appointment.status = status

            this.is_appointment_today_status_updating = false
            this.$notification['success']({
                message: 'Success',
                description:
                    'Status updated',
            });
        },
        getTimeline(date){
            return moment(date).fromNow()
        },
        appointment_count_click(status){
            this.filterAppointments({
                status,
            })

            this.tab_active_key = '2'
        },
        changeAppointmentTodayViewStatusComment(index, status){
            this.setAppointmentTodayCommentHideStatus({
                index,
                value: status
            })
        },
        isViewAppointmentStatusComment(index, status){
            this.view_appointment.is_show_comments = status
        }
    },
    created(){
        this.getClientDetails(this.$route.query.i)
        this.filterAppointments({})
    }
}
</script>
<style scoped>
    .client-name {
        font-weight: bold;
        font-size: 20px;
        /* margin-top: 10px; */
    }

    #client_details {
        /* border: 1px solid black;
        border-radius: 20px; */
        padding: 20px;
    }
</style>