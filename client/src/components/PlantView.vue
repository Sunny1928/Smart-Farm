<template>
  <Interface>
    <div>
      <div class="d-flex justify-center align-center background">
        <v-card
          flat>
          <v-tabs
            v-model="currentItem"
            background-color="white"
            show-arrows>
            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
            <v-tab
              v-for="item in blockNames"
              :href="'#tab-' + item">
                {{item}}
            </v-tab>
          </v-tabs>
        </v-card>
      </div>
      <div class="background">
        <v-tabs-items v-model="currentItem">
          <v-tab-item
            v-for="(item,index) in blocks"
            :key="(item,index)"
            :value="'tab-' + item.name">
            <v-card flat>
              <div v-for="smallBlock in blocks[index].smallBlocks">
                <v-card
                  flat
                  class="mx-auto"
                  :to="{
                    name: 'SP',
                    params: {
                      smallBlockId: smallBlock.id
                    }
                  }">
                  
                  <v-list-item three-line>
                    <v-icon
                      class="ma-1 mr-3"
                      size="80"
                      color="">
                      mdi-sprout
                    </v-icon>
                    <v-list-item-content class="text-center">
                      <v-list-item-title class="text-body-1 font-weight-light mb-1">
                        <b>{{smallBlock.name}}</b>
                      </v-list-item-title>
                      <div
                        class="d-flex justify-center align-center ">
                        <div>
                          <div
                            class="text-subtitle-1 ma-0 font-weight-light">
                            溫度：{{ smallBlock.temperatureData }}°C
                          </div>
                          <div
                            class="text-subtitle-1 ma-0 font-weight-light">
                            濕度：{{ smallBlock.humidityData }}%
                          </div>
                        </div>
                        
                      </div>
                    </v-list-item-content>
                    <v-progress-circular
                        :rotate="-90"
                        :size="60"
                        :width="5"
                        :value="smallBlock.healthData"
                        :color="smallBlock.healthData > 85 ? 'primary' : 'yellow darken-2'"
                        class="text-center ma-2"> 
                          {{ smallBlock.healthData }}%
                        </v-progress-circular>
                  </v-list-item>
                </v-card>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        

      </div>
    </div>
  </Interface>
</template>
  
<script>
import Interface from './Interface.vue'
import FarmService from '@/services/farmService'
import UserService from '@/services/userService'

export default {
  name: 'PlantView',
  components: {
    Interface
  },
  data() {
    return {
      currentItem: 'tab-',
      blockChoose:'',
      plants:[
        {
          name:"第一台攝影機",
          health: 93,
          temperature: 26,
          humidity: 100,
        },
        {
          name:"第二台攝影機",
          health: 80,
          temperature: 28,
          humidity: 80,
        },
        {
          name:"第三台攝影機",
          health: 95,
          temperature: 25.9,
          humidity: 100,
        },
        {
          name:"第四台攝影機",
          health: 98,
          temperature: 29.9,
          humidity: 100,
        },
        {
          name:"第五台攝影機",
          health: 97,
          temperature: 26.9,
          humidity: 100,
        },
      ],
      blockNames:[
      ],
      small_blocks:[
        'west',
        'east',
        'south',
        'north',
      ],
      required: (value) => !!value || 'Required.',
      error:'',
    }
  },
  computed:{
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize(){
      try{
        let res = (await FarmService.get(this.$store.state.user.farmId)).data
        // let res = (await FarmService.get(1)).data
        this.blockNames = res.blocks.map(value=>value.name)
        this.currentItem = `tab-${this.blockNames[0]}`,
        this.blocks = res.blocks
        this.blocks.forEach(block =>{
          block.smallBlocks.forEach(smallBlock =>{
            smallBlock.healthData = smallBlock.healthDatas[0].value
            smallBlock.humidityData = smallBlock.humidityDatas[0].value
            smallBlock.temperatureData = smallBlock.temperatureDatas[0].value
          })
        })
      }catch(error){
        if(error.response.status==403){
          let refreshToken = this.$store.state.refreshToken
          if(refreshToken == null){
            this.$store.dispatch('setAccessToken', null)
            this.$store.dispatch('setRefreshToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
              name: 'loginView'
            })
          }else{
            try{
              let item = {
                userId: this.$store.state.user.id,
                token: refreshToken
              }
              const res = (await UserService.refreshToken(item)).data
              this.$store.dispatch('setAccessToken', res.accessToken)
              this.$store.dispatch('setRefreshToken', res.refreshToken)
              window.location.reload()
            }catch(err){
              console.log(err)
            }
          }
        }
      }
    }
  },
}
</script>

<style scoped>
.background{
  margin: 10px auto;
  width: 95%;
  padding: 5px;
  background-color: #fff;
  border-radius: 15px;
  max-width: 600px;
}
.icon-btn{
  padding: 10px;
}

i.v-icon.v-icon {
  color: rgb(115, 200, 96);
} 
</style>
