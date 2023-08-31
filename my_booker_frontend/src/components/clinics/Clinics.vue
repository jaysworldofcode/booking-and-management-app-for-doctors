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
        <a-row class="mt-1r">
            <a-list
                class="demo-loadmore-list"
                :loading="initLoading"
                item-layout="horizontal"
                :data-source="list"
            >
                <template #loadMore>
                <div
                    v-if="!initLoading && !loading"
                    :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                >
                    <a-button @click="onLoadMore">loading more</a-button>
                </div>
                </template>
                <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                    <a key="list-loadmore-edit">edit</a>
                    <a key="list-loadmore-more">more</a>
                    </template>
                    <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                    <a-list-item-meta
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    >
                        <template #title>
                            <a href="https://www.antdv.com/">{{ item.name.last }}</a>
                        </template>
                    </a-list-item-meta>
                    <div>content</div>
                    </a-skeleton>
                </a-list-item>
                </template>
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
                getClinics: clinics_types.GET_CLINICS
            }),
        },
        methods: {
            ...mapMutations({
                setModalVisibility: clinics_types.SET_MODAL_VISIBILITY
            }),
            showModal() {
                this.setModalVisibility(true);
            },
        }
    }
</script>
<style scoped>
    .demo-loadmore-list {
    min-height: 350px;
    }
</style>