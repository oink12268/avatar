<template>
  <v-app>
    <v-main>
      <v-container class="text-center">
        <div class="justify-md-center">
          <v-img class="align-content-center" max-height="600px" max-width="200px" src="../assets/btn_google_signin_dark_focus_web.png" @click="event.click"></v-img>
          <v-img class="align-content-center mt-5" max-height="600px" max-width="200px" src="../assets/kakao_login_medium_narrow.png" @click="event.click2"></v-img>
          <v-img class="align-content-center mt-5" max-height="600px" max-width="200px" src="../assets/naver_login.png" @click="event.click3"></v-img>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "LoginView",
  components: {
  },
  setup() {
    const event = {
      click: ()=> {
        console.log('click')
        location.href = 'http://localhost:8080/oauth2/authorization/google'
      },
      click2: ()=> {
        console.log('click')
        location.href = 'http://localhost:8080/oauth2/authorization/kakao'
      },
      click3: ()=> {
        console.log('click')
        location.href = 'http://localhost:8080/oauth2/authorization/naver'
      },
    }

    return {
      event
    }
  }
};
</script>

<style scoped>

</style>
