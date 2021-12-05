<template>
  <div class="forum">
    <h1>This is the forum page </h1>
     
    <v-row class="justify-space-between pt-10">

      <v-col  cols="12" sm="4" class="border">
        <div id="informations" class="border">

        <v-select :items="items" label="Trier par" solo></v-select>
        <p>nombre de publications : {{totalMessage}}</p>
        <v-btn  color="" id="create">
          <router-link  to="/publicationCreation" class="buttonCreate">Créer une publication</router-link>
        </v-btn> 
        </div>
      </v-col>

      <v-col cols="12" sm="8" class="text-center"  outlined>

        

       <div class=" text-center border gray"> 
         
          <publicationsList />
        </div>
      </v-col>

    </v-row>

  </div>
</template>

<script>
export default {
    name: 'forum',
    components: {publicationsList},

     data: () => ({
      items: ['Les plus récent', 'Les plus populaires'],
      totalMessage: '5',
    }),

    computed: {},

    methods: {},
  }
 import publicationsList from '../components/publicationsList';

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
 //background-color:#bbb7b1;
 //background-color:#d1515a;
  
}
#create a {
  text-overflow: ellipsis;
  text-decoration: none;
  font-weight: bold;
  color:white;
}

</style>


