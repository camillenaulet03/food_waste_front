<template>
  <HeaderComponent></HeaderComponent>
  <div class="waste">
    <div class="choice">
      <p v-if="action === 'create'" style="font-weight: bold">Créer un déchet</p>
      <p v-else style="font-weight: bold">Modifier un déchet</p>
      <p><router-link to="/home"><button>Tous les déchets</button></router-link></p>
    </div>
    <form onsubmit="return false;">
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
        <input type="submit" @click="onSubmit" value="Envoyer">
      </div>
      <div v-else>
        <input type="submit" @click="onEdit" value="Modifier">
      </div>
    </form>
    <div v-if="action === 'update'" class="substract">
      <p>Soustraire deux nombres</p>
      <input class="number" type="number" v-model="number1" />
      <p> - </p>
      <input class="number" type="number" v-model="number2" />
      <input type="submit" @click="substract" value="Soustraire">
    </div>
    <div v-if="result">
      <p>Résultat de la soustraction: {{result}}</p>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import {mapGetters} from "vuex";
import {useToast, POSITION} from "vue-toastification";
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
      waste: null,
      number1: null,
      number2: null,
      result: null,
      username: null,
      token: null
    }
  },
  components: {
    HeaderComponent
  },
  computed: {
    ...mapGetters(["getId", "getAction", "getUser", "getToken"]),
  },
  async mounted() {
    this.id = this.getId;
    this.action = this.getAction;
    this.username = await this.getUser.username;
    this.token = await this.getToken;
    if (this.action === "update") this.waste = await this.getWaste();
    const date = new Date(this.waste.expiration_date);
    this.label = this.waste.label;
    this.issuing_company = this.waste.issuing_company;
    this.quantity = this.waste.quantity;
    this.expiration_date = date.getUTCFullYear() + '-' + date.getUTCMonth() + 1 + '-' + date.getUTCDate();
    this.is_collected = this.waste.is_collected;
  },
  methods: {
    async onSubmit() {
      const toast = useToast();
      if (this.label === null || this.issuing_company === null || this.quantity === null || this.expiration_date === null) toast.error('Tous les champs doivent être remplis', {position: POSITION.BOTTOM_RIGHT});
      else {
        const response = await fetch("http://localhost:8080/api/wastes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "username": this.username,
            "token": this.token
          },
          body: JSON.stringify({
            label: this.label,
            issuing_company: this.issuing_company,
            quantity: this.quantity,
            expiration_date: this.expiration_date,
            is_collected: this.is_collected,
          }),
        });
        if (response.status === 200) toast.success('Le déchet a été créé', {position: POSITION.BOTTOM_RIGHT});
        else {
          const json = await response.json();
          this.toast.error(json.message, {position: POSITION.BOTTOM_RIGHT});
        }
      }
    },
    async onEdit() {
      const toast = useToast();
      if (this.label === '' || this.issuing_company === '' || this.quantity === '' || this.expiration_date === '') toast.error('Tous les champs doivent être remplis', {position: POSITION.BOTTOM_RIGHT});
      else {
        const response = await fetch("http://localhost:8080/api/wastes/"+this.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "username": this.username,
            "token": this.token
          },
          body: JSON.stringify({
            label: this.label,
            issuing_company: this.issuing_company,
            quantity: this.quantity,
            expiration_date: this.expiration_date,
            is_collected: this.is_collected,
          }),
        });
        if (response.status === 200) toast.success('Le déchet a été modifié', {position: POSITION.BOTTOM_RIGHT});
        else {
          const json = await response.json();
          this.toast.error(json.message, {position: POSITION.BOTTOM_RIGHT});
        }
      }
    },
    async getWaste() {
      const response = await fetch("http://localhost:8080/api/wastes/"+this.id, {
        headers: {
          "Content-Type": "application/json",
          "username": this.username,
          "token": this.token
        },
      });
      const json = await response.json();
      if (response.status === 200) return json;
      else this.toast.error(json.message, {position: POSITION.BOTTOM_RIGHT});
    },
    async substract() {
      const toast = useToast();
      const response = await fetch("http://localhost:8080/soap/substract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "username": this.username,
          "token": this.token
        },
        body: JSON.stringify({
          number1: this.number1,
          number2: this.number2
        }),
      });
      if (response.status === 200) this.result = await response.json()
      else {
        toast.error("La sustraction n'a pas pu être effectuée", {position: POSITION.BOTTOM_RIGHT});
      }
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

.substract {
  margin-top: 2em;
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}

.number {
  width: 10%;
}
</style>

