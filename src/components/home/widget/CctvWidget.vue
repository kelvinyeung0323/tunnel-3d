<template>
  <div class="widget">
    <CctvPlayer :option="option"/>
  </div>
</template>
<script name="cctv-widget" setup>
import CctvPlayer from '@/components/cctv/CctvPlayer.vue'
import {reactive } from 'vue'

const option =reactive({
  suuid:"1",
  isPlay:false,
  deviceId:1,
  deviceName:"名称",
})

</script>


<style lang="less" scoped>
.widget {
  padding: 20px;
  background-color: rgba(0, 0, 0, .3);
  border-radius: 15px;
  width: 300px;
  height: 225px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5)
}
</style>