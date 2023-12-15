<template>
  <Interface>
    <div class="background">
      <div class=" pa-3 d-flex justify-center align-center">
        <h2 class="ma-0"><b>{{farm}}</b></h2>
      </div>
    </div>
      <div class="background">
        <v-list-item two-line>
          <v-list-item-avatar
            size="80">
            <v-img src="@/assets/farmer.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{user.name}}
            </v-list-item-title>
            <v-list-item-subtitle>          
              {{user.permission}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-row
          class="ma-2">
          <v-col>
            <v-dialog
              v-model="dialog"
              max-width="500px">
              <template v-slot:activator="{ on, attrs }">
              <v-btn
                  width="100%"
                  color="grey lighten-1"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on">
                  編輯使用者
              </v-btn>
              </template>

              <v-card>
              <v-card-title>
                  <span class="text-h5">編輯使用者</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.name"
                      label="使用者名稱"
                      :rules="[required]">
                    </v-text-field>
                    <v-text-field
                      v-model="editedItem.permission"
                      label="使用者權限"
                      :rules="[required]">
                    </v-text-field>
                    <v-text-field
                      v-model="warmingValue"
                      label="農場健康度警示"
                      :rules="[required]">
                    </v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close">
                  取消
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  :disabled="editedItem.name==''">
                  儲存
                </v-btn>
              </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col>
          <v-btn
            width="100%"
            color="primary"
            @click="logout">
            登出
          </v-btn>
        </v-col>
        </v-row>
      </div>
      <div class="background">
        <div class=" pa-3 d-flex justify-center align-center">
          <h2 class="ma-0"><b>管理使用者</b></h2>
          <v-spacer></v-spacer>
          <!-- <v-dialog
            v-model="dialogAdd"
            max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                color="primary"
                v-bind="attrs"
                v-on="on">
                <v-icon>mdi-plus-thick</v-icon>
                Add
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">Add new user</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.account"
                      label="User Account"
                      :rules="[required]">
                    </v-text-field>
                  </v-row>
                </v-container>

                <v-container v-if="error" class="danger-alert">
                  {{error}}
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close">
                  取消
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  :disabled="editedItem.account==''">
                  儲存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
        </div>
        
        <div v-for="(item, index) in users">
          <v-divider
            v-if="index!=0"
            class="ma-0">
          </v-divider>
          <v-card
            flat
            class="mx-auto">
            
            <v-list-item two-line>
              <v-list-item-avatar
                size="80">
                <v-img src="@/assets/farmer.png"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{item.name}}
                </v-list-item-title>
                <v-list-item-subtitle>          
                  {{item.permission}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
        
      </div>
      <div class="background">
        <div class="pa-3 d-flex justify-center align-center">
          <h2 class="ma-0"><b>回報問題</b></h2>
          <v-spacer></v-spacer>
        </div>
        <div class="pa-3 d-flex justify-center align-center">
          <v-textarea
            filled
            auto-grow
            label="輸入您遇到的問題"
            rows="4"
            row-height="30"
            v-model='email.message'            
            shaped>
          </v-textarea>
        </div>
        <div class="mr-3 mb-3 d-flex justify-center align-center">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            depressed
            @click="sendEmail">
            傳送
          </v-btn>
        </div>
        
      </div>
      <!-- <div class="background">
        <div class="pa-3 d-flex justify-center align-center">
          <h2 class="ma-0"><b>Change Farm</b></h2>
          <v-spacer></v-spacer>
        </div>
        <div class="d-flex justify-center align-center">
          <v-sheet
            flat
            class="mx-auto"
            elevation="0"
            width="100%">
            <v-slide-group
              v-model="model"
              show-arrows>
              <v-slide-item
                v-for="(item, index) in farms"
                :key="index"
                v-slot="{ active, toggle }">
                <v-card
                  :color="active ? 'primary' : 'grey lighten-1'"
                  class="ma-4"
                  height="150"
                  width="150"
                  @click="toggle">
                  <v-row
                    class="ma-0 fill-height align-center justify-center">
                    <div 
                      color="white"
                      class="text-center">
                      <p
                        class="mb-2 white--text font-weight-black"
                        color="white">
                        {{item.name}}
                      </p>
                      <v-scale-transition>
                        <v-icon
                          v-if="active"
                          color="white"
                          size="48"
                          v-text="'mdi-share-circle'">
                        </v-icon>
                      </v-scale-transition>
                    </div>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </div>
      </div> -->
  </Interface>
</template>

<script>
import UserService from '@/services/userService'
import FarmService from '@/services/farmService'
import Interface from './Interface.vue'
import emailjs from 'emailjs-com';

export default {
  name: 'AccountView',
  components: {
    Interface
},
  data() {
    return {
      warmingValue: null,
      required: (value) => !!value || 'Required.',
      user:{},
      users:[],
      model:'',
      farm:'',
      editedItem: {
        name: '',
        permission:''
      },
      dialog: false,
      email: {
        to_name:'Smart Farm',
        message:'',
      }
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  created () {
    // this.$loading(true)
    this.initialize()
    // this.$loading(false)
  },

  methods: {
    async initialize(){
      try {
        const userId = this.$store.state.user.id
        const res = await UserService.get(userId)
        this.user = res.data
        if(this.user.farmId != null){
          this.farm = this.user.farm.name
          this.warmingValue = this.user.farm.warmingValue
          this.users= this.user.farm.users.filter(user => user.id !== userId)
          this.users= this.user.farm.users.filter(user => user.permission !== 'sensor')
        }
        this.editedItem = this.user
      }catch(error){
        // console.log(error)
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
                token: refreshToken,
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
    },
    async logout(){
      UserService.logout()
      this.$store.dispatch('setAccessToken', null)
      this.$store.dispatch('setRefreshToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'loginView'
      })
    },

    close () {
      this.dialog = false
    },

    async save () {
      this.$loading(true)
      try{
        await UserService.put(this.editedItem)
        let farmItem = this.user.farm
        farmItem.warmingValue = parseInt(this.warmingValue)
        await FarmService.put(farmItem)
        window.location.reload()
      }catch(err){
        console.log(err)
      }
      this.close()
      this.$loading(false)
    },

    sendEmail() {
      try {
        emailjs.send('service_f4h41tk', 'template_uau0dse', {
          to_name: this.email.to_name,
          message: this.email.message
        }, 'rsvKD2Tp_GBu2M59v')
      } catch(error) {
          console.log(error)
      }
      // Reset form field
      this.email.to_name = 'Smart Farm'
      this.email.message = ''
    },
  }
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
