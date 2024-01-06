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
        appointments_today: [],
        appointments: [],
        view_client_details: {},
        is_fetching_clients: false,
        is_fetching_client_details: false,
        appointments_count: {
            success: 0,
            cancelled: 0,
            rescheduled: 0
        }
    },
    getters: {
        GET_CLIENTS: state => state.clients,
        GET_CLIENT_APPOINTMENT_TODAY: state => state.appointments_today,
        GET_VIEW_CLIENT_DETAILS: state => state.view_client_details,
        GET_CLIENT_MODAL_VISIBILITY: state => state.clients_modal_visibility,
        GET_CLIENT_FORM_FIELDS: state => state.client_form_fields,
        GET_FETCHING_CLIENTS_STATUS: state => state.is_fetching_clients,
        GET_FETCHING_CLIENT_DETAILS_STATUS: state => state.is_fetching_client_details,
        GET_APPOINTMENTS: state => state.appointments,
        GET_CLIENT_APPOINTMENTS_COUNT: state => state.appointments_count
    },
    actions: {
        async FETCH_CLIENTS({commit, state}){
            state.is_fetching_clients = true
            const response = await new ClientsHelper().getClients(process.env.VUE_APP_SAMPLE_CLINIC_ID)
            state.clients = response.data
            state.is_fetching_clients = false
        },
        async FETCH_FILTERED_CLIENTS({commit, state}, filter){
            state.is_fetching_clients = true
            const response = await new ClientsHelper().searchClient(filter)
            state.clients = response.data
            state.is_fetching_clients = false
        },
        async FETCH_CLIENT_DETAILS({commit, state}, id){
            state.is_fetching_client_details = true
            const response = await new ClientsHelper().getClientData(id)
            response.appointments_today = response.appointments_today.map((element, index) =>  {
                return {"is_show_comments": false, ...element}
            })
            state.view_client_details = response.client
            state.appointments_today = response.appointments_today
            state.appointments_count = response.appointments_count
            state.is_fetching_client_details = false
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
        SET_APPOINTMENTS_TODAY_COMMENT(state, data){
            state.appointments_today[data.index].appointments_comments = data.value
        },
        SET_APPOINTMENTS_TODAY_COMMENT_HIDE_STATUS(state, data){
            state.appointments_today[data.index].is_show_comments = data.value
        },
        SET_APPOINTMENTS_COMMENT_HIDE_STATUS(state, data){
            state.appointments[data.index].is_show_comments = data.value
        },
        SET_APPOINTMENTS(state, data){
            state.appointments = data
        },
    }
}