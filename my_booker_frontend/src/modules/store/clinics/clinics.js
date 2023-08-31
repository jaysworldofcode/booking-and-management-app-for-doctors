export default {
    namespaced: true,
    state: {
        modal_visibility: false,
        clinics: [
            {
                id: 1,
                name: 'Lorem Ipsum Clinic',
                date_establish: '12/12/2012',
                contact_number: '+639123456789',
                address: 'Dumaguete City, Negros Oriental, Philippines',
                description: 'Lorem ipsum is a dummy test'
            },
            {
                id: 2,
                name: 'Luke Halmon 2 Clinic',
                date_establish: '12/12/2012',
                contact_number: '+639123456789',
                address: 'Dumaguete City, Sibulan, Negros Oriental, Philippines',
                description: 'Another Lorem ipsum is a dummy test'
            },
        ],
        clinic_modal_field: {
            name: null,
            date_establish: null,
            contact_number: null,
            address: null
        }
    },
    getters: {
        GET_MODAL_VISIBILITY: state => state.modal_visibility,
        GET_CLINICS: state => state.clinics,
        GET_MODAL_FIELD: state => state.clinic_modal_field,
    },
    actions: {
    },
    mutations: {
        SET_MODAL_VISIBILITY(state, status) {
            state.modal_visibility = status;
        },
        SET_MODAL_FIELD_SINGLE_VALUE(state, data) {
            state.clinic_modal_field[data.key] = data.value
        },
    }
}