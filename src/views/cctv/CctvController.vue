<template>
  <div class="triangle" style="border: 1px solid rgba(0,0,0,0.2);">
    <div class="box" style="transform: rotate(-22.5deg) skewY(-45deg);" @dblclick.stop.prevent="() => { }"
      @click.prevent.stop="handleControl('上')">
      <button class="butp" style="transform: skewY(45deg) rotate(22.5deg);border:none">
        <el-icon class="butp2">
          <CaretTop />
        </el-icon>
      </button>
    </div>
    <div class="box" style="transform: rotate(22.5deg) skewY(-45deg);" @dblclick.stop.prevent="() => { }"
      @click.prevent.stop="handleControl('右上')">
      <button class="butp" style=" transform: skewY(45deg) rotate(22.5deg);border:none">
        <el-icon class="butp2">
          <CaretTop />
        </el-icon>
      </button>
    </div>

    <div class="box" style="transform: rotate(67.5deg) skewY(-45deg);" @dblclick.stop.prevent="() => { }"
      @click.prevent.stop="handleControl('右')">
      <button class="butp" style=" transform: skewY(45deg) rotate(22.5deg);border:none;">
        <el-icon class="butp2">
          <CaretTop />
        </el-icon>
      </button>
    </div>
    <div class="box" style="transform: rotate(112.5deg) skewY(-45deg);" @dblclick.stop.prevent="() => { }"
      @click.prevent.stop="handleControl('右下')">
      <button class="butp" style="transform: skewY(45deg) rotate(22.5deg);border:none;">
        <el-icon class="butp2">
          <CaretTop />
        </el-icon>
      </button>
    </div>
    <div class="box" style=" transform: rotate(157.5deg) skewY(-45deg);" @dblclick.stop.prevent="() => { }"
      @click.prevent.stop="handleControl('下')">
      <button class="butp" style=" transform: skewY(45deg) rotate(22.5deg);border:none;">
        <el-icon class="butp2">
          <CaretTop />
        </el-icon>
      </button>
    </div>
    <div class="box" style=" transform: rotate(202.5deg) skewY(-45deg);" @dblclick.stop.prevent="() => { }"
      @click.prevent.stop="handleControl('左下')">
      <button class="butp" style=" transform: skewY(45deg) rotate(22.5deg);border:none;">
        <el-icon class="butp2">
          <CaretTop />
        </el-icon>
      </button>
    </div>
    <div class="box" style=" transform: rotate(247.5deg) skewY(-45deg);" @dblclick.stop.prevent="() => { }"
      @click.prevent.stop="handleControl('左')">
      <button class="butp" style=" transform: skewY(45deg) rotate(22.5deg);border:none;">
        <el-icon class="butp2">
          <CaretTop />
        </el-icon>
      </button>
    </div>
    <div class="box" style="transform: rotate(292.5deg) skewY(-45deg);" @dblclick.stop.prevent="() => { }"
      @click.prevent.stop="handleControl('左上')">
      <button class="butp" style="transform: skewY(45deg) rotate(22.5deg);border:none;">
        <el-icon class="butp2">
          <CaretTop />
        </el-icon>
      </button>
    </div>
    <div class="center">
      <button class="btn-center" @click="() => ctrlExp = !ctrlExp">

      </button>
    </div>
  </div>
</template>

<script setup name="cctv-controller">
import { getCurrentInstance, ref } from 'vue';
// import {operatingCamera} from '@/api/tunnel/equipment'
import { CaretTop } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance();
const props = defineProps({
  deviceId: {
    type: String,
    required: true,
  }
})
const ctrlExp = ref(true)

function handleControl(cmd) {
  // proxy.$modal.loading("发送命令中...")
  // operatingCamera(props.equipmentId,cmd).then((res)=>{
  //   console.log("命令[",cmd,"]发送成功")
  // }).catch(reason=>{
  //   console.log("命令[",cmd,"]发送失败",reason)
  // }).finally(()=>{
  //   // proxy.$modal.closeLoading()
  // })
}


</script>

<style scoped lang="less">
.triangle {
  position: absolute;
  width: 120px;
  height: 120px;
  //margin-left: 5%;
  //top:12%;
  background-color: rgba(0, 0, 0, .5);
  overflow: hidden;
  border-radius: 50%;
  border: none !important;

  .box {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    height: 50%;
    width: 50%;
    transform-origin: 0% 100%;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(0, 0, 0, 1);
    //clip: rect(0px,60px,60px,0px);
    box-shadow: inset 0 0 50px 0px rgba(114, 114, 114, .1);

    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: inset 0 0 50px 0px rgba(114, 114, 114, .4);
    }

    &:focus {
      background-color: #409EFF;
      box-shadow: inset 0 0 50px 0px rgba(114, 114, 114, .4);
    }

    &:active {
      background-color: #409EFF;
      box-shadow: inset 0 0 50px 0px rgba(114, 114, 114, .4);
    }

  }
}


.butp2 {
  width: 100%;
  height: 100%;
  color: white;
  //top: 50%;
  //left: 50%;
  margin-left: 3px;
  margin-top: 25px;
}

.butp {
  padding: 0;
  background-color: transparent;
  position: absolute;
  width: 45px;
  height: 45px;
  //margin-top: 20px;

}

.center {
  position: absolute;
  top: calc(50% - 22px);
  left: calc(50% - 22px);
  width: 44px;
  height: 44px;
  border-radius: 50%;

  .btn-center {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid rgba(116, 115, 115, .2);
    background-color: rgba(0, 0, 0, 1);

    &:hover {
      box-shadow: inset 0 0 5px 0px #B3C0D1;
      cursor: move;
    }

  }
}</style>
