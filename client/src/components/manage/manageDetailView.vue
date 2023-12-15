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
    
    <ManageBlock
      ref="manageBlock"/>

    
    <div v-for="item in blocks">
      <ManageSmallBlock
        :ref = "(el) => { el.blockId = item.id; el.block = item.name; el.smallBlocks = item.smallBlocks; }" />
    </div>

    <ManageSensor/>
  </v-card>

</template>
  
  <script>
  import FarmService from '@/services/farmService'
  import ManageBlock from '@/components/manage/blockComponent.vue'
  import ManageSmallBlock from '@/components/manage/smallBlockComponent.vue'
  import ManageSensor from '@/components/manage/sensorComponent.vue'
  
  export default {
    components: { ManageBlock, ManageSmallBlock, ManageSensor },
    data: () => ({
      blocks:[],
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
        const farmId = this.$store.state.route.params.farmId
        const farm = (await FarmService.get(farmId)).data
        this.$refs.manageBlock.blocks = farm.blocks
        this.$refs.manageBlock.farmId = farmId
        this.blocks = farm.blocks
      },
    }
  }
  </script>
  