<template>
<div class="signup">
    <h1>S'inscrire</h1>

    <div id="formulaire" >
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
               
        <v-text-field v-model="name" :rules="nameRules" label="Nom" placeholder="placeholder" id="name" required></v-text-field>

        <v-text-field v-model="role" label="Role dans l'entrepise" placeholder="placeholder" id="role" required></v-text-field>

        <v-text-field v-model="password" :rules="passwordRules" label="Mot de passe" placeholder="placeholder"  id="password" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail"  id="email" placeholder="placeholder" required></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="creationUser">
            S'inscrire
        </v-btn>
        </v-form>
    </div>
</div>      
</template>


<script>
//import axios from "axios";
export default {
    name: 'signup',
    components: {},

    data: () => ({
        valid: true,
        name:'',
        nameRules: [
            v => !!v || 'Votre nom d utilisateur',
        ],

        role:'',

        password:'',
        passwordRules:[
            v => !!v || 'Un mot de passe est obligatoire',
            v => (v && v.length >= 8) || 'Le mot de passe doit faire 8 caractére minimum',
        ],

        email: '',
        emailRules: [
            v => !!v || 'Une adresse mail est obligatoire',
            v => /.+@.+\..+/.test(v) || 'l adresse mail doit être valide',
        ],
        
    }),

    computed: {
      
    },

    methods: {
        validate () {
            this.$refs.form.validate()
        },

        async creationUser() {
            await this.validate()
            if (!this.valid) return

          /*  axios
            .post("http://localhost:3000/api/user/signup", this.dataSignup)
            .then(response => {
                console.log(response);
            })
        }*/

            // fetch
            let api = 'http://localhost:3000/api';
            console.log(api + '/signup');
            let user = { name:this.name, role:this.role, password:this.password,email:this.email  };
            console.log(user);

            fetch("http://localhost:3000/api/user/signup", {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json());
        }
    },
  }
</script>


<style lang="scss">
</style>