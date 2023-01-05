<template>
  <HeaderComponent></HeaderComponent>
  <div class="choice">
    <p style="font-weight: bold">Tous les déchets</p>
    <p><button @click="createWaste()">Créer un nouveau déchet</button></p>
  </div>
  <div class="wastes">
    <table v-for="(waste, key) in wastes" v-bind:key="key">
      <tr>
        <td>Compagnie - {{waste.issuing_company}}</td>
        <td><button @click="updateWaste(waste._id)">Modifier</button></td>
      </tr>
      <tr>
        <td>Nom - {{waste.label}}</td>
        <td><button @click="deleteWaste(waste._id)">Supprimer</button></td>
      </tr>
      <tr>
        <td>Quantité - {{waste.quantity}}</td>
      </tr>
      <tr>
        <td v-if="waste.is_collected">Collectable - Oui</td>
        <td v-else>Collectable - Non</td>
      </tr>
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
    ...mapMutations(["setUser", "setToken", "setAction", "setId"]),
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
    },
    async deleteWaste(id) {
      await fetch("http://localhost:8080/api/wastes/"+id, {
        method: "DELETE"
      })
      this.wastes = await this.getWaste();
    },
    createWaste() {
      this.setAction('create');
      this.$router.push('/waste');
    },
    updateWaste(id) {
      this.setAction('update');
      this.setId(id);
      this.$router.push('/waste');
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

