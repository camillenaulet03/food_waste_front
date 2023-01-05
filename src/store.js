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
        id: null,
        action: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setToken(state, token) {
            state.token = token;
        },

        setId(state, id) {
            state.id = id;
        },

        setAction(state, action) {
            state.action = action;
        }
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
        },

        getId(state) {
            return state.id;
        },

        getAction(state) {
            return state.action;
        }
    },
});

export default store;
