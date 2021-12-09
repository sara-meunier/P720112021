<template>
  <v-container class="">
    <v-row class="justify-center pt-10" id="publication">
      <v-col  cols="12" lg="9" class="gray" >
        <h1> {{publication.title}} </h1>
        
        <v-row class="justify-space-between author " >
          <div id="author"> publié par {{publication.author}} </div>
          <v-btn  color="error" class="mr-4" id="signaler" @click="signaler">
             Signaler
          </v-btn>
        </v-row>
         
         <!--affichage de la publication -->
        <div id = "publicationContent" class="" v-if="wantToModif == false">
           {{publication.content}}
         </div>

        <!-- zone de modification de la publiction -->
         <v-textarea outlined 
         id="contentModif" 
         label= "modifier votre publication" 
         type="text" 
         :rules="contentRules" 
         :value=publication.content 
         v-if="wantToModif == true"></v-textarea>

         <!-- zone de bouton d'actions -->

        <v-row class=" justify-end">          
            <v-btn  color="success" class="mr-4" 
            @click="modifierPublication" 
            v-if="publication.authorId == this.userInfos.id && wantToModif == false || this.userInfos.admin==true && wantToModif == false ">
            
              Modifier
            </v-btn>
            <v-btn  color="success" class="mr-4" 
            @click="enregistrerPublication" 
            v-if="publication.authorId == this.userInfos.id && wantToModif == true || this.userInfos.admin==true && wantToModif == true">
              Enregistrer
            </v-btn>
            <v-btn  color="" class="mr-4" @click="annuler" v-if="wantToModif == true ">
              Annuler
            </v-btn>

            <!--- demande de confirmation pour suppression -->
   
            <v-dialog v-model="dialog" width="500" 
            v-if="publication.authorId == this.userInfos.id && wantToModif == true || this.userInfos.admin==true && wantToModif == true">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="error" dark v-bind="attrs" v-on="on" >
                  Supprimer la publication
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Vous allez supprimer cette publication
              </v-card-title>
              <v-card-text>
              Etes-vous sur(e) de vouloir faire ça ?
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="sucess" text @click="dialog = false">
                annuler la demande
                </v-btn>
                <v-btn color="error" text @click="supprimerPublication ">
                  Oui, supprimer
                </v-btn>
              </v-card-actions>
            </v-card>
            </v-dialog>

            <v-btn  color="success" class="mr-4" @click="repondre" v-if="wantToModif == false">
              Répondre
            </v-btn>
        </v-row>
      </v-col>
    </v-row>

<!-- nouveau commentaire-->

    <v-row class="justify-center pt-10" id="publication" v-if="wantToComment == true">
      <v-col  cols="12" lg="9" >
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
          <v-textarea outlined 
          v-model="newComment.content" 
          counter 
          no-resize 
          placeholder="Ecrivez un commentaire" 
          id="commentaire">
          </v-textarea>
        </v-form>
        <v-btn color="success" class="mr-4" @click="creationComment">
            Envoyer
        </v-btn>
        <v-btn  color="" class="mr-4" @click="annuler" v-if="wantToComment == true ">
              Annuler
        </v-btn>
      </v-col>
    </v-row>

<!-- liste des commentaires -->

    <div class=" text-center"> 
      <v-container>
        <h2> Commentaires </h2>

        <div
        v-for="comment in allComments"
        :comment="comment"
        :key="comment.id"
        class="comment"
        >
        
          <v-card class="card gray">
            <div class="">
              <v-container fill-height class="v-card__subtitle"> 
                <i class="material-icons avatar">face</i>
                <v-layout class="bold">{{comment.author}}</v-layout>
              </v-container>
              <v-card-text class="cardContent"> {{comment.content}}</v-card-text>
            </div>
          </v-card>     
        </div>
      </v-container>
    </div>

  </v-container>
</template>

