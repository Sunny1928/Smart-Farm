<template>
  <v-app>
    <v-main>
      <router-view
        class="overflow-y-auto absolute"/>
    </v-main>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  })
}
</script>

<style>
*{
  padding:0;
  margin:0;
}


.v-main__wrap{
  background: #9FC2A0;
}

.danger-alert {
  color: red;
}
.success-alert {
  color: green;
}
</style>