<template>
  <div class='my-gauge' ref='gaugeDomRef'>
    <div class='title'>{{ option?.title }}</div>
    <div class='content'>
      <div style='width: 100%;height: 100%' ref='chartDomRef'>
      </div>
    </div>
  </div>
</template>

<script name='gauge-widget' setup>
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import elementResizeDetectorMaker from 'element-resize-detector'
import {useHomeStore} from '@/store/home-store'
import { ref, nextTick, onMounted, watch } from 'vue'

const homeStore = useHomeStore();
const thresholdSetting = homeStore.thresholdSetting;

const gaugeDomRef=ref(null);
const chartDomRef = ref(null);
const props = defineProps({
  option: Object
})

let chart

watch([thresholdSetting, props.option],
  () => {
    drawChart()
  },
  { immediate: false, deep: true }
)


function csulColor(value) {
  if (!thresholdSetting.value || thresholdSetting.value.length <= 0) {
    if (value <= 15) {
      return '#67e382'
    } else if (value <= 27) {
      return '#e5a31e'
    } else {
      return '#ee1922'
    }
  } else {
    try {
      thresholdSetting.value.sort((a, b) => {
        return parseFloat(a.val) - parseFloat(b.val)
      })
      for (let threshold in props.option.threshold) {
        if (value <= parseFloat(threshold.val)) {
          return threshold.color
        }
      }
      return '#ee1922'
    } catch (e) {
      console.error("仪表盘颜色设置错误",e)
    }
  }
}

function waterGraphColor() {
  if (!thresholdSetting.value || thresholdSetting.value.length <= 0) {
    return [
      [0.15, '#67e382'],
      [0.27, '#e5a31e'],
      [1, '#ee1922']
    ]
  }

  return thresholdSetting.value.map(e => {
    return [e.val, e.color]
  })
}

function drawChart() {
  if (props.option?.type == 'ruler') {
    drawWaterGraph(props.option?.val)
  } else if (props.option?.type == 'tilt') {
    drawCsulGraph(props.option?.val)
  }
}

function drawWaterGraph(value) {
  let option = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '55%'],
        radius: '90%',
        axisLine: {
          show: true,

          lineStyle: {
            width: 11,
            color: waterGraphColor()
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -10,
          length: 4,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitLine: {
          distance: -10,
          length: 10,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        axisLabel: {
          color: 'auto',
          distance: 13,
          fontSize: 6
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} cm',
          color: 'auto',
          fontSize: 16
        },
        data: [
          {
            value: value
          }
        ]
      }
    ]
  }

  chart.setOption(option)

}

function drawCsulGraph(value) {
  let val = value / 100
  let color = csulColor(value)
  let option = {
    series: [
      {
        type: 'liquidFill',
        outline: {
          show: false
        },
        shape: 'circle',
        radius: '75%',
        itemStyle: {
          color: color,
          shadowBlur: 0,
          opacity: .7
        },
        data: [val],
        label: {
          show: true,
          fontSize: 35,
          color: color,
          formatter: function(obj) {
            return obj.value * 100
          }
        }
      }
    ]
  }
  chart.setOption(option)
}

onMounted(() => {
  let erd = elementResizeDetectorMaker()
  nextTick(()=>{
    chart = echarts.init(chartDomRef.value)
    erd.listenTo(gaugeDomRef.value, () => {
      chart.resize()
    })
    drawChart(props.option?.val)
  })


})

</script>

<style scoped lang='less'>
.my-gauge {
  width: 100%;
  height: 100%;

  .title {
    height: 16px;
    font-size: 14px;
    color: white;
    text-align: center;
  }

  .content {
    padding-bottom: 10px;
    width: 100%;
    height: 100%;
    text-align: center;
    //vertical-align: middle;
    font-size: 60px;
    color: white;
  }

}
</style>
