<template>
  <v-container>
    <h1> creation de publication </h1>
    <div class="creationPublication">
        <v-form>
        <v-text-field v-model="title" :rules="titleRules" label="Titre" placeholder="titre de la publication" id="title" required outlined></v-text-field>
        <v-textarea outlined v-model="content" :rules="contentRules"></v-textarea>
        </v-form>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="creationUser">
            Publier
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
    }),
    
    components: {},

    methods: {
        validate () {
            this.$refs.form.validate()
        },
    }
  }
</script>
