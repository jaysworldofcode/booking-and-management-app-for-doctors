<template>
    <div class="page-container">
        <a-skeleton v-if="is_loading_client_details" avatar :paragraph="{ rows: 4 }" />
        <div v-else>
            <a-row>
                <a-col :span="6">
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
                                        <a-card>
                                        <a-statistic
                                            title="Attended"
                                            :value="11"
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
                                        <a-card>
                                        <a-statistic
                                            title="Missed"
                                            :value="9"
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
                                        <a-card>
                                        <a-statistic
                                            title="Cancelled"
                                            :value="9"
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
                        <a-col :span="24">
                            <div>
                                <a-tabs default-active-key="1" @change="selectedTab" size="large">
                                    <a-tab-pane key="1" tab="Appointments">
                                        Content of Tab Pane 1
                                    </a-tab-pane>
                                    <a-tab-pane key="2" tab="Invoice" force-render>
                                        Content of Tab Pane 2
                                    </a-tab-pane>
                                </a-tabs>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import client_types from '@/modules/store/clients/types.js';
import FieldItemDetails from '@/components/sub_components/FieldItemDetails.vue';

export default {
    name: 'ClientDetails',
    data() {
        return {
        };
    },
    components: {
        FieldItemDetails
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
        },
        selectedTab(key){
            console.log(key);
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