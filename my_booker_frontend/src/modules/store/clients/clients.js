export default {
    namespaced: true,
    state: {
        clients: [
            {
                id: 1,
                name: 'John Doe',
                gender: 'Male',
                address: 'Poblacion, Sibulan, Dumaguete City, Negros Oriental',
                contact_number: '0999999999',
                birthday: '12/12/2024'
            },
            {
                id: 2,
                name: 'Jane Doe',
                gender: 'Female',
                address: 'Poblacion, Sibulan, Dumaguete City, Negros Oriental',
                contact_number: '0999999999',
                birthday: '12/12/2024'
            },
        ],
        clients_modal_visibility: false,
        client_form_fields: {
            name: null,
            gender: 'm',
            address: null,
            contact_number: null
        }
    },
    getters: {
        GET_CLIENTS: state => state.clients,
        GET_CLIENT_MODAL_VISIBILITY: state => state.clients_modal_visibility,
        GET_CLIENT_FORM_FIELDS: state => state.client_form_fields,
    },
    actions: {
    },
    mutations: {
        SET_CLIENT_MODAL_VISIBILITY(state, status) {
            state.clients_modal_visibility = status;
        },
    }
}