<template>
  <v-container>
    <h2> Derniers Commentaires</h2>
    

      <div
        v-for="comment in allComments"
        :comment="comment"
        :key="comment.id"
        class="comment"
        >
        
      <v-card class="card">
        <div class="card-content">
            <v-container fill-height class="v-card__subtitle"> <i class="material-icons">face</i><v-layout>{{comment.author}}</v-layout></v-container>
            <v-card-text> {{comment.content}}</v-card-text>
        </div>
    </v-card>   
        
      </div>
      
  </v-container>
</template>


<script>

  export default {
    name: 'commentsList',
    components: {},

    data() {
      return {
        comment: {
          id:'',
          author:'',
          //userId: '',
          content:'',
          publicationId:'',
        },
        allComments : {} ,
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
      const API_URL = "http://localhost:3000/api/";
      return fetch (API_URL+"comment/", {
      headers: {
          Authorization: "Bearer " + this.userInfos.token
        }
        })
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
            let content = res[i].content;
            let publicationId= res[i].publicationId;
            let author = res[i].author;

            let comment = {
              id: id,
              author: author,
              //userId: this.userInfos.id,
              content: content,
             publicationId: publicationId,
            }

            table.push (comment);
        }
        this.allComments = table;
      })
    }
  }
</script>

<style lang="scss" scoped>
  .comment {
    margin-top: 30px;
    text-align: center;
  }
</style>