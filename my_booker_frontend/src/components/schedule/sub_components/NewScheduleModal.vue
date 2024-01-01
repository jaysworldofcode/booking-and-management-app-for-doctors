<template>
    <a-drawer
      title="New Schedule"
      placement="right"
      :closable="true"
      :visible="getNewModalVisibility"
      :width="500"
      @close="onClose"
    >
        <a-row :gutter="[8,8]">
            <a-col :span="24">
                <a-form-item label="Title">
                    <a-input />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Schedule" style="margin-bottom:0;">
                    <a-form-item :style="{ display: 'inline-block', width: '40%' }">
                        <a-date-picker v-decorator="['date-picker']" />
                    </a-form-item>
                    <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
                        -
                    </span>
                    <a-form-item :style="{ display: 'inline-block', width: '40%' }">
                        <a-time-picker use12-hours format="h:mm:ss A" />
                    </a-form-item>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Description">
                    <a-input type="textarea" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-button type="primary" class="w-100 mt-1r" @click="save">Save</a-button>
            </a-col>
            <a-col :span="12">
                <a-button class="w-100 mt-1r" @click="cancel">Cancel</a-button>
            </a-col>
        </a-row>
    </a-drawer>
</template>
<script>
    import { mapGetters, mapMutations } from "vuex";
    import appointment_types from '@/modules/store/appointment/type.js';

    export default {
        name: 'NewScheduleModal',
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters({
                getNewModalVisibility: appointment_types.GET_NEW_SCHEDULE_MODAL_VISIBILITY,
            }),
        },
        methods: {
            ...mapMutations({
                setNewScheduleModalVisibility: appointment_types.SET_NEW_SCHEDULE_MODAL_VISIBILITY
            }),
            onClose() {
                this.setNewScheduleModalVisibility(false);
            },
            save(){
                this.setNewScheduleModalVisibility(false);
            },
            cancel(){
                this.setNewScheduleModalVisibility(false);
            },
        }
    }
</script>
<style scoped>
</style>