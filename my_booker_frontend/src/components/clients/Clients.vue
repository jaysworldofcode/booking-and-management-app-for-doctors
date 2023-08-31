<template>
    <div class="container-clients">
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
                    <a-button type="primary" @click="showClientModal">
                        <a-icon type="plus-circle" /> Add New Client
                    </a-button>
                </div>
            </a-col>
        </a-row>
  <a-list
    class=""
    item-layout="horizontal"
    :data-source="getClients"
  >
    <a-list-item slot="renderItem" slot-scope="item" class="text-align-start">
      <a slot="actions">Edit</a>
      <a slot="actions">Delete</a>
      <a slot="actions">View</a>
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

export default {
    name: 'Clients',
    data() {
        return {
        };
    },
    components: {
        ClientModal
    },
    computed: {
        ...mapGetters({
            getClients: client_types.GET_CLIENTS,
            getClientsModalVisibility: client_types.GET_CLIENT_MODAL_VISIBILITY
        }),
    },
    methods: {
        ...mapMutations({
            setModalVisibility: client_types.SET_CLIENT_MODAL_VISIBILITY
        }),
        showClientModal(){
            this.setModalVisibility(true);
        }
    }
}
</script>
<style scoped>
.container-clients {
    background-color: white;
    height: 100% !important;
}
</style>