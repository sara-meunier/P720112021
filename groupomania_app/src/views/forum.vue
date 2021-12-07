<template>
  <div class="forum">
    <h1>Bienvenue sur le forum </h1>
     
    <v-row class="justify-space-between pt-10">

<!-- encard information à gauche -->
      <v-col  cols="12" sm="4" class="border">
        <div id="informations" class="border">
        <v-select :items="items" label="Trier par" solo></v-select>
        <p>nombre de publications : {{totalMessage}}</p>
        <v-btn  color="" id="create">
        <router-link  to="/publicationCreation" class="buttonCreate">Créer une publication</router-link>
        </v-btn> 
        </div>
      </v-col>

<!--- liste des messages sur le forum-->
      <v-col cols="12" sm="8" class="text-center"  outlined>
        <div class=" text-center border gray"> 
          <publicationsList />
        </div>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import publicationsList from '../components/publicationsList';

export default {
  name: 'forum',
  components: {publicationsList},

  data: () => ({
    items: ['Les plus récent', 'Les plus populaires'],
    totalMessage: '5',
  }),

  methods: {},
}
</script>

<style lang="scss" scoped>

.border { 
border-radius: 10px;
}

#informations{
  padding: 10px;
  margin-right: 5px;
  background-color: #f5f5f5;
}

.gray {
  background-color: #f5f5f5;
}

#create {
 margin: 10px;
 background-color:#091f43;
 text-overflow: ellipsis;  
}

#create a {
  text-overflow: ellipsis;
  text-decoration: none;
  font-weight: bold;
  color:white;
}

</style>


