<template>
  <div class="profile">
    <div>
      <p>Vous êtes connecté en tant que {{user}}</p>
    </div>
    <div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "HeaderComponent",
  data() {
    return {
      user: null
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  async mounted() {
    this.user = this.getUser;
    this.user = this.user.username;
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async logout() {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: this.getUser,
          token: this.getToken
        }),
      });
      this.setToken(null);
      this.setUser(null);
      this.$router.push("/");
    }
  }
}
</script>
<style scoped>
.profile {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}
</style>
