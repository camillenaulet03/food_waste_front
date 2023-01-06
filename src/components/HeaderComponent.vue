<template>
  <div class="profile">
    <div>
      <p>Vous êtes connecté en tant que {{username}}</p>
    </div>
    <div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex";
import {useToast, POSITION} from "vue-toastification";

export default {
  name: "HeaderComponent",
  data() {
    return {
      username: null,
      token: null,
      user: null
    }
  },
  computed: {
    ...mapGetters(["getUser", "getToken"]),
  },
  async mounted() {
    this.username = await this.getUser.username;
    this.token = await this.getToken;
    this.user = await this.getUser;
  },
  methods: {
    ...mapMutations(["setUser", "setToken", "setToast"]),
    async logout() {
      const toast = useToast();
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "username": this.username,
          "token": this.token
        },
        body: JSON.stringify({
          user: this.user,
          token: this.token
        }),
      });
      if (response.status === 200) {
        this.setToken(null);
        this.setUser(null);
        this.setToast("this.toast.success('Vous avez été déconnecté', {position: POSITION.BOTTOM_RIGHT})");
        this.$router.push("/");
      } else {
        const json = await response.json();
        toast.error(json.message, {position: POSITION.BOTTOM_RIGHT});
      }
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
