<template>
  <v-container>
    <h2> Dernières publications</h2>
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
          authorId:'',
          title:'',
          content:'',
          imageUrl:''
        },
        allPublications : {} ,
      };
    },

    computed: {
      userInfos: function() {
        return {
          isAuthenticated: this.$store.getters.isAuthenticated,
          id: this.$store.getters.id,
          token: this.$store.getters.token,
          name: this.$store.getters.name,
          email: this.$store.getters.email,
          role: this.$store.getters.role
        }
      }
    },

    methods: {},

    created() {
      return fetch ("http://localhost:3000/api/publication/", {
      headers: {
          Authorization: "Bearer " + this.userInfos.token
        }
      })
      .then ( function(res) {//res = reponse de la requete
        if (res.ok) {
            return res.json();
        } else ( alert("une erreur s'est produite lors de la récupération des publications"))
      })

      .then(res => {
        let table = [];
        for (var i = 0; i<res.length; i++) {
            let id = res[i].id;
            let title =res[i].title;
            let content = res[i].content;
            let author = res[i].author;
            let authorId = res [i].authorId;
            let imageUrl = res [i].imageUrl;

            let product = {
              id: id,
              title: title,
              content: content,
              author: author,
              authorId: authorId,
              imageUrl: imageUrl,
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