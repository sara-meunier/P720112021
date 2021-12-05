import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    user: {
      name:"",
      email:"",
      role:""
    }
  },
  mutations: {
    userStorage(){


    }
   // GET_CURRENT_USER_ID(state){
      //state.token=
      //state.currentUserId=
      //stata.currentUserName=
    //}
  },
  actions: {
  },
  modules: {
  }
})