<script>
  
  export default {
    name: 'publication',

    data() {
      return {
        publication: {
          id:'',
          author:'',
          title:'',
          content:''
        },
        
        newComment:{
          author:this.$store.getters.name,
          authorId:this.$store.getters.id,
          content:'',
          publicationId:this.$route.params.id,
        },

        comment: {
          id:'',
          author:'',
          content:'',
          publicationId:'',
        },

        allComments : [] ,

        wantToModif: '',

        wantToComment: '',

        dialog: false,
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
          role: this.$store.getters.role,
          admin: this.$store.getters.admin
        }
      },
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },

      modifierPublication(){
      this.wantToModif = true;
      this.wantToComment =false;
      },

      annuler(){
        this.wantToModif = false;
        this.wantToComment = false;
      },

      supprimerPublication(){  
        this.dialog = false;
        const id = this.$route.params.id;
        fetch("http://localhost:3000/api/publication/" + id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.userInfos.token            
          }
        })
        .then(response => {
          if (response.status === 200) {
            response.json().then(body => {
              console.log(body.message);
              alert("votre publication a été supprimée");
              this.$router.push({ path:'/Forum'})
            })
          } else {
            response.json().then(body => {
              console.log(body.message)
           })
          }
        });
      },

      enregistrerPublication(){
        this.wantToModif =false;
        const token = this.$store.getters.token;
        let newContent = document.getElementById("contentModif").value;
        let envoi = { content : newContent}
        fetch("http://localhost:3000/api/publication/"+this.publication.id, {
          method: "PUT",
          headers: {
           Authorization: "Bearer " + token,
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(envoi),
        })
        .then(response => response.json());
        alert ("Vos modifications ont bien été enregistrées");
        this.content=newContent;
        this.$router.go();
      },

      repondre(){
        this.wantToComment =true;
        this.wantToModif = false;
      },

      creationComment() {
        const token = this.$store.getters.token;      
        let newComment = {
          author: this.newComment.author, 
          authorId :this.$store.getters.id, 
          content:this.newComment.content, 
          publicationId: this.newComment.publicationId
        };

        fetch("http://localhost:3000/api/comment", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment),
        })

        .then(response => {
          if (response.status === 201) {
            response.json().then(body => {
              console.log(body.message)
            });
            alert ("Votre commentaire a bien été enregistré")
            this.$router.go();
          } else {
            response.json().then(body => {
              console.log(body.message)
            })
          }
        });
      },

      signaler(){
      alert("fonctionnalité pas encore disponible ! :)") ;
    },
    },

    


    created() {
      //initialisation des valeurs
      this.wantToModif = false;
      this.wantToComment =false;
      //recuperation de la publication
      const API_URL = "http://localhost:3000/api/";
      const publicationId = this.$route.params.id;
      return fetch (API_URL+"publication/" + publicationId, {
        headers: {
          Authorization: "Bearer " + this.userInfos.token
        }})

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
          authorId: res.authorId,
          title:res.title,
          content:res.content
         };
      })
    },

    beforeMount(){
      //récupération des commentaires
      const API_URL = "http://localhost:3000/api/";
      return fetch (API_URL+"comment/", {
        headers: {
          Authorization: "Bearer " + this.userInfos.token
        }
      })
      .then ( function(res) {//res = reponse de la requete
        if (res.ok) {
            return res.json();
        }else {
          alert("Une erreur s'est produit")
        }
      })

      .then(res => {
        let table = [];
        for (var i = 0; i<res.length; i++) {
            let id = res[i].id;
            let content = res[i].content;
            let publicationId= res[i].publicationId;
            let author = res[i].author;
            let authorId= res[i].authorId;

            if (publicationId == this.publication.id) {
              let comment = {
                id: id,
                author: author,
                authorId: authorId,
                content: content,
                publicationId: publicationId,
              }
              table.push (comment);
            }   
          }
        this.allComments = table;
      })
    } 
  }

</script>


<style lang="scss" scoped>

.h1 {
  
}
.border { 
border-radius: 10px;
border: solid 3px black;
}

#publication {
  padding:0px !important;
}
#publicationContent{
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 25px ;
  background-color: white;
}

.author{
 margin:10px 0px 0px 0px;
}

.v-btn {
  margin : 15px !important;
}
.gray {
  background-color: #f5f5f5 !important;
}

#signaler {
  font-size:10px;
  padding: 2px;
  height: 20px;
  margin-right:0px !important;
}

.comment {
    margin-top: 30px;
    text-align: center;
}

.cardContent {
  text-align : justify;


} 
.v-card__subtitle {
  padding-bottom : 3px;
}

.avatar {
  margin-right : 10px;
}

.bold {
  font-weight: bold;
}

</style>
