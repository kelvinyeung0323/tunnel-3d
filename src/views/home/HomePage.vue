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
                                <el-button type='success' @click.stop.prevent='handleOpenCctvMgt' circle>
                                    <el-icon>
                                        <VideoCamera />
                                    </el-icon>
                                </el-button>
                            </el-tooltip>

                        </div>
                        <div class='report-btn'>
                            <el-tooltip class='box-item' effect='dark' content='报表数据' placement='top-start'>
                                <el-button type='warning' @click.stop.prevent='handleOpenReport' circle>
                                    <el-icon>
                                        <DataLine />
                                    </el-icon>
                                </el-button>
                            </el-tooltip>

                        </div>

                    </el-space>
                </el-col>
                <el-col :span='8' class='col-mid'>
                    <h3>隧道监控系统</h3>
                </el-col>
                <el-col :span='8' class='col-right'>
                    <el-space>
                        <div>
                            <el-switch v-model='dashboard.show' inline-prompt
                                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="仪表盘"
                                inactive-text='仪表盘' />
                        </div>
                        <!-- <div class='settings-btn'>
                            <el-tooltip class='box-item' effect='dark' content='设置' placement='top-start'>
                                <el-button type="default" :icon="Setting" circle @click="go2Settings">
                                </el-button>
                            </el-tooltip>

                        </div> -->
                        <div class='profile'>
                            <el-dropdown>
                                <span class='el-dropdown-link'>
                                    <el-avatar style='cursor: pointer;'>kelvin</el-avatar>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="handleOpenProfile">我的</el-dropdown-item>
                                        <el-dropdown-item @click="go2Settings">设置</el-dropdown-item>
                                        <el-dropdown-item @click="handleLogOut">退出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>

                    </el-space>
                </el-col>

            </el-row>
        </el-header>
        <el-main class='container-main'>
            <TunnelView />
            <Transition name="dashboard-slide">
                <div class='bottom-widget' v-show="dashboard.show">
                    <WaterLevelWidget class='water-level-widget' />
                </div>
            </Transition>

            <Transition name="cctv-left" v-show="dashboard.show">
                <CctvWidget class='cctv-left' />
            </Transition>


            <Transition name="cctv-right">
                <CctvWidget class='cctv-right' v-show="dashboard.show" />
            </Transition>



        </el-main>
        <el-drawer class='modal-class' v-model='drawer.show' size='92%' :title='drawer.title' :direction='drawer.direction'
            :before-close='handleClose'>
            <router-view v-slot='{ Component, route }'>
                <component :is='Component' :key='$route.path' />
            </router-view>
        </el-drawer>
        <el-dialog v-model="userProfile.dialogVisible" title="我的">
            <MyProfile />
        </el-dialog>
    </el-container>
</template>

<script name='home-page' setup>
import TunnelView from '@/views/tunnel/TunnelView.vue'
import { Platform, VideoCamera, DataLine, Setting } from '@element-plus/icons-vue'
import WaterLevelWidget from './widget/WaterLevelWidget.vue'
import CctvWidget from './widget/CctvWidget.vue'
import { reactive, ref, watch, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import MyProfile from './MyProfile.vue'

const { proxy } = getCurrentInstance()
const router = useRouter()

const drawer = reactive({
    title: '设备列表',
    show: false,
    direction: 'btt'
})
const dashboard = reactive({
    show: true
})

const userProfile = reactive({
    dialogVisible: false,
})

watch(router.currentRoute,
    () => {
        let route = proxy.$route
        console.log('route name:', route.name)
        if (route.name == 'device') {
            drawer.show = true;
        } else if (route.name == 'report') {
            drawer.show = true;
        }
    },
    { immediate: true }
)

const toDeviceList = () => {
    proxy.$router.replace('/device')

}
const handleOpenReport = () => {
    proxy.$router.replace('/report')

}

const handleClose = () => {
    drawer.show = false;
    router.replace('/');
}

const go2Settings = () => {
    router.push("/settings");
}

const handleOpenProfile = () => {
    userProfile.dialogVisible = true;
}
const handleLogOut = () => {
    router.push("/login");
}
const handleOpenCctvMgt = () => {
    let href = router.resolve({
        name: 'cctv',
        path: '/cctv',
    });
    window.open(href.href, "_blank");
}
</script>

<style lang='less' scoped>
.container {
    background-image: linear-gradient(180deg, blue, rgb(212, 27, 219));


    .header {
        // background-color: #2d3780;
        vertical-align: middle;
        justify-content: center;
        justify-items: center;
        align-content: center;
        align-items: center;
        display: flex;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, .8);

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
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .col-right {
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
        }

    }


    .container-main {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;

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

}

.container :deep(.el-drawer) {
    // background-color: #0e1025e9;

    border-radius: 10px 10px 0px 0px;
    // opacity: .8;
    // margin-left: 10px;
    margin-right: 30px;
    width: 100%;

    .el-drawer__header {
        margin-bottom: 0px;

    }

}


.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.dashboard-slide-enter-active {
    transition: all 0.1s ease-out;
}

.dashboard-slide-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.dashboard-slide-enter-from,
.dashboard-slide-leave-to {
    transform: translateY(80px);
    opacity: 0;

}


.cctv-right-enter-active {
    transition: all 0.1s ease-out;
}

.cctv-right-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.cctv-right-enter-from,
.cctv-right-leave-to {
    transform: translate(80px);
    opacity: 0;

}





.cctv-left-enter-active {
    transition: all 0.1s ease-out;
}

.cctv-left-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.cctv-left-enter-from,
.cctv-left-leave-to {
    transform: translate(-80px);
    opacity: 0;

}
</style>