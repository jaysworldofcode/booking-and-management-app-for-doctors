<template>
    <div class="page-container">
        <a-skeleton v-if="is_loading_client_details" avatar :paragraph="{ rows: 4 }" />
        <div v-else>
            <a-row>
                <a-col :span="8">
                    <a-row id="client_details">
                        <a-col :span="24">
                            <a-avatar :size="100">U</a-avatar>
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
                            <a-button type="primary">
                                Add New Schedule
                            </a-button>
                        </a-col>
                        <a-col :span="24" class="mt-4">
                            
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="16">
                    col-12
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import client_types from '@/modules/store/clients/types.js';

export default {
    name: 'ClientDetails',
    data() {
        return {
        };
    },
    components: {
    },
    computed: {
        ...mapGetters({
            is_loading_client_details: client_types.GET_FETCHING_CLIENT_DETAILS_STATUS,
            client_details: client_types.GET_VIEW_CLIENT_DETAILS,
        }),
    },
    methods: {
        getClientDetails(id){
            this.$store.dispatch(client_types.FETCH_CLIENT_DETAILS, id)
        }
    },
    created(){
        this.getClientDetails(this.$route.query.i)
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
        padding: 10px;
    }
</style>