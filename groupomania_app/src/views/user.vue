<template>
  <div class="profil">
    <div class ="d-sm-flex justify-space-between flex-row">
      <v-card class="mr-6  avatar text-center" flat tile outlined max-width="250" >
        <v-img  max-width="250"  src="../assets/icon.png"></v-img>
        <subtitle-2> {{this.userInfos.name}} </subtitle-2>
      </v-card>

      <v-card class="container d-flex flex-column justify-space-around  " flat outlined :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'">
        <div>
          <h1 class="mb-6"> Votre profil </h1>
          <p> Mail: {{this.userInfos.email}}</p>
          <p> Role : {{this.userInfos.role}}</p>
          <div class="admin" v-if="this.userInfos.admin == true"><p> Vous êtes un admin </p></div>
        </div>

        <div class="d-flex justify-space-around  flex-wrap">
          <v-btn  color="success" class="mr-4" @click="editUser">
            Modifier mes informations
          </v-btn>

          <v-dialog v-model="dialog" width="500" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error" dark v-bind="attrs" v-on="on" >
                Supprimer le compte
              </v-btn>
            </template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Vous allez supprimer votre compte
                </v-card-title>
                <v-card-text>
                Etes-vous sur(e) de vouloir faire ça ?
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="sucess" text @click="dialog = false">
                  annuler la demande
                  </v-btn>
                  <v-btn color="error" text @click="deleteUser">
                  Oui, supprimer
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-dialog>

        </div>
      </v-card>
    </div>
  </div>
</template>

<script>

import { mapMutations } from "vuex";

export default {
  name: "User",

  data(){ return { 
    dialog: false,
    }
  },

  computed: {
    userInfos: function() {
        return {
          isAuthenticated: this.$store.getters.isAuthenticated,
          id: this.$store.getters.id,
          token: this.$store.getters.token,
          name: this.$store.getters.name,
          email: this.$store.getters.email,
          role: this.$store.getters.role,
          admin: this.$store.getters.admin,
        }
      }
  },

  methods:{

    ...mapMutations(['disconnectUser']),

     deleteUser() {
      this.dialog = false;
      const id = this.userInfos.id;

      fetch("http://localhost:3000/api/user/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.userInfos.token            
        }
      })
      .then(response => response.json());
      this.disconnectUser();
      alert("compte supprimé")
      this.$router.push('/');
    },

    editUser() {
      alert("fonctionnalité bientot disponible ! :)") ;
    }
  }
};
</script>

<style lang="scss" scoped>
.admin {
  color : red;
}
</style>