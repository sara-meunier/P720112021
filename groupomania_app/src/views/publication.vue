<template>
  <v-container class="gray">
     <v-row class="justify-center pt-10" id="publication">
             
       <v-col  cols="12" lg="9" class="gray" >
         <h1> {{publication.title}} </h1>
         <v-row class="justify-space-between author" >
        <subtitle-1 id="author"> {{publication.author}} </subtitle-1>
          <v-btn  color="error" class="mr-4" id="signaler">
            Signaler
        </v-btn>
        </v-row>
         
    
    
        <div id = "publicationContent" class="">
            {{publication.content}}
        </div>

        <v-row class="justify-sm-start justify-space-around">
        
        <div><v-btn :disabled="!valid" color="success" class="mr-4" @click="modifierPublication">
            Modifier
        </v-btn>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="modifierPublication">
            Répondre
        </v-btn>
        </div>
        
        </v-row>
        
    
    
       </v-col>
     </v-row>


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
  margin-bottom: 40px ;
  background-color: white;
}

.author{
 //padding-left:10px;
 //padding-right:10px;
 margin:10px 0px 0px 0px;
}

.gray {
  background-color: #f5f5f5;
}

.zeropadding {
  //padding:0px !important
}

#signaler {
  font-size:10px;
  padding: 2px;
  height: 20px;
  margin-right:0px !important;
 // position: absolute;
  //top: 20px;
 // right: 0px;


}

</style>
