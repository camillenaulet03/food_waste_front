<template>
  <div>

    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["getUser"]),
  },
  methods: {
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
      this.$router.push("/");
    }
  }
};
</script>

