<template>
    <div class="widget">

      <el-row>
        <el-col  :span='4' v-for="(item,key) in options" :key="key">
          <div>
            <GaugeWidget  :option="item"/>
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<script name="water-level-widget" setup>
import GaugeWidget from './GaugeWidget.vue'
import { reactive } from 'vue'

const options=reactive([{
  title:"电子水尺-海珠01",
  threshold:[],
  type:"ruler",
  val:12,
},{
  title:"超声波液位计-海珠",
  threshold:[],
  type:"tilt",
  val:12,
},{
  title:"电子水尺-海珠02",
  threshold:[],
  type:"ruler",
  val:12,
},{
  title:"电子水尺-天河01",
  threshold:[],
  type:"ruler",
  val:12,
},{
  title:"超声波液位计-天河",
  threshold:[],
  type:"tilt",
  val:12,
},{
  title:"电子水尺-天河02",
  threshold:[],
  type:"ruler",
  val:12,
}])

</script>


<style lang="less" scoped>
.widget {
  padding: 20px;
    background-color: rgba(0, 0, 0, .3);
    border-radius: 15px;
    width: 90%;
    height: 100px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5)
}
</style>