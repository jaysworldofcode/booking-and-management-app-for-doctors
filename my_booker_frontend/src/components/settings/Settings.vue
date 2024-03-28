<template>
    <div>
        <a-tabs
            default-active-key="1"
            tab-position="left"
            :style="{ height: '200px' }"
        >
            <a-tab-pane key="2">
                <span slot="tab">
                    <a-icon type="align-right" />
                    Product Categories
                </span>
                <ProductCategory />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import ProductCategory from '@/components/settings/sub_components/ProductCategory.vue'
import { ref } from 'vue';

export default {
    name: 'Settings',
    data() {
        return {
            categories: [
                {
                    id: 1,
                    name: 'shoes'
                },
                {
                    id: 2,
                    name: 'shirts'
                },
            ],
            new_category_name: ''
        };
    },
    components: {
        ProductCategory
    },
    computed: {
    },
    methods: {
        deleteCategory(e){
            e.preventDefault();
            console.log(e.target.parentElement.parentElement.getAttribute("value-id"))
        }
    },
}
</script>
<style scoped>
</style>