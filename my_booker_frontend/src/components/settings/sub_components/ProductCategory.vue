<template>
    <a-row>
        <a-col :span="24" class="flex-row justify-content-start">
            <p class="item-title">Categories</p>
        </a-col>
        <a-col :span="24" class="flex-row justify-content-start">
            <a-skeleton v-if="category_fetching_status" :paragraph="{ rows: 0 }" />
            <div v-else>
                <a-button v-for="item in categories" size="small" :value-id="item.id" :key="item.id" @click="viewCategory(item)">
                    {{ item.name }}
                </a-button>
            </div>
        </a-col>
        <a-col :span="24">
            <NewProductCategoryForm :on_save="newCategorySave"/>
        </a-col>
        <a-drawer
            title="Edit Category"
            placement="right"
            :closable="false"
            :visible="edit_modal_visibility"
            @close="onClose"
        >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        </a-drawer>
    </a-row>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { ref } from 'vue';
import NewProductCategoryForm from '@/components/sub_components/NewProductCategoryForm.vue'
import ProductCategoryHelper from '@/modules/helpers/db.product_category_helper.js'
import product_category_types from '@/modules/store/product-categories/types.js'

export default {
    name: 'ProductCategory',
    data() {
        return {
            edit_modal_visibility: false
        };
    },
    components: {
        NewProductCategoryForm
    },
    computed: {
        ...mapGetters({
            categories: product_category_types.GET_CATEGORIES,
            category_fetching_status: product_category_types.GET_FETCHING_CATEGORIES_STATUS,
        }),
    },
    methods: {
        showEditModal() {
            this.edit_modal_visibility = true;
        },
        onClose() {
            this.edit_modal_visibility = false;
        },
        viewCategory(category){
            this.showEditModal()
            console.log(category)
        },
        async newCategorySave(name){
            await new ProductCategoryHelper().create(
                name,
                process.env.VUE_APP_SAMPLE_CLINIC_ID
            )
        }
    },
    created(){
        this.$store.dispatch(product_category_types.FETCH_CATEGORIES)
    }
}
</script>
<style scoped>
</style>