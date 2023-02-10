<template>
  <img alt="Vue logo" src="./assets/logo.png" @click="event.click">
</template>

<script>
// import axios from 'axios'

export default {
  name: 'App',
  components: {
  },
  setup() {
    // axios.get('/oauth2/authorization/google').then((res) => {
    //   console.log('KSH::Court', res.data)
    // })

    const event = {
      click: ()=> {
        console.log('click')
        location.href = 'http://localhost:8080/oauth2/authorization/google'
      },
    }

    return {
      event
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
