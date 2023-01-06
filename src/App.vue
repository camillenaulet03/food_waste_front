<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: #D6F7D7;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input[type=submit] {
  padding: 5px 15px;
  background: #f4f4f4;
  border: 1px black solid;;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

input[type=text] {
  padding: 5px 15px;
  background: #f4f4f4;
  border: 1px black solid;;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

input[type=password] {
  padding: 5px 15px;
  background: #f4f4f4;
  border: 1px black solid;;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

input[type=number] {
  padding: 5px 15px;
  background: #f4f4f4;
  border: 1px black solid;;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

input[type=date] {
  padding: 5px 15px;
  background: #f4f4f4;
  border: 1px black solid;;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

input[type=checkbox] {
  width: 1.15em;
  height: 1.15em;
}

button {
  padding: 5px 15px;
  background: #f4f4f4;
  border: 1px black solid;;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
