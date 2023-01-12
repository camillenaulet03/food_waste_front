<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Nom" type="text" />
      <br />
      <br />
      <input v-model="password" placeholder="Mot de passe" type="password" />
      <br />
      <br />
      <input v-model="confirmPassword" placeholder="Confirmation mot de passe" type="password" />
      <br />
      <br />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
  <p>Si vous avez déjà un compte <router-link to="/"><button>Connexion</button></router-link></p>
</template>
<script>

import { mapMutations } from "vuex";
import { useToast, POSITION } from 'vue-toastification'

export default {
  data: () => {
    return {
      username: null,
      password: null,
      confirmPassword: null
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken", "setToast"]),
    async register(e) {
      e.preventDefault();
      const toast = useToast();
      if (this.username === null || this.password === null || this.confirmPassword === null) toast.error('Tous les champs doivent être remplis', {position: POSITION.BOTTOM_RIGHT});
      else if (this.password !== this.confirmPassword) toast.error('Les champs mot de passe et confirmation du mot de passe sont différents', {position: POSITION.BOTTOM_RIGHT});
      else {
        const response = await fetch(process.env.VUE_APP_ENV+"/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword,
          }),
        });
        if (response.status === 200) {
          this.setToast("this.toast.success('Vous avez créé un compte', {position: POSITION.BOTTOM_RIGHT})");
          this.$router.push("/");
        } else {
          const json = await response.json();
          toast.error(json.message, {position: POSITION.BOTTOM_RIGHT});
        }
      }
    }
  }
};
</script>
