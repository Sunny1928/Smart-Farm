<template>
  <div 
    class="fill-height d-flex justify-center align-center">
    <v-card
      class="ma-5 background"
      flat>
      <v-card-title class="justify-center">
        <v-img
          max-height="100"
          max-width="150"
          src="@/assets/logo.png">
        </v-img>
      </v-card-title>

      <v-tabs
        v-model="tab"
        grow
        class="mb-2">
        <v-tab
          href="#login">
          登入
        </v-tab>
        <v-tab
          href="#signup">
          註冊
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          value="login">
          <v-card
            color="basil"
            flat>
            <v-card-text>
              <v-text-field
                class=""
                v-model="account"
                label="帳號"
                outlined>
              </v-text-field>
              <v-text-field
                v-model="password"
                label="密碼"
                type="password"
                outlined>
              </v-text-field>
              <div class="danger-alert" v-if="error_login">{{error_login}}</div>
              <div
                class="d-flex">
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  class="pa-5"
                  color="primary"
                  @click="login">
                  登入
                </v-btn>
              </div>
              
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
          value="signup">
          <v-card
            color="basil"
            flat>
            <v-card-text>
              <v-text-field
                class="mt-2"
                v-model="account"
                label="帳號"
                outlined>
              </v-text-field>
              <v-text-field
                v-model="password"
                label="密碼"
                outlined>
              </v-text-field>
              <v-text-field
                class="mt-2"
                v-model="name"
                label="名字"
                outlined>
              </v-text-field>
              <v-text-field
                class="mt-2"
                v-model="farmId"
                label="農場編號"
                outlined>
              </v-text-field>
              <div class="success-alert" v-if="success_register">{{success_register}}</div>
              <div class="danger-alert" v-if="error_register">{{error_register}}</div>
              <div
                class="d-flex">
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  class="pa-5"
                  color="primary"
                  @click="register">
                  註冊
                </v-btn>
              </div>
              
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import user from '@/services/userService'

export default {
  name: 'LoginView',
  components: {
  },
  setup(){

  },
  data() {
    return {
      tab: 'login',
      account:'',
      password:'',
      farmId:'',
      name:'',
      error_login: null,
      error_register: null,
      success_register: null
    }
  },
  created(){
    this.initialize()
  },
  methods: {
    initialize(){
      if (this.$store.state.isUserLoggedIn){
        this.$router.push({
          name: 'homeView'
        })
      }
    },
    async register(){
      this.success_register = ''
      this.error_register = ''
      try {
        const response = await user.register({
          account: this.account,
          password: this.password,
          name: this.name,
          farmId: this.farmId
        })
        this.success_register = response.data.success
      }catch(error){
        this.error_register = error.response.data.error
        console.log(error)
      }
    },
    async login(){
      const url = window.location.href
      try {
        const response = await user.login({
          account: this.account,
          password: this.password
        })
        // console.log(response)
        if(url.includes('?')){
          const linkToken = url.split('?')[1].split('&')[0].split('=')[1]
          location.assign("https://access.line.me/dialog/bot/accountLink?linkToken="+linkToken+"&nonce="+response.data.user.id+'|'+response.data.accessToken)
        }else{
          this.$store.dispatch('setAccessToken', response.data.accessToken)
          this.$store.dispatch('setRefreshToken', response.data.refreshToken)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
            name: 'homeView'
          })
        }
      }catch(error){
        this.error_login = error.response.data.error
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.background{
  width: 95%;
  padding: 10px;
  background-color: #fff;
  border-radius: 15px;
  max-width: 600px;
}
</style>
