import axios from 'axios'

class ClinicsHelper {
    async createClinic(name, email, date_established, contact_number, address, description){
        await axios.post(
            process.env.VUE_APP_ROOT_API+'clinics',
            {
                name,
                "owner_user_id": "1",
                email,
                date_established,
                contact_number,
                address,
                description: description,
                "clinic_settings": "1"
            }).then((response) => {})
    }

    async getClinics(owner_user_id){
        var data = null

        await axios({
            method: "get",
            url: process.env.VUE_APP_ROOT_API+'user_clinics/'+owner_user_id,
        })
        .then(res => data = res.data)
        .catch(err => false);

        return data
    }
}

export default ClinicsHelper