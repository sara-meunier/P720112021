<template>
  <v-container>
    <h1> Dernière publications</h1>

      <div
        v-for="publication in publications"
        :publication="publication"
        :key="publication.id"
        class=""
        >
        
         <publicationMini :publication="publication" />
        
      </div>
      
  </v-container>
</template>


<script>
import publicationMini from '@/components/publicationMini.vue';
  export default {
    name: 'publicationsList',
    components: {
      publicationMini,
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
            numberLike: 46,
          },
          {
            id: 2,
            title: 'publication2',
            author: 'Fundraising',
            preview:'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
            numberLike: 20,
           
          },
        ],
      };
    },
    methods: {
      creerListPublications() {
        const API_URL = "http://localhost:3000/api/publications";
        return fetch (API_URL+"/")
        .then(response => {
        console.log("post", response.data);
        this.allPosts = response.data;
      })
        /*class Post {
          constructor (id, title, author, contenu, numberLike){
          this.id=id;
          this.title=title;
          this.author=author;
          this.contenu=contenu;
          this.numberLike=numberLike;
          }
        }
        return fetch (API_URL+"/")
        .then (function (value) {//value = les données récupérées
          let publications = [];
        
          for (i = 0; i<value.length; i++) {
            let idpost = value[i].id;
            let titlepost = value[i].title;
            let authorpost = value[i].author;
            let contenupost = value[i].text;
            let numberLikepost = value[i].numberLike; 

            let publication = new Post (
            idpost,
            titlepost,
            authorpost,
            contenupost,
            numberLikepost
            );
     
            publications.push (publication);
          }
          return publications;
        })*/
      },
    }
  };
</script>

<style lang="scss" scoped>
  .events {
    margin-top: 100px;
    text-align: center;
  }
</style>