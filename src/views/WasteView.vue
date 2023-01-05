<template>
  <HeaderComponent></HeaderComponent>
  <div class="waste">
    <div class="choice">
      <p v-if="action === 'create'" style="font-weight: bold">Créer un déchet</p>
      <p v-else style="font-weight: bold">Modifier un déchet</p>
      <p><router-link to="/home"><button>Tous les déchets</button></router-link></p>
    </div>
    <form>
      <div class="form">
        <label>Nom du déchet</label>
        <input type="text" v-model="label" />
      </div>
      <div class="form">
        <label>Compagnie</label>
        <input type="text" v-model="issuing_company" />
      </div>
      <div class="form">
        <label>Quantité</label>
        <input type="number" v-model="quantity" />
      </div>
      <div class="form">
        <label>Date d'expiration</label>
        <input type="date" v-model="expiration_date" />
      </div>
      <div class="form">
        <label>Collectable</label>
        <input type="checkbox" v-model="is_collected" />
      </div>
      <div v-if="action === 'create'">
        <input type="submit" @click="onSubmit()" value="Envoyer">
      </div>
      <div v-else>
        <input type="submit" @click="onEdit()" value="Modifier">
      </div>
    </form>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import {mapGetters} from "vuex";
export default {
  data() {
    return {
      label: null,
      issuing_company: null,
      quantity: null,
      expiration_date: null,
      is_collected : false,
      id: null,
      action: null,
      waste: null
    }
  },
  components: {
    HeaderComponent
  },
  computed: {
    ...mapGetters(["getId", "getAction"]),
  },
  async mounted() {
    this.id = this.getId;
    this.action = this.getAction;
    if (this.action === "update") this.waste = await this.getWaste();
    this.label = this.waste.label;
    this.issuing_company = this.waste.issuing_company;
    this.quantity = this.waste.quantity;
    this.expiration_date = this.waste.expiration_date;
    this.is_collected = this.waste.is_collected;
  },
  methods: {
    async onSubmit() {
      await fetch("http://localhost:8080/api/wastes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: this.label,
          issuing_company: this.issuing_company,
          quantity: this.quantity,
          expiration_date: this.expiration_date,
          is_collected: this.is_collected,
        }),
      });
    },
    async onEdit() {
      await fetch("http://localhost:8080/api/wastes/"+this.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: this.label,
          issuing_company: this.issuing_company,
          quantity: this.quantity,
          expiration_date: this.expiration_date,
          is_collected: this.is_collected,
        }),
      });
    },
    async getWaste() {
      return await fetch("http://localhost:8080/api/wastes/"+this.id).then(response => response.json()).then(data => {return data});
    }
  }
};
</script>
<style scoped>
.waste {
  text-align: -webkit-center;
}

.choice {
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}

form {
  width: 30%;
}

.form {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}

input {
  margin-top: 2em;
}
</style>

