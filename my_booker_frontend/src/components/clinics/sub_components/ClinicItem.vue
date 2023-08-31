<template>
    <a-row class="container-clinic-item hover-darker" type="flex" align="middle">
        <a-col :span="18">
            <a-row type="flex" align="middle">
                <a-col :span="24" align="start">
                    <span class="item-title">{{ data.name }}</span>
                </a-col>
                <a-col :span="24" align="start">
                    <span class="item-title-description">{{ data.contact_number }}</span>
                </a-col>
                <a-col :span="24" align="start">
                    <span class="item-title-description">{{ data.address }}</span>
                </a-col>
            </a-row>
        </a-col>
        <a-col :span="6">
            <a-row class="mr-2" type="flex" justify="end">
                <a-col type="flex" justify="center">
                <a-space class="h-100 w-100">
                    <a-button type="dashed" shape="circle" icon="edit" @click="edit" />
                    <a-popconfirm
                        title="Are you sure delete this clinic?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="confirm_delete"
                    >
                        <a-button type="danger" shape="circle" icon="delete" />
                    </a-popconfirm>
                </a-space>
                </a-col>
            </a-row>
        </a-col>
    </a-row>
</template>
<script>
    import { mapGetters, mapMutations } from "vuex"
    import clinics_types from '@/modules/store/clinics/type.js'

    export default {
        name: 'ClinicItem',
        props: [
            'data'
        ],
        components: {
        },
        data() {
            return {
            };
        },
        computed: {
            ...mapGetters({
                getClinics: clinics_types.GET_CLINICS
            }),
        },
        methods: {
            ...mapMutations({
                setModalVisibility: clinics_types.SET_MODAL_VISIBILITY
            }),
            edit(){
                this.setModalVisibility(true);
            },
            confirm_delete(){
            }
        }
    }
</script>
<style scoped>
    .container-clinic-item {
        /* margin: 0.4rem; */
        padding: 1rem;
        min-height: 50px;
        background-color: white;
    }
</style>