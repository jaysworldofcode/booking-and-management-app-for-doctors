export default {
    namespaced: true,
    state: {
        user_details: {
            username: 'test',
            name: 'tester'
        }
    },
    getters: {
        GET_USER_DETAILS: state => state.user_details,
    },
    actions: {
    },
    mutations: {
    }
}