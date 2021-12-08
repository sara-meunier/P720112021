<template>
<div class="signup">
    <h1>S'inscrire</h1>

    <div id="formulaire" >
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
         >   
               
            <v-text-field v-model="name" :rules="nameRules" label="Nom" placeholder="indiquez votre nom" id="name" required></v-text-field>

            <v-text-field v-model="role" label="Role dans l'entreprise" placeholder="indiquez votre fonction" id="role" required></v-text-field>

            <v-text-field v-model="password" :rules="passwordRules" type="password" label="Mot de passe" placeholder="Indiquez mot de passe"  id="password" required></v-text-field>

            <v-text-field v-model="email" :rules="emailRules"  label="E-mail"  id="email" placeholder="Indiquez votre adresse email" required></v-text-field>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="creationUser">
                S'inscrire
            </v-btn>
        </v-form>
    </div>
</div>      
</template>


<script>

import { mapState } from "vuex";
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
            v => (v && v.length >= 8) || 'Le mot de passe doit faire 8 caractéres minimum',
        ],

        email: '',
        emailRules: [
            v => !!v || 'Une adresse mail est obligatoire',
            v => /.+@.+\..+/.test(v) || 'l adresse mail doit être valide',
        ],
        
    }),

    computed: {
    ...mapState(["user"])
    },

    methods: {
        validate () {
            this.$refs.form.validate()
        },

        async creationUser() {
            await this.validate()
            if (!this.valid) return

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
            .then(response => {
                if (response.status === 201) {
                    response.json().then(body => {
                        alert(body.message);
                        this.$router.push('Login')
                    })
                } else {
                    response.json().then(body => {
                        alert(body.message)
                    })
                }
            });
        }
    },
  }
</script>


<style lang="scss">
</style>