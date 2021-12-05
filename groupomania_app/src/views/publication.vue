<template>
  <v-container>
    <h1> {{publication.title}} </h1>
    <subtitle-2> {{publication.author}} </subtitle-2>
    <div class="Publication">
        <div>
            {{publication.content}}
        </div>
        
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="modifierPublication">
            Modifier
        </v-btn>
    </div>
  </v-container>
</template>

<script>
 
  export default {
    name: 'publication',
    components: {},
    data() {
      return {
        publication: {
          id:'',
          author:'',
          title:'',
          content:''
        },
      };
    },

    computed : {},

    methods: {},

    created() {
      const API_URL = "http://localhost:3000/api/publication";
      //const urlParams = new URLSearchParams(window.location.search);
      const publicationId = this.$route.params.id;
      console.log("l'id de la publication est :" +publicationId);
      return fetch (API_URL+"/"+ publicationId)
      .then ( function(res) {//res = reponse de la requete
       if (res.ok) {
         return res.json();
       }
       else { console.log ("il y a un probleme avec la requete")}
      })
      .then (res => {
        this.publication = {
          id:res.id,
          author:res.author,
          title:res.title,
          content:res.content
         };
         console.log ("publication recupérée = " + this.publication + "et aussi" +res.author);
      })
    }
  }

</script>
