<template>
  <Interface>
    <div>
      <v-app-bar
        absolute
        color="white">
        <v-btn
          width="40"
          height="40"
          min-width="0"
          text
          class="mr-3" 
          :to="{
            name: 'plantView'
          }">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>

        <v-toolbar-title>{{plant.name}}</v-toolbar-title>

        <v-spacer></v-spacer>

      </v-app-bar>
      <v-sheet 
        class="overflow-y-auto background ">
        <!-- 560 135 -->
        <img 
          data-v-2b2a7bad="" 
          id="video" 
          width="100%" 
          src="@/assets/farm.png"
          >
          <!-- src="http://219.86.140.31:8903/video.mjpg" -->

        <v-row
          class="d-flex justify-center align-center ma-4">
          <v-col
            class="d-flex justify-center align-center">
            <div
              class="text-center">
              <v-progress-circular
              :rotate="-90"
              :size="70"
              :width="7"
              :value="nowHealth"
              :color="nowHealth > 85 ? 'primary' : 'yellow darken-2'"> 
                {{ nowHealth }}%
              </v-progress-circular>
              <p
                class="primary--text overline">
                健康度
              </p>
            </div>
          </v-col>
          <v-col
            class="d-flex justify-center align-center">
            <div class="text-center">
              <v-progress-circular
              :rotate="-90"
              :size="70"
              :width="7"
              :value="nowTemperature"
              color="primary"> 
                {{ nowTemperature }}°C
              </v-progress-circular>
              <p
                class="primary--text overline">
                溫度
              </p>
            </div>
          </v-col>
          <v-col
            class="d-flex justify-center align-center">
            <div class="text-center">
              <v-progress-circular
              :rotate="-90"
              :size="70"
              :width="7"
              :value="nowHumidity"
              color="primary"> 
                {{ nowHumidity }}%
              </v-progress-circular>
              <p
                class="primary--text overline">
                濕度
              </p>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <Apexchart 
          type="line" 
          height="350" 
          :options="chartOptions" 
          :series="series">
        </Apexchart>
      </v-sheet>
    </div>
  </Interface>
</template>

<script>
import Interface from './Interface.vue'
import Apexchart from 'vue-apexcharts'
import smallBlockService from '@/services/smallBlockService'
import UserService from '@/services/userService'

export default {
  name: 'SP',
  components: {
    Interface,
    Apexchart,
  },
  data() {
    return {
      series: [
        {
          name: "健康度",
          data: [],
        },
        {
          name: "溫度",
          data: []
        },
        {
          name: "濕度",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        colors: ["#388E3C", "#FFA000", "#039BE5"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [5, 5, 5],
          curve: 'straight',
          dashArray: [0, 0, 0]
        },
        title: {
          text: '感測器曲線圖',
          align: 'center'
        },
        legend: {
          tooltipHoverFormatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
        },
        xaxis: {
          categories: [],
        },
        yaxis: [
        {
            max: 100,
            // min: (min) => {
            //   min = Math.min(...series[0]["data"]);
            //   console.log("Min:", min);
            //   return min;
            // },
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#00897B"
            },
            labels: {
              style: {
                colors: "#00897B"
              }
            },
            title: {
              text: "健康度/濕度(%)",
              style: {
                color: "#00897B"
              }
            }
          },
          {
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#FFA000"
            },
            labels: {
              style: {
                colors: "#FFA000"
              }
            },
            title: {
              text: "溫度(°C)",
              style: {
                color: "#FFA000"
              }
            }
          },
          {
            show: false,
            max: 100,
            min: (min) => {
              return min;
            },
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#039BE5"
            },
            labels: {
              style: {
                colors: "#039BE5"
              }
            },
            title: {
              text: "濕度",
              style: {
                color: "#039BE5"
              }
            }
          }
        ],
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val+"(%)"
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val + "(°C)"
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val+"(%)"
                }
              }
            }
          ]
        },
        grid: {
          borderColor: '#f1f1f1',
        }
      },
      smallBlockId: null,
      plant:{
      },
      required: (value) => !!value || 'Required.',
      error:'',
    }
  },
  created () {
    this.$loading(true)
    this.initialize()
    this.$loading(false)
  },
  computed: {
    nowHealth () {
      return this.plant.healthDatas[this.plant.healthDatas.length - 1].value
    },
    nowHumidity () {
      return this.plant.humidityDatas[this.plant.humidityDatas.length - 1].value
    },
    nowTemperature () {
      return this.plant.temperatureDatas[this.plant.temperatureDatas.length - 1].value
    },
  },
  methods: {
    async initialize(){
      this.fromLineWatch()
      this.smallBlockId = this.$store.state.route.params.smallBlockId
      try{
        this.plant = (await smallBlockService.getNewest(this.smallBlockId)).data
        this.series[1].data = this.plant.temperatureDatas.map(data=>data.value)
        this.series[2].data = this.plant.humidityDatas.map(data=>data.value)
        let healthArr = []
        this.plant.healthDatas.forEach(data=>{
          if(data.value == -1) healthArr.push(null)
          else healthArr.push(data.value)
        })
        this.series[0].data = healthArr

        this.chartOptions.yaxis[1].min = Math.min(...this.series[1]["data"]);
        let hemin = Math.min(...this.series[0]["data"])
        let humin = Math.min(...this.series[2]["data"])
        if(hemin<humin){
          this.chartOptions.yaxis[0].min = hemin
          this.chartOptions.yaxis[2].min = hemin
        }else{
          this.chartOptions.yaxis[0].min = humin
          this.chartOptions.yaxis[2].min = humin
        }
        let timeArr = []
        let predata = this.plant.healthDatas[0].createdAt
        this.plant.healthDatas.forEach(data=>{
          let a = (new Date(predata)).getDate()
          let b = (new Date(data.createdAt)).getDate()
          if(a != b) {
            timeArr.push(data.createdAt.substring(10,16))
          }
          timeArr.push(data.createdAt.substring(10,16))
          predata = data.createdAt
        })
        this.chartOptions.xaxis.categories = timeArr
        // this.chartOptions.xaxis.categories = this.plant.temperatureDatas.map(data=>this.dataString(data.createdAt))

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
      }
    },
    dateString(x){
      return x.substring(10,16)
    }
  },
}
</script>

<style scoped>
.background{
  margin: 10px auto;
  width: 95%;
  padding: 5px;
  padding-top: 60px;
  background-color: #fff;
  border-radius: 15px;
  max-width: 600px;
}
</style>

