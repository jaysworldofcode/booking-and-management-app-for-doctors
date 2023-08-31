export default {
    namespaced: true,
    state: {
        sidebar_visibility: false,
        form_modal_placement: 'right'
    },
    getters: {
        GET_SIDEBAR_VISIBILITY: state => state.sidebar_visibility,
        GET_FORM_MODAL_PLACEMENT: state => state.form_modal_placement,
    },
    actions: {
    },
    mutations: {
        SET_SIDEBAR_VISIBILITY(state, status) {
            state.sidebar_visibility = status;
        },
    }
}