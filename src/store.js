import {createStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        })
    ],
    state: {
        user: null,
        token: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },

        getUser(state) {
            return state.user;
        },

        getToken(state) {
            return state.token;
        }
    },
});

export default store;
