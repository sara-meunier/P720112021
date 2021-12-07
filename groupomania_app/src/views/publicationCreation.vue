<template>
  <v-container>
    <h1> creation de publication </h1>
    <div class="creationPublication">
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      >
        <v-text-field v-model="title" :rules="titleRules" label="Titre" placeholder="titre de la publication" id="title" required outlined></v-text-field>
        <v-textarea outlined v-model="content" :rules="contentRules"></v-textarea>
        </v-form>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="creationPublication">
          Publier
        </v-btn> 
        <v-btn  color="" class="mr-4" @click="annuler">
          Annuler
        </v-btn>
    </div>
  </v-container>
</template>

<script>
 
  export default {
    name: 'PublicationCreation',

    data: () => ({
      valid: true,
      title:'',
      titleRules:[
            v => !!v || 'titre obligatoire',
            v => (v && v.length <= 50) || 'Le titre doit faire moins de 50 caractéres',
        ],
      content:'',
      contentRules:[
            v => !!v || 'Votre message est vide',
            v => (v && v.length <= 2000) || 'Le titre doit faire moins de 2000 caractéres',
        ],
        userId:'',
    }),
    
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

    methods: {
      validate () {
            this.$refs.form.validate()
        },

      async creationPublication() {
        await this.validate()
        if (!this.valid) return

        const token = this.$store.getters.token;
        let publication = {title:this.title, content:this.content, author:this.userInfos.id};

        fetch("http://localhost:3000/api/publication", {
          method: "POST",
          headers: {
           Authorization: "Bearer " + token,
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(publication),
        })
        .then(response => response.json());
        alert ("Votre message a bien été enregistré");
        const router = this.$router;
        router.push({path:'forum'});
      },
      annuler() {
        this.$router.push('Forum');
      }
    }
  }
</script>
