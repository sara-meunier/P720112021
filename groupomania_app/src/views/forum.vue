<template>
  <div class="forum">
    <h1>This is the forum page</h1>

    <v-row class="justify-space-between pt-10">
      <v-col s="12" md="3" class="border"  id="informations">
        <v-select
          :items="items"
          label="Trier par"
          solo
        ></v-select>

        <br/>
        
        
        <p>nombre de publications : {{totalMessage}}</p>
      </v-col>

      <v-col s="12" md="8" class=" border"  outlined>
        <p> ici les messages </p>
        

          <div class="d-flex flex-column text-center">
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

<style lang="scss">
.border { border : 1px solid;
border-color: #dddddd;
border-radius: 3px;
}

#informations{
  padding: 10px;
  margin-right: 5px;
  background-color: #dddddd;

}
</style>


