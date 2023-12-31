import ClientsHelper from '@/modules/helpers/db.clients_helper.js'

export default {
    namespaced: true,
    state: {
        clients: [],
        clients_modal_visibility: false,
        client_form_fields: {
            name: null,
            contact_number: null,
            birthdate: null,
            email: null,
            address: null,
            gender: 'male',
        },
        is_fetching_clients: false
    },
    getters: {
        GET_CLIENTS: state => state.clients,
        GET_CLIENT_MODAL_VISIBILITY: state => state.clients_modal_visibility,
        GET_CLIENT_FORM_FIELDS: state => state.client_form_fields,
        GET_FETCHING_CLIENTS_STATUS: state => state.is_fetching_clients
    },
    actions: {
        async FETCH_CLIENTS({commit, state}){
            state.is_fetching_clients = true
            const response = await new ClientsHelper().getClients(1)
            state.clients = response.data
            state.is_fetching_clients = false
        },
        async FETCH_FILTERED_CLIENTS({commit, state}, filter){
            state.is_fetching_clients = true
            const response = await new ClientsHelper().searchClient(filter)
            state.clients = response.data
            state.is_fetching_clients = false
        },
        CLEAR_FORM_FIELDS({commit, state}){
            state.client_form_fields = {
                name: null,
                contact_number: null,
                birthdate: null,
                email: null,
                address: null,
                gender: 'male',
            }
        }
    },
    mutations: {
        SET_CLIENT_MODAL_VISIBILITY(state, status) {
            state.clients_modal_visibility = status;
        },
        SET_MODAL_FIELD_SINGLE_VALUE(state, data) {
            state.client_form_fields[data.key] = data.value
        },
    }
}