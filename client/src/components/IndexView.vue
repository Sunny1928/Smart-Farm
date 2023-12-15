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
      <v-card-text class="text-center">
        Smartfarm can help you manage your farm! 
        
      </v-card-text >
        
      <div class="d-flex justify-center">
        <v-btn
          color="primary"
          :to="{
            name: 'loginView'
          }">
          Start Smartfarm!
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'IndexView',
  created(){
    this.initialize()
  },
  methods:{
    initialize(){
      if (this.$store.state.isUserLoggedIn){
        this.$router.push({
          name: 'homeView'
        })
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
