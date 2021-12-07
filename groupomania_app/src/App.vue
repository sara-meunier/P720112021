<template>
  <v-app>
    <v-app-bar app  dark >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 d-none d-sm-flex"
          contain
          src="./assets/logo_groupomania.png"
          transition="scale-transition"
          width="150"
        />
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 d-flex d-sm-none"
          contain
          src="./assets/icon_white.png"
          transition="scale-transition"
          width="25"
        />
      </div>
            

      <v-spacer></v-spacer>


      <v-btn text to="/">
        Home
      </v-btn>

      <v-btn text to="/forum" class="buttonnav" v-if="this.userInfos.isAuthenticated">
       Forum
      </v-btn>

       <v-btn text to="/signup" class="buttonnav" v-if="this.userInfos.isAuthenticated===false">
       S'inscrire
       </v-btn>

       <v-btn text to="/login" class="buttonnav" v-if="this.userInfos.isAuthenticated===false">
       Se connecter
      </v-btn>

       <v-btn text to="/user" class="buttonnav" v-if="this.userInfos.isAuthenticated">
       Profil
      </v-btn>

      <v-btn text to="/login" class="buttonnav" v-if="this.userInfos.isAuthenticated" @click="this.disconnectUser">
       Se deconnecter
      </v-btn>


      
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: 'App',

  data: () => ({
    collapseOnScroll: true,
  }),

  computed: {
    userInfos: function() {
      return {
        isAuthenticated: this.$store.getters.isAuthenticated,
        id: this.$store.getters.id,
        token: this.$store.getters.token,
        name: this.$store.getters.name,
        email: this.$store.getters.email,
        role: this.$store.getters.role
      }
    }
  },

  methods : {
    ...mapMutations(['disconnectUser'])
  },
  
}



</script>

<style lang="scss">

.v-app-bar {
  background-color:#091f43 !important;

}

#li {text-decoration: none;
list-style-type: none !important;
  color : white;
}


</style>