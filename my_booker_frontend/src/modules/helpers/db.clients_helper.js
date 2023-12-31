import axios from 'axios'

class ClientsHelper {
    async createClient(clinic_id, name, contact_number, birthdate, email, address, gender){
        await axios.post(
            process.env.VUE_APP_ROOT_API+'clients',
            {
                clinic_id,
                name,
                contact_number,
                birthdate,
                email,
                address,
                gender
            }).then((response) => {})
    }

    async getClients(clinic_id){
        var data = null

        await axios({
            method: "get",
            url: process.env.VUE_APP_ROOT_API+'clinics/get_clients/'+clinic_id,
        })
        .then(res => data = res.data)
        .catch(err => false);

        return data
    }

    async deleteClient(client_id){
        await axios({
            method: "delete",
            url: process.env.VUE_APP_ROOT_API+'clients/'+client_id,
        })
        .catch(err => false);
    }

    async searchClient(filter){
        var data = null

        await axios({
            method: "get",
            url: process.env.VUE_APP_ROOT_API+'clients/filter?'+(new URLSearchParams(filter).toString()),
        })
        .then(res => data = res.data)
        .catch(err => false);

        return data
    }
}

export default ClientsHelper