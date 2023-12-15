<template>
  <div>
  <img 
    data-v-2b2a7bad="" 
    id="video" 
    width="100%" 
    src="data:image/png;base64,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"/>
  
  <img 
    data-v-2b2a7bad="" 
    id="video" 
    width="100%" 
    src="http://mjpeg.sanford.io/count.mjpeg"/>
    <img 
      data-v-2b2a7bad="" 
      width="100%" 
      src="http://219.86.140.31:8903/video.mjpg">
    </div>

    
</template>
  
<script>
import Interface from './Interface.vue'
import apexchart from 'vue-apexcharts'

export default {
  name: 'SP',
  components: {
    Interface,
    apexchart,
  },
  data() {
    return {
      series: [{
              name: "溫度",
              data: [26, 25.9, 26, 25.9, 25.8, 26.9, 29.9, 27, 34.4, 38.4]
            },
            {
              name: "濕度",
              data: [100, 100, 100, 100, 100, 95, 93.9, 68, 76, 82]
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
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: [5, 7, 5],
              curve: 'straight',
              dashArray: [0, 8, 5]
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
              hover: {
                sizeOffset: 6
              }
            },
            xaxis: {
              categories: ['01 Sep', '02 Sep', '03 Sep', '04 Sep', '05 Sep', '06 Sep', '07 Sep', '08 Sep', '09 Sep','10 Sep'],
            },
            tooltip: {
              y: [
                {
                  title: {
                    formatter: function (val) {
                      return val + " (°C)"
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val
                    }
                  }
                }
              ]
            },
            grid: {
              borderColor: '#f1f1f1',
            }
          },
      blockChoose:'',
      plant:{
        name:"第二台攝影機",
        health: 80,
        temperature: 28,
        humidty: 80,
        live_stream: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      required: (value) => !!value || 'Required.',
      error:'',
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
    }
  },
  methods: {
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
