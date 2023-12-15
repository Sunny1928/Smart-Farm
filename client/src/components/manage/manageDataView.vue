<template>
  <v-card>
    <v-btn
      color = 'primary'
      text
      :to="{
        name: 'manage'
      }">
      manage
    </v-btn>
    <HealthDataComponent 
      ref = "health"/>
    <HumidityDataComponent 
      ref = "humidity"/>
    <TemperatureDataComponent 
      ref = "temperature"/>
  </v-card>
</template>
  
  <script>
  import SmallBlockService from '@/services/smallBlockService'
  import HealthDataComponent from '@/components/manage/healthDataComponent.vue'
  import HumidityDataComponent from '@/components/manage/humidityDataComponent.vue'
  import TemperatureDataComponent from '@/components/manage/temperatureDataComponent.vue'
  
  export default {
    components: { HealthDataComponent, HumidityDataComponent, TemperatureDataComponent },
    data: () => ({
      blocks:[],
      smallBlock:{}
    }),
  
    computed: {
    },
  
    watch: {
    },
  
    created () {
      this.$loading(true)
      this.initialize()
      this.$loading(false)
    },
  
    methods: {
      async initialize () {
        const smallBlockId = this.$store.state.route.params.smallBlockId
        this.smallBlock = (await SmallBlockService.get(smallBlockId)).data
        this.$refs.health.smallBlockId = this.smallBlock.id
        this.$refs.health.smallBlock = this.smallBlock.name
        this.$refs.health.healthDatas = this.smallBlock.healthDatas
        this.$refs.humidity.smallBlockId = this.smallBlock.id
        this.$refs.humidity.smallBlock = this.smallBlock.name
        this.$refs.humidity.humidityDatas = this.smallBlock.humidityDatas
        this.$refs.temperature.smallBlockId = this.smallBlock.id
        this.$refs.temperature.smallBlock = this.smallBlock.name
        this.$refs.temperature.temperatureDatas = this.smallBlock.temperatureDatas
      },
    }
  }
  </script>
  