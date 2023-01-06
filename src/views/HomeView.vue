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
import {useToast, POSITION} from "vue-toastification";
export default {
  data() {
    return {
      wastes: null,
      toast: useToast()
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
    async getWaste() {
      const response = await fetch("http://localhost:8080/api/wastes");
      const json = await response.json();
      if (response.status === 200) {
        return json;
      } else {
        const json = await response.json();
        this.toast.error(json.message, {position: POSITION.BOTTOM_RIGHT});
      }
    },
    async deleteWaste(id) {
     const response = await fetch("http://localhost:8080/api/wastes/"+id, {
        method: "DELETE"
      })
      if (response.status === 200) {
        this.toast.success('Le déchet a été supprimé', {position: POSITION.BOTTOM_RIGHT});
        this.wastes = await this.getWaste();
      } else {
        const json = await response.json();
        this.toast.error(json.message, {position: POSITION.BOTTOM_RIGHT});
      }
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

