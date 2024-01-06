import ClinicsHelper from '@/modules/helpers/db.clinics_helper.js'

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
            address: null,
            email: null
        },
        is_fetching_clinics: true
    },
    getters: {
        GET_MODAL_VISIBILITY: state => state.modal_visibility,
        GET_CLINICS: state => state.clinics,
        GET_MODAL_FIELD: state => state.clinic_modal_field,
        GET_FETCHING_CLINICS_STATUS: state => state.is_fetching_clinics,
    },
    actions: {
        async FETCH_CLINICS({commit, state}){
            state.is_fetching_clinics = true
            const response = await new ClinicsHelper().getClinics(process.env.VUE_APP_SAMPLE_USER_ID)
            state.clinics = response.data
            state.is_fetching_clinics = false
        },
        CLEAR_FORM_FIELDS({commit, state}){
            state.client_form_fields = {
                name: null,
                date_establish: null,
                contact_number: null,
                address: null,
                email: null
            }
        }
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