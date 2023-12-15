<template>
  <v-bottom-navigation
    app
    grow
    v-model="value"
    height="64px"
    :color="color">
    <v-btn
      color="white"
      value="home"
      height="100%"
      :to="{
        name: 'homeView'
      }">
      <span>首頁</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      color="white"
      value="plant"
      height="100%"
      :to="{
        name: 'plantView'
      }">
      <span>作物</span>
      <v-icon>mdi-sprout</v-icon>
    </v-btn>

    <v-btn
      color="white"
      value="account"
      height="100%"
      :to="{
        name: 'accountView'
      }">
      <span>帳號</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomNav',
  data: () => ({
    value: 'home',
    color: 'green'
  })
}
</script>
