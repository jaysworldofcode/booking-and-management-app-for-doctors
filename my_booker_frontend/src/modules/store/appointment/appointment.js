export default {
    namespaced: true,
    state: {
        view_schedule_list: [
            {
                title: 'Brace',
                name: 'John Doe',
            },
            {
                title: 'Tooth extraction',
                name: 'Jane Doe'
            },
            {
                title: 'Tooth extraction',
                name: 'Jane Doe'
            },
            {
                title: 'Tooth extraction',
                name: 'Jane Doe'
            },
            {
                title: 'Tooth extraction',
                name: 'Jane Doe'
            },
            {
                title: 'Tooth extraction',
                name: 'Jane Doe'
            },
            {
                title: 'Tooth extraction',
                name: 'Jane Doe'
            },
        ],
        appointment_form_fields: {
            client_id: null,
            title: null,
            schedule_date: null,
            schedule_time: null,
            assignee: null,
            added_by: null,
            description: null
        },
        view_schedule_modal_visibility: false,
        new_schedule_modal_visibility: false
    },
    getters: {
        GET_VIEW_SCHEDULE_LIST: state => state.view_schedule_list,
        GET_VIEW_SCHEDULE_MODAL_VISIBILITY: state => state.view_schedule_modal_visibility,
        GET_NEW_SCHEDULE_MODAL_VISIBILITY: state => state.new_schedule_modal_visibility,
        GET_MODAL_FIELD: state => state.appointment_form_fields,
    },
    actions: {
        CLEAR_FORM_FIELDS({commit, state}){
            state.appointment_form_fields = {
                client_id: null,
                title: null,
                schedule_date: null,
                schedule_time: null,
                assignee: null,
                added_by: null,
                description: null
            }
        }
    },
    mutations: {
        SET_MODAL_FIELD_SINGLE_VALUE(state, data) {
            state.appointment_form_fields[data.key] = data.value
        },
        SET_VIEW_SCHEDULE_MODAL_VISIBILITY(state, status) {
            state.view_schedule_modal_visibility = status;
        },
        SET_NEW_SCHEDULE_MODAL_VISIBILITY(state, status) {
            state.new_schedule_modal_visibility = status;
        },
    }
}