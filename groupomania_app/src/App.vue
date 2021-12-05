<template>
  <v-app>
    <v-app-bar app  dark >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo_groupomania.png"
          transition="scale-transition"
          width="150"
        />
      </div>
            

      <v-spacer></v-spacer>

      
        
      

      <v-btn text>
      <router-link tag="li" to="/" class="buttonnav">Home</router-link>
      </v-btn>

       <v-btn text>
      <li><router-link tag="li" to="/signup" class="buttonnav">S'inscrire</router-link></li>
      </v-btn>

       <v-btn text>
      <li><router-link tag="li" to="/login" class="buttonnav">Se connecter</router-link></li>
      </v-btn>

       <v-btn text>
      <li><router-link tag="li" to="/user" class="buttonnav">Profil</router-link></li>
      </v-btn>

       <v-btn text>
      <li><router-link tag="li" to="/forum" class="buttonnav">Forum</router-link></li>
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

export default {
  name: 'App',

  data: () => ({
    collapseOnScroll: true,
    //
  }),

 };
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