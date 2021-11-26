<template>
  <v-container>
    <h2>Check out our upcoming events</h2>

      <div
        v-for="publication in publications"
        :publication="publication"
        :key="publication.id"
        class=""
        >
        <router-link :to="'/publication/' + publication.id">
         <publication_mini :publication="publication" />
        </router-link>
      </div>
      
  </v-container>
</template>


<script>
import publication_mini from '@/components/publication_mini.vue';
  export default {
    name: 'publications_liste',
    components: {
      publication_mini,
    },
    data() {
      return {
        publication: {},
        publications: [
          {
            id: 1,
            title: 'publication 1',
            author: 'Fundraising',
            preview:'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
          },
          {
            id: 2,
            title: 'publication2',
            author: 'Fundraising',
            preview:'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
           
          },
        ],
      };
    },
  };
</script>
<style lang="scss" scoped>
  .events {
    margin-top: 100px;
    text-align: center;
  }
</style>