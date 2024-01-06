<template>
    <div>
        <a-row>
            <a-col :span="24" v-if="on_change_comment_view_status">
                <a-button type="dashed" class="mt-4 mb-4" @click="on_change_comment_view_status(index, !comment_view_status)">
                    {{ comment_view_status == false? 'Show':'Hide' }} Comments
                </a-button>
            </a-col>
            <a-col :span="24" v-if="comment_view_status">
                <a-list
                    class="comment-list"
                    header="Comments"
                    item-layout="horizontal"
                    :data-source="comments"
                >
                    <a-list-item slot="renderItem" slot-scope="item">
                    <a-comment :author="item.user_name" avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
                        <p slot="content">
                            {{ item.comment }}
                        </p>
                        <a-tooltip slot="datetime">
                            <span>{{ getTimeline(item.created_at) }}</span>
                        </a-tooltip>
                    </a-comment>
                    </a-list-item>
                </a-list>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import moment from 'moment'

export default {
    name: 'Comments',
    props: [
        'comments',
        'on_change_comment_view_status',
        'comment_view_status',
        'index'
    ],
    data() {
        return {
        };
    },
    methods: {
        getTimeline(date){
            return moment(date).fromNow()
        }
    },
}
</script>
<style scoped>
</style>