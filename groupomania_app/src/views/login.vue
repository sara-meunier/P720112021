<template>
  <div class="login">
    <h1>Se connecter</h1>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-text-field v-model="email" :rules="emailRules" label="E-mail"   placeholder="Indiquez votre adresse email" id="email" outlined required></v-text-field>
        
        <v-text-field v-model="password" :rules="passwordRules" type="password" label="Mot de Passe" placeholder="Indiquez votre mot de passe" id="password" outlined required></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
            Se connecter
        </v-btn>
      </v-form>
  </div>
</template>


<script>
  import { mapMutations } from "vuex";

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

    computed: {},

    methods: {
      validate () {
          this.$refs.form.validate()
        },

     ...mapMutations(['authenticateUser']),

      async login() {
        await this.validate()
        if (!this.valid) return

        let user = { password:this.password,email:this.email };
        console.log(user);

        fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
        })
        .then(response => {
          if (response.status === 200) {
            response.json().then(body => {
              this.authenticateUser(body);
              this.$router.push({path:'forum'})
            })          
          } else {
            response.json().then(body => {
              //this.$toast.error(body.message)
              alert(body.message)
            })
          }            
        })
        .catch(err => console.log(err));
      }
    },
  }
</script>
