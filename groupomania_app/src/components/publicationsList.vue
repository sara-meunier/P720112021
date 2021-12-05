<template>
  <v-container>
    <h1> Dernière publications</h1>
    <div>{{allPublication}}</div>

      <div
        v-for="publication in allPublications"
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
        publication: {
          id:'',
          author:'',
          title:'',
          content:''
        },
        allPublications : {} ,
      };
    },

    computed : {},

    methods: {},

    created() {
      const API_URL = "http://localhost:3000/api/publication";
      let tokenTemp = localStorage.getItem("token");
      //let token = JSON.parse(tokenTemp);
      console.log("le token est : " + tokenTemp );
      return fetch (API_URL+"/")//, {
      //headers: {
          //Authorization: "Bearer " + token
        //}})
      .then ( function(res) {//res = reponse de la requete
        if (res.ok) {
            return res.json();
        }
            //si la requete s'est bien passé, on récupére les données au format json
      })

      .then(res => {
        let table = [];
        for (var i = 0; i<res.length; i++) {
            let id = res[i].id;
            let title =res[i].title;
            let content = res[i].content;
            let author = res[i].author;

            let product = {
              id: id,
              title: title,
              content: content,
              author: author
            }

            table.push (product);
        }
        this.allPublications = table;
      })
    }
  }
</script>

<style lang="scss" scoped>
  .events {
    margin-top: 100px;
    text-align: center;
  }
</style>