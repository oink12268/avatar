<template>
  <img alt="Vue logo" src="./assets/logo.png" @click="event.click">
  <router-view></router-view>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',

  components: {
  },
  setup() {
    const event = {
      click: ()=> {
        const param = {
          categoryName: 'food'
        }
        axios.post('/api/admin/category', param).then((res) => {
          console.log('KSH::Court', res.data)
        })
      },
    }

    return {
      event
    }
  }
}
</script>
