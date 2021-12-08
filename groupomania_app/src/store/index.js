import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    id: null,
    name: null,
    email: null,
    role: null,
    admin: null,
  },

  mutations: {
    authenticateUser(state, data) {
      console.log(data);
      state.token = data.token
      state.id = data.id
      state.name = data.name
      state.email = data.email
      state.role = data.role
      state.admin = data.admin
    },

    disconnectUser(state) {
      state.token = null
      state.id = null
      state.name = null
      state.email = null
      state.role = null
      state.admin = null
    }
  },
   
  getters: {
    isAuthenticated: state => !!state.id, //renvoie true si il y a un utilisateur dans le store
    token: state => state.token,
    id: state => state.id,
    name: state => state.name,
    email: state => state.email,
    role: state => state.role,
    admin: state => state.admin
  },

  plugins: [createPersistedState()],
  actions: {},
  modules: {},

})
