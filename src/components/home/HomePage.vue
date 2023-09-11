<template>
  <el-container class='container'>
    <el-header class='header'>
      <el-row class='row'>

        <el-col :span='8' class='col-left'>
          <el-space wrap :size='20'>
            <div class='device-list-btn'>
              <el-tooltip class='box-item' effect='dark' content='查看设备列表' placement='top-start'>
                <el-button type='primary' @click.stop.prevent='toDeviceList' circle>
                  <el-icon>
                    <Platform />
                  </el-icon>
                </el-button>
              </el-tooltip>
            </div>
            <div class='cctv-btn'>
              <el-tooltip class='box-item' effect='dark' content='视频监控' placement='top-start'>
                <el-button type='success' @click.stop.prevent='toDeviceList' circle>
                  <el-icon>
                    <VideoCamera />
                  </el-icon>
                </el-button>
              </el-tooltip>

            </div>
            <div class='report-btn'>
              <el-tooltip class='box-item' effect='dark' content='报表数据' placement='top-start'>
                <el-button type='warning' @click.stop.prevent='toDeviceList' circle>
                  <el-icon>
                    <DataLine />
                  </el-icon>
                </el-button>
              </el-tooltip>

            </div>
            <div>
              <el-switch v-model='dashboard.show' inactive-text='仪表盘' />
            </div>
          </el-space>
        </el-col>
        <el-col :span='8' class='col-mid'>
          <h3>Tunnel Monitor</h3>
        </el-col>
        <el-col :span='8' class='col-right'>
          <div class='profile'>
            <el-dropdown>
                            <span class='el-dropdown-link'>
                                <el-avatar style='cursor: pointer;'>kelvin</el-avatar>
                            </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Profile</el-dropdown-item>
                  <el-dropdown-item>Log out</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-col>

      </el-row>
    </el-header>
    <el-main class='container-main'>
      <TunnelView />
      <div class='bottom-widget'>
        <WaterLevelWidget class='water-level-widget' />
      </div>
      <CctvWidget class='cctv-left' />


      <CctvWidget class='cctv-right' />


    </el-main>
    <el-drawer class='modal-class' v-model='drawer.show' size='92%' :title='drawer.title' :direction='drawer.direction'
               :before-close='handleClose'>
      <router-view v-slot='{ Component, route }'>
        <component :is='Component' :key='$route.path' />
      </router-view>
    </el-drawer>
  </el-container>
</template>

<script name='home-page' setup>
import TunnelView from './TunnelView.vue'
import { Platform, VideoCamera, DataLine } from '@element-plus/icons-vue'
import WaterLevelWidget from './widget/WaterLevelWidget.vue'
import CctvWidget from './widget/CctvWidget.vue'
import { reactive, ref, watch, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()


const drawer = reactive({
  title: '设备列表',
  show: false,
  direction: 'btt'
})
const dashboard = reactive({
  show: false
})

watch(proxy.$router.currentRoute,
  () => {
    let route = proxy.$route
    console.log('route name:', route.name)
    if (route.name == 'device') {
      drawer.show = true
    }
  },
  { immediate: true }
)

function toDeviceList() {
  proxy.$router.replace('/device')

}

function handleClose() {
  drawer.show = false
  proxy.$router.replace('/')
}


</script>

<style lang='less' scoped>
.header {
  background-color: #2d3780;
  vertical-align: middle;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  display: flex;

  .row {
    align-items: center;
    flex-direction: row;
    display: flex;
    width: 100%;

    .col-left {
      display: flex;
      justify-content: flex-start;
    }

    .col-mid {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .col-right {
      display: flex;
      justify-content: flex-end;
    }
  }

}

.container :deep(.el-drawer) {
  background-color: #0e1025e9;
  border-radius: 10px 10px 0px 0px;
  // opacity: .8;
  // margin-left: 10px;
  margin-right: 30px;
  width: 100%;

}

.container-main {
  position: relative;

  .bottom-widget {
    position: absolute;
    bottom: 10px;
    left: 0px;
    width: 100%;
    display: flex;
    justify-content: center;

  }

  .cctv-left {
    position: absolute;
    top: 80px;
    left: 20px;
  }

  .cctv-right {
    position: absolute;
    top: 80px;
    right: 20px;
  }
}


</style>