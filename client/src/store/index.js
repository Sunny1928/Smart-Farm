import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  strict: true,
  state: {
    accessToken: null,
    refreshToken: null,
    user: null,
    isUserLoggedIn: false,
  },
  getters: {
  },
  mutations: {
    setAccessToken (state, token) {
      state.accessToken = token
      state.isUserLoggedIn = !!(token)
    },
    setRefreshToken (state, token) {
      state.refreshToken = token
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setAccessToken ({commit}, token) {
      commit('setAccessToken', token)
    },
    setRefreshToken ({commit}, token) {
      commit('setRefreshToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  },
  modules: {
  }
})
