<template>
    <div id="container-clinics">
        <a-row type="flex" justify="space-between">
            <a-col :span="4" type="flex" justify="end">
                <a-form-item>
                    <a-input placeholder="Search">
                        <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
            </a-col>
            <a-col :span="4" type="flex" justify="end">
                <div class="flex-row justify-content-end align-items-center">
                    <a-button type="primary" @click="showModal">
                        <a-icon type="plus-circle" /> Add New Clinic
                    </a-button>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="is_fetching_clinics">
            <a-skeleton active />
        </a-row>
        <a-row v-else class="mt-1r">
            <a-list
                class="clinics-items-list"
                item-layout="horizontal"
                :data-source="getClinics"
            >
                <a-list-item slot="renderItem" slot-scope="item">
                        <a-button slot="actions">
                            Edit
                        </a-button>
                        <a-button slot="actions" type="danger">
                            Delete
                        </a-button>
                    <a-list-item-meta
                        :description="item.description"
                    >
                        <a slot="title" href="https://www.antdv.com/" class="font-weight-bold">{{ item.name }}</a>
                        <a-avatar
                        slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </a-row>
        <ClinicModal :title="'Create New Clinic'" />
    </div>
</template>
<script>
    import ClinicModal from '@/components/clinics/sub_components/ClinicModal.vue'
    import clinics_types from '@/modules/store/clinics/type.js'
    import { mapGetters, mapMutations } from "vuex"

    export default {
        name: 'Clinics',
        components: {
            ClinicModal,
        },
        data() {
            return {
            };
        },
        computed: {
            ...mapGetters({
                getClinics: clinics_types.GET_CLINICS,
                is_fetching_clinics: clinics_types.GET_FETCHING_CLINICS_STATUS
            }),
        },
        methods: {
            ...mapMutations({
                setModalVisibility: clinics_types.SET_MODAL_VISIBILITY
            }),
            showModal() {
                this.setModalVisibility(true);
            },
        },
        created(){
            this.$store.dispatch(clinics_types.FETCH_CLINICS)
        }
    }
</script>
<style scoped>
    .clinics-items-list {
        text-align: left;
    }
</style>