<template>
  <div class="profil">

    <div class ="d-sm-flex justify-space-between flex-row">

      <v-card class="mr-6  avatar text-center" flat tile outlined max-width="250" >
        <v-img  max-width="250"  src="../assets/icon.png"></v-img>
        <subtitle-2> Nom de l'utilisateur </subtitle-2>
      </v-card>

      <v-card class="container d-flex flex-column justify-space-around  " flat outlined :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'">
        <div>
          <h2 class="mb-6"> Votre profil </h2>
          <p> Mail: {{$store.state.user.email}}</p>
          <p> Role : {{$store.state.user.role}}</p>
        </div>

        <div class="d-flex justify-space-around  flex-wrap">
          <v-btn  color="success" class="mr-4" @click="modifier">
            Modifier mes informations
          </v-btn>
  
          <v-btn  color="error" class="mr-4" @click="deleteUser">
          Supprimer mon compte
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "User",
  data : () => ({
   // email : $store.state.user.email,
   email: "dark.kenobi@gmail.com"
  }),
  created() {
   // this.$store.dispatch("getUser");
  },
  computed: {
    ...mapGetters(["activeUser"])
  },
  methods:{
     deleteUSer() {
       console.log("ok on supprime");
      let api = 'http://localhost:3000/api';
      const router = this.$router;
      console.log(api + '/user');
      fetch("http://localhost:3000/api/user", {
        method: "DELETE",
        body: this.email
              //headers: {}
      })   
      .then(response => response.json())
      .then(router.push({path:'forum'}))
    }
  }
};
</script>

<style lang="scss" scoped>

.v-card {
  margin-bottom : 20px;
}

.v-btn {
  margin-bottom : 10px;
}

</style>