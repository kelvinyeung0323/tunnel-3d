<template>
  <div ref="pageViewDom" class="page-view">
    <el-row>
      <div style="height:25px"></div>
    </el-row>
    <el-row :gutter="0" class="cctv-box">
      <el-col class="cctv-item" :span="8" v-for="v in data.cctvList" :key="v.no">
        <my-player  :option="v" />
      </el-col>
    </el-row>
    <vue-drag-resize
        :parentLimitation="true"
        :parentW="pageWidth"
        :parentH="pageHeight"
        :y="0"
        :x="0"
        :h="isCCtvToolVisible?0:0"
        :w="220"
        :isActive="true"
        :isDraggable="true"
        :isResizable="false">
      <div class="element-box">
        <div class="title">
          <span>设备栏</span>
          <div class="btn" @click="()=>{isCCtvToolVisible= !isCCtvToolVisible}">
            <el-icon>
              <CaretTop v-if="isCCtvToolVisible"/>
              <CaretBottom v-else/>
            </el-icon>
<!--            <i :class="isCCtvToolVisible?'el-icon-caret-top':'el-icon-caret-bottom'"/>-->
          </div>
        </div>
        <div class="content" v-if="isCCtvToolVisible">
          <div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
          </div>
          <el-checkbox-group v-model="checkedList" @change="handleCheckedDevicesChange">
            <div v-for="cctv in data.cctvList" :key="cctv.no">
              <el-checkbox  :label="cctv.no" @change="(checked)=>handleCheckChange(checked,cctv.no)">{{ cctv.equipmentName }}</el-checkbox>
            </div>

          </el-checkbox-group>
        </div>
      </div>
    </vue-drag-resize>
  </div>
</template>

<script setup name="cctv-mgt">
import MyPlayer from "@/views/cctv/my-player";
import VueDragResize from 'vue-drag-resize';
import elementResizeDetectorMaker from "element-resize-detector";
import {onMounted, ref, nextTick, reactive, computed} from "vue";
import {toRefs} from "@vueuse/core";
import {listEquipment} from "@/api/tunnel/equipment.js"
import {equipmentTypes} from "@/utils/tunnel-enums.js"

const pageViewDom = ref(null);
const cctvCheckBoxDom = ref([]);
onMounted(() => {
  let erd = elementResizeDetectorMaker();
  nextTick(() => {
    //监听画布大小变化
    erd.listenTo(pageViewDom.value, () => {
      let rects = pageViewDom.value.getBoundingClientRect();
      pageWidth.value = rects.width;
      pageHeight.value = rects.height;

    });

  });
  getCctvList();

});


const isCCtvToolVisible = ref(true);
const pageWidth = ref(0);
const pageHeight = ref(0);
const data= reactive({
  cctvList:[]
})


const checkAll = ref(false);
const checkedList = ref([]);
const isIndeterminate = ref(true);


function handleCheckAllChange(val) {
  console.log("val",val)
  checkedList.value = val ? data.cctvList.map(e => e.no) : [];
  isIndeterminate.value = false;
  handleCheckListChange();
}

function handleCheckedDevicesChange(value) {
  handleCheckListChange();
  let checkedCount = value.length;
  checkAll.value = checkedCount === data.cctvList.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < data.cctvList.length;
}

function handleCheckListChange(){
  data.cctvList.forEach(c=>{
    c.isPlay =  contains(checkedList.value,c.no)
    console.log(c.isPlay);
  })
  saveOpenedCCtv();
}

function contains(arr,key){
  for (let i = 0; i < arr.length; i++) {
    if(arr[i] ==key){
      return true;
    }
  }
  return false;
}
function handleCheckChange(checked,cctv){

}

//获取视图设备列表 equipmentType=8
function getCctvList(){
  listEquipment({equipmentType:equipmentTypes.CCTV.code}).then((res)=>{
    console.log('resp',res)
      let openedCctv = getOpenedCctv();
      res.rows?.forEach((value,index)=>{

        let item={};
        item.no = value.id;
        item.equipmentName = value.equipmentName;
        item.url = value.rtsp;
        item.suuid = value.equipmentName;
        item.isPlay=false;
        //默认选前几个
        if(index<2){

        }
        if(isExists(openedCctv,item.no)){
          item.isPlay = true;
          checkedList.value.push(item.no);
        }
        data.cctvList.push(item)
      });



  })
}
function isExists(arr,val){
  for (let i = 0; i < arr.length; i++) {
     if(parseInt(arr[i]) == val){
       return true;
     }
  }
  return false;
}
function getOpenedCctv(){
  console.log("getOpenedCctv")
  if(localStorage){
    let arr = localStorage.getItem("cctv-default-open")?.split(",");
    console.log("getOpenedCctv",arr)
    return arr?arr:[]
  }
}
function saveOpenedCCtv(){

  let val = checkedList.value.join(",");
  console.log("saveOpenedCCtv",checkedList,val)
  localStorage.setItem("cctv-default-open",val);
}

</script>

<style scoped lang="less">
.page-view {
  height: 100%;
}

.cctv-box {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
  align-content: flex-start;
  align-items: flex-start;
  justify-items: flex-start;
  //height: 400px;
  .cctv-item {
    //width: 200px;
    //mini-height: 200px;
    border: 1px solid #aaa9a9;
  }
}

.device-selectio {
  z-index: 99999;
}

.element-box {
  width: 220px;
  //background-color: red;
  z-index: 9999999;

  //padding: 5px;
  //阴影
  box-shadow: 2px 2px 5px 2px #314255;

  .title {
    background-color: #2c3e50;
    //margin-bottom: 10px;
    background-color: #2c3e50;
    color: #d3dce6;
    cursor: move;
    text-align: center;
    font-size: 9px;
    padding: 5px 2px;
    border-bottom: 1px solid rgba(175, 175, 175, 0.3);

    .btn {
      position: absolute;
      top: 5px;
      right: 0px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  .content {
    background-color: rgba(44, 62, 80, 0.8);
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    /*padding: ;*/
    //flex-wrap: wrap;
    align-content: center;
    align-items: flex-start;

    justify-content: flex-start;

    .el-checkbox {
      color: white !important;
    }

  }
  :deep(.el-checkbox__label) {
    display: inline-grid;
    width:195px;
    white-space: pre-line;
    word-wrap: break-word;
    line-height: 20px;
  }
  .el-button {
    margin: 5px;
  }
}

.vdr.active:before {
  outline: 0px dashed #d6d6d6 !important;
}
</style>
