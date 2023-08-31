<template>
    <a-drawer
      :title="title"
      placement="right"
      :closable="false"
      :visible="getClientsModalVisibility"
      :width="500"
      @close="onClose"
    >
        <a-row :gutter="[8,8]">
            <a-col :span="24">
                <a-form-item label="Name">
                    <a-input v-model="name" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-button type="primary" class="w-100" @click="save">Save</a-button>
            </a-col>
            <a-col :span="12">
                <a-button class="w-100" @click="cancel">Cancel</a-button>
            </a-col>
        </a-row>
    </a-drawer>
</template>
<script>
    import { mapGetters, mapMutations } from "vuex";
    import client_types from '@/modules/store/clients/types.js'

    export default {
        name: 'ClientModal',
        data() {
            return {
                selected_prefix_number: '+63'
            }
        },
        props: [
            'title'
        ],
        computed: {
            ...mapGetters({
                getClients: client_types.GET_CLIENTS,
                getClientsModalVisibility: client_types.GET_CLIENT_MODAL_VISIBILITY,
                getClientsFormFields: client_types.GET_CLIENT_FORM_FIELDS,
            }),
            name: {
                get() {
                    return this.getClientsFormFields.name
                },
                set(newValue) {
                    // this.setSingleModalField({
                    //     key: 'name',
                    //     value: newValue
                    // })
                }
            },
            modalVisiblity() {
                return this.getModalVisibility
            },
        },
        methods: {
            ...mapMutations({
                setModalVisibility: client_types.SET_CLIENT_MODAL_VISIBILITY,
            }),
            save(){
                this.setModalVisibility(false);
            },
            cancel(){
                this.setModalVisibility(false);
            },
            onClose() {
                this.setModalVisibility(false);
            },
        }
    }
</script>
<style scoped>
</style>