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
        view_schedule_modal_visibility: false,
        new_schedule_modal_visibility: false
    },
    getters: {
        GET_VIEW_SCHEDULE_LIST: state => state.view_schedule_list,
        GET_VIEW_SCHEDULE_MODAL_VISIBILITY: state => state.view_schedule_modal_visibility,
        GET_NEW_SCHEDULE_MODAL_VISIBILITY: state => state.new_schedule_modal_visibility,
    },
    actions: {
    },
    mutations: {
        SET_VIEW_SCHEDULE_MODAL_VISIBILITY(state, status) {
            state.view_schedule_modal_visibility = status;
        },
        SET_NEW_SCHEDULE_MODAL_VISIBILITY(state, status) {
            state.new_schedule_modal_visibility = status;
        },
    }
}