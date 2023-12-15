<template>
    <div 
      v-if="!$store.state.isUserLoggedIn"
      class="d-flex text-center justify-center mt-2">
      <p>You have not login in yet, click the 
        <router-link
          :to="{
            name: 'loginView'
          }"
          color="primary">
          log in url
        </router-link>
      </p> 
    </div>
    
    <div v-else>
      <slot>
        No slot content defined.
      </slot>
      <BottomNav/>
    </div>
  
</template>
  
<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
  name: 'Interface',
  components: {
    BottomNav
  },
  data() {
    return {
    }  
  }
}
</script>

<style scoped>
.background{
  margin: 10px;
  padding: 5px;
  padding-top: 60px;
  background-color: #fff;
  border-radius: 15px;
  max-width: 600px;
}
</style>
