<template>
    <div class="container-clients">
        <a-row type="flex" justify="space-between">
            <a-col :span="4" type="flex" justify="end">
                <a-form-item>
                    <a-input placeholder="Search" v-model="search_client" @input="onSearchClient">
                        <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
            </a-col>
            <a-col :span="4" type="flex" justify="end">
                <div class="flex-row justify-content-end align-items-center">
                    <a-button type="primary" @click="showClientModal">
                        <a-icon type="plus-circle" /> Add New Clinic
                    </a-button>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="is_fetching_clients">
            <a-skeleton active />
        </a-row>
        <a-list v-else
            class=""
            item-layout="horizontal"
            :data-source="getClients"
        >
            <a-list-item slot="renderItem" slot-scope="item" class="text-align-start">
                <a-button slot="actions">
                    Edit
                </a-button>
                <a-button slot="actions" type="danger" @click="deleteClient(item.id)">
                    Delete
                </a-button>
                <a-button slot="actions" type="dashed">
                    View Client
                </a-button>
            <a-list-item-meta
                class="text-align-start"
                :description="item.address"
            >
                <a slot="title" href="https://www.antdv.com/">{{ item.name }}</a>
                <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
            </a-list-item-meta>
            </a-list-item>
        </a-list>
        <ClientModal />
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import client_types from '@/modules/store/clients/types.js';
import ClientModal from "@/components/clients/sub_components/ClientModal.vue";
import ClientsHelper from '@/modules/helpers/db.clients_helper.js'

export default {
    name: 'Clients',
    data() {
        return {
            search_client: null
        };
    },
    components: {
        ClientModal
    },
    computed: {
        ...mapGetters({
            getClients: client_types.GET_CLIENTS,
            getClientsModalVisibility: client_types.GET_CLIENT_MODAL_VISIBILITY,
            is_fetching_clients: client_types.GET_FETCHING_CLIENTS_STATUS
        }),
    },
    methods: {
        ...mapMutations({
            setModalVisibility: client_types.SET_CLIENT_MODAL_VISIBILITY
        }),
        showClientModal(){
            this.setModalVisibility(true);
        },
        deleteClient(id){
            this.$confirm({
                title: 'Are you sure delete this client?',
                content: 'Deleting this client cannot be revert',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                    this.onDeleteClientOk(id)
                },
            });
        },
        async onDeleteClientOk(id){
            await new ClientsHelper().deleteClient(id)
            this.$store.dispatch(client_types.FETCH_CLIENTS)
        },
        onSearchClient(){
            this.$store.dispatch(client_types.FETCH_FILTERED_CLIENTS, {
                name: this.search_client
            })
        }
    },
    created(){
        this.$store.dispatch(client_types.FETCH_CLIENTS)
    }
}
</script>
<style scoped>
.container-clients {
    background-color: white;
    height: 100% !important;
}
</style>