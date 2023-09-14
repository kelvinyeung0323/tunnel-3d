<template>
  <div ref="myPlayerDom" :class="isFullScreen ? 'component-view full-screen' : 'component-view normal-screen'"
    @dblclick="onToggleFullScreen" @mouseenter="() => controllerVisible = true" @mouseleave="() => controllerVisible = false">

    <!--  <video  class="my-player" autoplay muted controls ref="videoElem">-->
    <video class="my-player" autoplay muted ref="videoElem">
    </video>
    <div class="header-bar">
      <div class="title">
        <span>{{ option.deviceName }}</span>
      </div>
      <div @click="onToggleFullScreen"
        :class="isFullScreen ? 'full-screen-btn icon-my-fullscreen-cancel' : 'full-screen-btn icon-my-fullscreen'">
      </div>
    </div>
    <!--  <transition appear  enter-active-class="show-controller" leave-active-class="hide-controller">-->
    <VueDragResize v-show="controllerVisible" content-class="drag-class" :x="control.x" :y="control.y" :h="control.height"
      :w="control.width" :key="control.key" :parent-h="control.parentHeight" :parent-w="control.parentWidth"
      :isActive="true" :isDraggable="true" :parentLimitation="true" :isResizable="false">
      <cctv-controller :deviceId="option.deviceId" />
    </VueDragResize>
    <!--  </transition>-->
    <!--  <div class="controller" style="position: absolute;top:0;left:0;width: 100px;height: 100px">-->
    <!--    -->
    <!--  </div>-->
  </div>
</template>


<script setup name="cctv-player">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch, } from "vue";
import { getCodecInfo, getRemoteSdp } from '@/api/cctv-api.js'
import CctvController from "./CctvController.vue"
import VueDragResize from 'vue3-drag-resize';
import elementResizeDetectorMaker from "element-resize-detector";
import { uuid } from "@/utils/uuid";

const props = defineProps({
  option: {
    type: Object,
    required: true,
  },

});
const controllerVisible = ref(false);
const isFullScreen = ref(false);
const videoElem = ref(null);
const myPlayerDom = ref(null);
const suuid = props.option.suuid;
const control = reactive({
  height: 120,
  width: 120,
  x: 120,
  y: 120,
  key: uuid(),
  parentHeight: 120,
  parentWidth: 120,
})

defineExpose({
  suuid
})

function onToggleFullScreen() {

  isFullScreen.value = !isFullScreen.value
  if (isFullScreen.value) {
    if (myPlayerDom.value.requestFullscreen) {
      myPlayerDom.value.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      myPlayerDom.value.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      myPlayerDom.value.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      myPlayerDom.value.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

}


watch(() => props.option.isPlay, (newV, oldV) => {
  // console.log("oldV:",oldV,"newV:",newV)
  swithPlay(newV, oldV);
})

//======================= 以下是PeerConnection处理 =========================================
let stream = null;
let pc = null;
const config = {
  iceServers: [{
    urls: ["stun:stun.l.google.com:19302"]
  }]
}

async function handleNegotiationNeededEvent() {
  let offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  fetchRemoteSdp();
}


function fetchCodecInfo() {
  getCodecInfo(suuid).then((resp) => {
    let data = [];
    try {
      if (typeof resp.data == 'string') {
        console.warn("codec is empty", data)
      } else {
        data = resp.data;
      }
      // console.log(data);
    } catch (e) {
      console.log("Exception:", e);
    } finally {
      data.forEach((v) => {
        pc.addTransceiver(v.Type, {
          'direction': 'sendrecv'
        })
      })
    }
  });
}





function fetchRemoteSdp() {
  getRemoteSdp(suuid, pc.localDescription.sdp).then((resp) => {
    try {
      let data = resp.data;
      pc.setRemoteDescription(new RTCSessionDescription({
        type: 'answer',
        sdp: atob(data)
      }))
    } catch (e) {
      console.warn(e);
    }
  });
}

function setupVideo() {
  stream = new MediaStream();
  pc = new RTCPeerConnection(config);
  pc.onnegotiationneeded = handleNegotiationNeededEvent;
  //当连接状态改变时打印日志
  pc.oniceconnectionstatechange = e => console.log("webrtc", pc.iceConnectionState)
  //获取编码信息
  fetchCodecInfo();
  pc.ontrack = function (event) {
    stream.addTrack(event.track);

    videoElem.value.srcObject = stream;
    console.log(suuid + ": " + event.streams.length + ' track is delivered')
  }

}


function closeVideo() {
  console.log("close video")
  if (pc) {
    console.log("a")
    pc.close();
  }
  videoElem.value.srcObject = null
  stream = null;
  pc = null;
}
function swithPlay(newVal, oldVal) {
  if (newVal) {
    setupVideo();
  } else {
    closeVideo();
  }
}
onMounted(() => {
  if (props.option.isPlay) {
    setupVideo();
  }



  let erd = elementResizeDetectorMaker();

  nextTick(() => {

    //初始控制器位置
    let rects = myPlayerDom.value.getBoundingClientRect();
    control.x = rects.width - control.width * 1.5;
    control.y = rects.height - control.height * 1.5;
    control.parentWidth = rects.width;
    control.parentHeight = rects.height;


    //监听画布大小变化 //改变控制器位置
    erd.listenTo(myPlayerDom.value, () => {
      let rects = myPlayerDom.value.getBoundingClientRect();
      // control.x =rects.width * control.x/control.parentWidth
      // control.y =  rects.height * control.y/control.parentHeight;
      control.x = rects.width - control.width * 1.1;
      control.y = rects.height - control.height * 1.6;
      control.parentWidth = rects.width;
      control.parentHeight = rects.height;
      control.key = uuid();
    });
  });
})


onBeforeUnmount(() => {
  closeVideo()
})




</script>

<style scoped lang="less">
@import "@/assets/styles/k-icon.less";

.full-screen {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.normal-screen {
  position: relative;
  position: center;
  width: 100%;
  height: 100%;
  z-index: auto;
  //min-height: 150px;
}

.component-view {

  //width: 100%;
  //height: 100%;

  background-color: #3e3e3e;

  .my-player {
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    //background-image: url("@/assets/images/player-background.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .header-bar {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 40px;
    background-color: rgba(10, 10, 10, 0);
    display: inline-flex;
    justify-content: space-between;
    justify-items: center;
    align-items: center;

    .title {
      margin-left: 10px;
      color: white;
    }

    .full-screen-btn {
      display: none;
    }
  }
}

.header-bar:hover {
  background-color: rgba(80, 79, 79, 0.7);

  .full-screen-btn {
    opacity: 0.7;
    margin-right: 10px;
    width: 30px;
    height: 30px;
    display: block;
  }

  .full-screen-btn:hover {
    width: 32px;
    height: 32px;
    display: block;
    //box-shadow: 2px 2px 5px 2px #314255;
  }
}

.drag-class {
  &.vdr.active:before {
    outline: none !important;
  }

}

.show-controller {
  animation: zoomIn;
  animation-duration: .5s;
}

.hide-controller {
  animation: zoomOut;
  animation-duration: .5s;
}
</style>
