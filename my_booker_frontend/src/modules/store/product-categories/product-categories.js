import ProductCategoryHelper from '@/modules/helpers/db.product_category_helper.js'

export default {
    namespaced: true,
    state: {
        product_categories: [],
        is_fetching_categories: true
    },
    getters: {
        GET_CATEGORIES: state => state.product_categories,
        GET_FETCHING_CATEGORIES_STATUS: state => state.is_fetching_categories
    },
    actions: {
        async FETCH_CATEGORIES({commit, state}){
            state.is_fetching_categories = true
            const response = await new ProductCategoryHelper().getCategories(process.env.VUE_APP_SAMPLE_CLINIC_ID)
            state.product_categories = response.data
            state.is_fetching_categories = false
        },
    },
    mutations: {
    }
}