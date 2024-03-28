import axios from 'axios'

class ProductCategoryHelper {

    async create(name, clinic_id){
        await axios.post(
            process.env.VUE_APP_ROOT_API+'product-categories',
            {
                name,
                clinic_id,
            }).then((response) => {})
    }

    async getCategories(clinic_id){
        var data = null

        await axios({
            method: "get",
            url: process.env.VUE_APP_ROOT_API+'product-categories/'+clinic_id,
        })
        .then(res => data = res.data)
        .catch(err => false);

        return data
    }
}

export default ProductCategoryHelper