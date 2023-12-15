<template>
  <Interface>
    <div>
      <div class="note-section background">
        <div class=" pa-3 d-flex justify-center align-center">
          <h2 class="ma-0"><b>通知</b></h2>
          <v-spacer></v-spacer>
        </div>

        <v-dialog
            v-model="dialogShow"
            max-width="600">
            <v-card
              class="mx-auto"
              max-width="600px"
              outlined>
              <v-card-title class="text-h6">
                <v-icon 
                  v-if="showedItem.icon == 0"
                  class="mr-4">
                  mdi-chat
                </v-icon>
                <v-icon 
                  v-else-if="showedItem.icon == 1"
                  class="mr-4"
                  color="yellow darken-2">
                  mdi-alert-octagram
                </v-icon>
                {{showedItem.title}}
              </v-card-title>
              <v-card-text>
                <div class="text-overline">
                  <div class="d-flex" v-if="showedItem.block_id!=''">
                  <v-icon>mdi-map-marker</v-icon>
                  {{showedItem.smallBlock.block.name}} - {{showedItem.smallBlock.name}}
                  </div>
                  <v-spacer></v-spacer>
                  {{showedItem.createdAt}}
                </div>
                {{showedItem.comment}}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  :to="{
                    name: 'SP',
                    params:{
                      smallBlockId: showedItem.smallBlockId
                    }
                  }">
                  查看農場
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeItem">
                  關閉
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        
        <div v-for="(item, index) in notes">
          <v-card
            flat
            class="mx-auto"
            max-width="600"
            @click= "showItem(item)">
            <v-divider
              v-if="index!=0"
              class="ma-0">
            </v-divider>
            <v-list-item three-line>

              <v-icon 
                v-if="item.icon == 0"
                class="mr-4">
                mdi-chat
              </v-icon>
              <v-icon 
                v-else-if="item.icon == 1"
                class="mr-4"
                color="yellow darken-2">
                mdi-alert-octagram
              </v-icon>

              <v-list-item-content>
                <div class="text-overline">
                  {{item.createdAt}}
                </div>
                <v-list-item-title class="text-h6">
                  {{item.title}}
                </v-list-item-title>
                <v-list-item-subtitle>          
                  {{item.comment}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
      </div>
    </div>
  </Interface>
</template>

<script>
import Interface from './Interface.vue'
import FarmService from '@/services/farmService'
import UserService from '@/services/userService'

export default {
  name: 'HomeView',
  components: {
    Interface
  },
  data() {
    return {
      dialogAdd: false,
      dialogShow: false,
      editedIndex: -1,
      showedItem: {
        title: '',
        block_id: '',
        small_block_id: '',
        comment: '',
      },
      defaultItem: {
        title: '',
        block_id: '',
        small_block_id: '',
        comment: '',
      },
      notes:[
        
      ],
      required: (value) => !!value || 'Required.',
      error:'',
    }
  },
  created(){
    this.initialize()
  },
  methods: {
    async initialize(){
      this.fromLineWatch()
      try{
        let res = (await FarmService.get(this.$store.state.user.farmId)).data
        this.notes = res.notes
      }catch(error){
        console.log(error)
        if(error.response.status==403){
          console.log("refresh")
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
              // console.log(res)
              this.$store.dispatch('setAccessToken', res.accessToken)
              this.$store.dispatch('setRefreshToken', res.refreshToken)
              window.location.reload()
            }catch(err){
              console.log(err)
            }
          }
        }
      }
      
    },
    fromLineWatch(){
      const url = window.location.href
      if(url.includes('?')){
        const linkToken = url.split('?')[1].split('&')
        let user ={
          id: linkToken[1],
          farmId: linkToken[0]
        }
        this.$store.dispatch('setAccessToken', linkToken[2])
        this.$store.dispatch('setRefreshToken', null)
        this.$store.dispatch('setUser', user)
        console.log('hi')
      }
    },
    showItem(item){
      this.showedItem = Object.assign({}, item)
      this.dialogShow = true
    },
    closeItem(){
      this.dialogShow = false
      this.$nextTick(() => {
        this.showedItem = Object.assign({}, this.defaultItem)
      })
    },
    
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
</style>
