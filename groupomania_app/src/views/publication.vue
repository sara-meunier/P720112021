<template>
  <v-container>
    <h1> titre </h1>
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
      const urlParams = new URLSearchParams(window.location.search);
      const publicationId = urlParams.get('id');
      console.log(publicationId);
      return fetch (API_URL+"/"+ publicationId)
      .then ( function(res) {//res = reponse de la requete
        if (res.ok) {
            return res.json();
        }
            //si la requete s'est bien passé, on récupére les données au format json
      })

      .then(res => {
        console.log("prout prout" + res)
      /*  let table = [];
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
        this.allPublications = table;*/
      })
    }
  }
</script>
