<template>
  <div class="login">
    <h1>Se connecter</h1>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail"  value="value" id="email" placeholder="placeholder" outlined required></v-text-field>
        <v-text-field v-model="password" :rules="passwordRules" label="Mot de Passe" placeholder="placeholder" value="value" id="password" outlined required></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
            Se connecter
        </v-btn>

  </div>
</template>


<script>

  export default {
    name: 'signup',
    components: {},

    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'Une adresse mail est obligatoire',
        v => /.+@.+\..+/.test(v) || 'l adresse mail doit être valide',
      ],
      password:'',
      passwordRules:[
        v => !!v || 'Un mot de passe est obligatoire',
        v => (v && v.length >= 8) || 'Le mot de passe doit faire 8 caractére minimum',
      ],
      option:'',
    }),

    computed: {},

    methods: {},
  }
</script>
