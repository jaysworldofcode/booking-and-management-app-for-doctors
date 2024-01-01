<template>
    <a-drawer
      title="View Schedule"
      placement="right"
      :closable="true"
      :visible="getScheduleModalVisibility"
      :width="500"
      @close="onClose"
    >
        <a-list item-layout="horizontal" :data-source="getViewScheduleList">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta
                    :description="item.name"
                    :key="index"
                >
                    <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                        <a-avatar
                        slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </a-drawer>
</template>
<script>
    import { mapGetters, mapMutations } from "vuex";
    import appointment_types from '@/modules/store/appointment/type.js';

    export default {
        name: 'ViewScheduleModal',
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters({
                getViewScheduleList: appointment_types.GET_VIEW_SCHEDULE_LIST,
                getScheduleModalVisibility: appointment_types.GET_VIEW_SCHEDULE_MODAL_VISIBILITY,
            }),
        },
        methods: {
            ...mapMutations({
                setViewScheduleModalVisibility: appointment_types.SET_VIEW_SCHEDULE_MODAL_VISIBILITY
            }),
            onClose() {
                this.setViewScheduleModalVisibility(false);
            },
        }
    }
</script>
<style scoped>
</style>