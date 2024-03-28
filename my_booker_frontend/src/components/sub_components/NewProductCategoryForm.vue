<template>
    <a-row>
        <a-col :span="24" class="flex-row justify-content-start mt-1r">
            <p class="item-title">New Category</p>
        </a-col>
        <a-col :span="20">
            <a-input v-model="new_category_name" v-decorator="[
                'new_category_name',
                {
                    rules: [{ required: true, message: 'Please input your category name' }],
                },
            ]" />
        </a-col>
        <a-col :span="4">
            <a-button type="primary" :loading="is_loading" @click="onCategorySave">
                Save
            </a-button>
        </a-col>
    </a-row>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { ref } from 'vue';

export default {
    name: 'NewProductCategoryForm',
    props: ['on_save'],
    data() {
        return {
            new_category_name: '',
            is_loading: false
        };
    },
    components: {
    },
    computed: {
    },
    methods: {
        async onCategorySave(){
            this.is_loading = true
            try {
                await this.on_save(this.new_category_name)
                this.$notification['success']({
                    message: 'Success',
                    description:
                    'Product category '+this.new_category_name+' successfuly saved!',
                    placement: 'bottomRight'
                });
            } catch(err) {
                this.$notification['error']({
                    message: 'Error',
                    description:
                    'Encounter an issue while saving '+this.new_category_name+' category!',
                    placement: 'bottomRight'
                });
            }
            this.is_loading = false
        }
    },
}
</script>
<style scoped>
    .ant-tag {
        user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -o-user-select: none;
    }
</style>