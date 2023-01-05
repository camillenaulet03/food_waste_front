<template>
  <HeaderComponent></HeaderComponent>
  <div class="choice">
    <p style="font-weight: bold">Tous les déchets</p>
    <p><router-link to="/createwaste"><button>Créer un nouveau déchet</button></router-link></p>
  </div>
  <div class="wastes">
    <table v-for="(waste, key) in wastes" v-bind:key="key">
      <tr>Compagnie - {{waste.issuing_company}}</tr>
      <tr>Nom - {{waste.label}}</tr>
      <tr>Quantité - {{waste.quantity}}</tr>
      <tr v-if="waste.is_collected">Collectable - Oui</tr>
      <tr v-else>Collectable - Non</tr>
    </table>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import HeaderComponent from "../components/HeaderComponent.vue"
export default {
  data() {
    return {
      wastes: null
    }
  },
  components: {
    HeaderComponent
  },
  async mounted() {
    this.wastes = await this.getWaste();
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
    },
    async getWaste() {
      return await fetch("http://localhost:8080/api/wastes").then(response => response.json()).then(data => {return data});
    }
  }
};
</script>
<style scoped>
.wastes {
  text-align: -webkit-center;
}

table {
  border: ridge;
  width: 30%;
  text-align: center;
  margin-bottom: 2em;
}

.choice {
  padding-left: 35%;
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}
</style>

