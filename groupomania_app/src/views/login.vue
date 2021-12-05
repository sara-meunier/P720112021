<template>
  <div class="login">
    <h1>Se connecter</h1>
<v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-text-field v-model="email" :rules="emailRules" label="E-mail"   placeholder="placeholder" id="email" outlined required></v-text-field>
        
        <v-text-field v-model="password" :rules="passwordRules" label="Mot de Passe" placeholder="placeholder" id="password" outlined required></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
            Se connecter
        </v-btn>
        </v-form>

  </div>
</template>


<script>
import { mapState } from "vuex";
  export default {
    name: 'login',
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

    ccomputed: {
    ...mapState(["user"])
  },

    methods: {
      validate () {
            this.$refs.form.validate()
        },
      storageUser() {
        this.$store.commit("storageUSer")
      },

      async login() {
            await this.validate()
            if (!this.valid) return

            // fetch
            let api = 'http://localhost:3000/api';
            console.log(api + '/login');
            let user = { password:this.password,email:this.email  };
            console.log(user);

            fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json()
        );
        const router = this.$router
        router.push({path:'forum'})
        }
    },
  }
</script>
