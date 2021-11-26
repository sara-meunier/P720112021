<template>
  <div class="profil">
    <h1>Votre profil</h1>

<div class ="d-sm-flex justify-space-between flex-row">
<v-card class="mr-6  text-center"
      flat
      tile
      outlined
      max-width="250"
    >
    <v-img  max-width="250"    
      src="../assets/icon.png"
    ></v-img>
  <subtitle-2> Nom de l'utilisateur </subtitle-2>
</v-card>

<v-card class="container d-flex flex-column justify-space-between " flat outlined :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'">
  <div>
  <h2 class="mb-6"> details</h2>
  <p> Mail:</p>
  <p> Role:</p>
  </div>

  <div class="d-flex justify-space-between">
   <v-spacer></v-spacer>
  <v-btn  color="success" class="mr-4" @click="modifier">
    Modifier mes informations
  </v-btn>
  <v-spacer></v-spacer>
  <v-btn  color="error" class="mr-4" @click="supprimer">
    Supprimer mon compte
  </v-btn>
  <v-spacer></v-spacer>
  </div>
  
</v-card>
</div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "User",
  created() {
    this.$store.dispatch("getUser");
  },
  computed: {
    ...mapGetters(["activeUser"])
  },
};
</script>