<template>
  <div>
    <h1>LOGIN</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Nom" />
      <br />
      <br />
      <input v-model="password" placeholder="Mot de passe" type="password" />
      <br />
      <br />
      <input type="submit" value="Connexion" />
    </form>
  </div>
  <p>Si vous n'avez pas de compte <router-link to="/register"><input type="submit" value="S'inscrire" /></router-link></p>
</template>
<script>

import {mapGetters, mapMutations} from "vuex";
import { useToast, POSITION } from 'vue-toastification'

export default {
  data: () => {
    return {
      username: null,
      password: null,
      toast: useToast(),
      position: POSITION
    };
  },
  computed: {
    ...mapGetters(["getToast"]),
  },
  async mounted() {
    this.message = this.getToast;
    if (this.message !== null) {
      // eslint-disable-next-line no-unused-vars
      const POSITION = this.position
      eval(this.message);
      await this.resetToast();
    }
  },
  methods: {
    ...mapMutations(["setUser", "setToken", "setToast"]),
    async login(e) {
      e.preventDefault();
      if (this.username === null || this.password === null) this.toast.error('Tous les champs doivent être remplis', {position: POSITION.BOTTOM_RIGHT});
      else {
        const response = await fetch(process.env.VUE_APP_ENV+"/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        if (response.status === 200) {
          const {user, token} = await response.json();
          await this.setUser(user);
          await this.setToken(token);
          this.$router.push("/home");
        } else {
          const json = await response.json();
          this.toast.error(json.message, {position: POSITION.BOTTOM_RIGHT});
        }
      }
    },
    async resetToast() {
      this.setToast(null);
    }
  }
};
</script>
