<template>
<div class="signup">
    <h1>S'inscrire</h1>

    <div id="formulaire" >
               
        <v-text-field v-model="name" :rules="nameRules" label="Nom" placeholder="placeholder" value="value" id="username" required></v-text-field>

        <v-text-field v-model="role" label="Role dans l'entrepise" placeholder="placeholder" value="value" id="role" required></v-text-field>

        <v-text-field v-model="password" :rules="passwordRules" label="Mot de passe" placeholder="placeholder" value="value" id="password" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail"  value="value" id="email" placeholder="placeholder" required></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="creationUser">
            S'inscrire
        </v-btn>
    </div>
</div>      
</template>


<script>

export default {
    name: 'signup',
    components: {},

    data: () => ({
        valid: true,
        nameRules: [
            v => !!v || 'Votre nom d utilisateur',
        ],
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

        role:'',

    }),

    computed: {},

    methods: {
        validate () {
        this.$refs.form.validate()
        },

        creationUser() {
            let user=
            [document.getElementById("username").value,
            document.getElementById("password").value,
            document.getElementById("email").value,
            document.getElementById("role").value];

            console.log("creation de l'user ? :" + user)
        }
    },
  }
</script>


<style lang="scss">
</style>