<template>
    <div class="tunnel-view" ref="modelContainer">
        <el-row class="top-tool-bar">
            <el-radio-group v-model="viewPoint">
                <el-radio-button label="1" @click="handleViewPointChange('1')">海珠端</el-radio-button>
                <el-radio-button label="2" @click="handleViewPointChange('2')">海珠端涉水线</el-radio-button>
                <el-radio-button label="3" @click="handleViewPointChange('3')">全景</el-radio-button>
                <el-radio-button label="4" @click="handleViewPointChange('4')">天河端涉水线</el-radio-button>
                <el-radio-button label="5" @click="handleViewPointChange('5')">天河端</el-radio-button>
            </el-radio-group>
        </el-row>
        <div>
            <component v-for="(item, key) in deviceDataMap" :is="getComponentName(item.type)" :key="key" :data="item"
                ref="deviceDialogRefs" :data-model-name="key" v-show="false" @command="handleDialogCommand" />
        </div>
    </div>
</template>

<script name="tunnel-view" setup>
import * as THREE from 'three'
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import tunnelModel from '../../assets/models/tunnel.glb';
import gsap from 'gsap';
import elementResizeDetector from 'element-resize-detector';
import { onMounted, reactive, ref } from 'vue';
import { ModelHelper } from './model-helper';
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import AlarmDialog from './dialog/AlarmDialog.vue'
import TrafficLightDialog from './dialog/TrafficLightDialog.vue'
import FenceDialog from './dialog/FenceDialog.vue'
import CctvDialog from './dialog/CctvDialog.vue'
import TiltDialog from './dialog/TiltDialog.vue'
import RulerDialog from './dialog/RulerDialog.vue'
import IndicatorDialog from './dialog/IndicatorDialog.vue'
import { useTunnelStore } from '@/store/tunnel-store'

const erd = elementResizeDetector();

const tunnelStore = useTunnelStore();
const deviceDataMap = tunnelStore.deviceDataMap;

const mousePointer = new THREE.Vector2();
let INTERSECTED; //鼠标经过的物体，用于保存选中的物件

let raycaster; //射线光，用来探测物体，处理鼠标点选物体
let composer, outlinePass, renderPass; //用于处理选中物体高亮
let modelHelper = new ModelHelper();
let scene, camera, axesHelper, renderer, labelRenderer, controller
let animaitonMixer;//动画相关
//==============弹窗 start=================
const modelContainer = ref(null);//视图容器
//海珠端
const deviceDialogRefs = ref([]);
function getComponentName(type) {
    switch (type) {
        case "tilt":
            return TiltDialog;
        case "alarm":
            return AlarmDialog;
        case "traffic-light":
            return TrafficLightDialog;
        case "ruler":
            return RulerDialog;
        case "indicator":
            return IndicatorDialog;
        case "fence":
            return FenceDialog;
        case "cctv":
            return CctvDialog;
        default:
            console.error("there's no component matched for:", type)
            return "";
    }
}
//=========弹窗 end ========================
//摄像头原始位置
// const cameraOriginPos = {
//     x: 0,
//     y: 70,
//     z: 60,
// }
const cameraOriginPos = {
    x: 74,
    y: 3,
    z: 1,
}
//摄像头视点
const viewPoint = ref(3);
function handleViewPointChange(val) {

    let pos = cameraOriginPos;
    switch (val) {
        case "1":
            pos = {
                x: -83.36802509685346,
                y: 6.54451093401482,
                z: 2.952469993998778,
            }
            break;
        case "2":
            pos = {
                x: -32,
                y: -6,
                z: 4
            }
            break;
        case "3":
            break;
        case "4":
            pos = {
                x: 31,
                y: -6,
                z: -3
            }
            break;
        case "5":
            pos = {
                x: 67.501164602863,
                y: 3.414245490378484,
                z: -8.778182697544263
            }
            break;
    }
    const tween = gsap.to(camera.position, Object.assign({
        duration: 1,
        easing: 'easeInOutQuad'
    }, pos))

    tween.play()

}

let spotLightHelper;
let directLightHelper;
//初始化场景
function initScene() {
    /** Threejs  */
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 0, 0.5, 1000);
    //显示坐标轴
    axesHelper = new THREE.AxesHelper(5)
    //渲染器
    renderer = new THREE.WebGLRenderer();//设置背景色
    renderer.setClearColor(0x2d3780, 1.0);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene.add(axesHelper);

    camera.position.z = cameraOriginPos.z;
    camera.position.x = cameraOriginPos.x;
    camera.position.y = cameraOriginPos.y;
    //灯光
    // const light = new THREE.HemisphereLight(0xffffff, 0x000000, 3.5);
    // scene.add(light);

    //添加环境光
    scene.add(new THREE.AmbientLight(0xffffff, 3.5));
    //添加方向光,照亮道闸
    const hzDirectLight = new THREE.DirectionalLight(0xffffff, 1);
    hzDirectLight.position.set(-70.4, 3, 3);
    hzDirectLight.target.position.set(-67, 2, 3);
    scene.add(hzDirectLight);

    const thDirectLight1 = new THREE.DirectionalLight(0xffffff, 1);
    thDirectLight1.position.set(70.4, 3, -6);
    thDirectLight1.target.position.set(67, 2, -6);
    directLightHelper = new THREE.DirectionalLightHelper(thDirectLight1, 5, 0x00ff00)
    scene.add(thDirectLight1);
    scene.add(directLightHelper);



    //加载模型
    const loader = new GLTFLoader();
    loader.load(tunnelModel, function (gltf) {
        scene.add(gltf.scene);
        //动画
        animaitonMixer = new THREE.AnimationMixer(gltf.scene);
        modelHelper.init(gltf, animaitonMixer);
        // initLabel(scene, camera);
    }, undefined, function (error) {
        console.error("load model error:", error);
    });

    //物体弹窗
    labelRenderer = new CSS2DRenderer();
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = 0;
    labelRenderer.domElement.style.pointerEvents = 'none';


    //让鼠标可以移动视角
    controller = new OrbitControls(camera, renderer.domElement);
    controller.addEventListener("change", function () {
        // console.log("camera posistion:", camera.position);
    });
    //鼠标操作物体
    raycaster = new THREE.Raycaster();


}
//记录鼠标移动的坐标
function onMousePointerMove(event) {
    const rect = modelContainer.value.getBoundingClientRect();
    mousePointer.x = ((event.clientX - rect.x) / modelContainer.value.clientWidth) * 2 - 1;
    mousePointer.y = - ((event.clientY - rect.y) / modelContainer.value.clientHeight) * 2 + 1;

}

//鼠标点击事件
function onMouseClick(event) {
    let viewPoint = modelHelper.modelConfigs.hz_alarm.viewPoint;
    let pos = modelHelper.modelConfigs.hz_alarm.pos;
    if (INTERSECTED) {
        if (!modelHelper.modelConfigMap.hasOwnProperty(INTERSECTED.name)) {
            console.error("there's not a model config for", INTERSECTED.name);
            return;
        }
        let modelConfig = modelHelper.modelConfigMap[INTERSECTED.name];
        let pos = modelConfig.pos;
        let viewPoint = modelConfig.viewPoint;
        const tween = gsap.to(camera.position, Object.assign({
            duration: 1.5,
            easing: 'easeInOutQuad'
        }, viewPoint));
        const tween2 = gsap.to(controller.target, Object.assign({
            duration: 1,
            easing: 'easeInOutQuad'
        }, pos));
        // tween2.play();
        // tween.play();


    } else {

        modelHelper.hideDialog()
        const tween2 = gsap.to(controller.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            easing: 'easeInOutQuad'
        });
    }

}



//鼠标经过物件，高亮物体
function intersectObj() {
    const intersects = raycaster.intersectObjects(modelHelper.deviceObjects, true);
    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {
            INTERSECTED = intersects[0].object;
            let deviceName = INTERSECTED.name;
            let objs = modelHelper.objMap[deviceName] || [];
            outlinePass.selectedObjects = objs;
            modelContainer.value.style.cursor = 'pointer'
            modelHelper.showDialog(deviceName)
            // console.log(INTERSECTED.position);
        }

    } else {
        INTERSECTED = null;
        outlinePass.selectedObjects = []
        modelContainer.value.style.cursor = 'default';

    }
}
//初始化高亮效果
function initOutlineEffectPass() {
    //高亮显示模型（呼吸灯）
    composer = new EffectComposer(renderer)
    // 新建一个场景通道  为了覆盖到原理来的场景上
    renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass);
    // 物体边缘发光通道
    let width = modelContainer.value.clientWidth
    let height = modelContainer.value.clientHeight
    outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera)
    outlinePass.edgeStrength = 10.0  // 边框的亮度
    outlinePass.edgeGlow = 1 // 光晕[0,1]
    outlinePass.usePatternTexture = false // 是否使用父级的材质
    outlinePass.edgeThickness = 1.0 // 边框宽度 
    outlinePass.downSampleRatio = 1   // 边框弯曲度
    outlinePass.pulsePeriod = 5   // 呼吸闪烁的速度
    outlinePass.visibleEdgeColor.set(parseInt(0x00ff00))  // 呼吸显示的颜色
    outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0)   // 呼吸消失的颜色
    outlinePass.clear = true
    composer.addPass(outlinePass)   // 自定义的着色器通道 作为参数
    let effectFXAA = new ShaderPass(FXAAShader)
    effectFXAA.uniforms.resolution.value.set(1 / width, 1 / height)
    effectFXAA.renderToScreen = true
    composer.addPass(effectFXAA)
}


//初始化对话框
function initDialogs() {
    setTimeout(() => {
        modelHelper.initDialogs(deviceDialogRefs.value);
    }, 1000);

}

//处理对话框命令
function handleDialogCommand(cmd) {
    console.log("command:", cmd)
    if (cmd.type == 'indicator') {
        modelHelper.switchIndicator(cmd.modelName, cmd.param);
    } else if (cmd.type == 'fence') {
        modelHelper.switchFence(cmd.modelName, cmd.param);
    } else if (cmd.type == "traffic-light") {
        modelHelper.switchTrafficLight(cmd.modelName, cmd.param);
    } else {
        console.log("It's not a indicator command.");
    }
}

//渲染
function animate() {
    controller.update();
    raycaster.setFromCamera(mousePointer, camera);
    intersectObj();
    // renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    requestAnimationFrame(animate);
    composer.render();
    if (animaitonMixer) {
        animaitonMixer.update(0.02);
    }
    // spotLightHelper.update();
    directLightHelper.update();
}


onMounted(() => {
    initScene();
    initDialogs();
    let width = modelContainer.value.clientWidth;
    let height = modelContainer.value.clientHeight;
    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);

    modelContainer.value.insertBefore(labelRenderer.domElement, modelContainer.value.children[0]);
    modelContainer.value.insertBefore(renderer.domElement, modelContainer.value.children[0]);
    initOutlineEffectPass();
    animate();
    erd.listenTo(modelContainer.value, function () {
        width = modelContainer.value.clientWidth;
        height = modelContainer.value.clientHeight;
        renderer.setSize(width, height);
        controller.update();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        composer.setSize(width, height);
    })
    //加载完再添加监听，不然获取不到元素的宽高
    document.addEventListener('mousemove', onMousePointerMove);
    document.addEventListener('click', onMouseClick);

})
</script>

<style lang="less" scoped>
.tunnel-view {
    width: 100%;
    height: 89.9vh;
    background-color: aqua;
    position: relative;
    top: 0px;
    right: 0px;
}

.top-tool-bar {
    position: absolute;
    width: 100%;
    top: 0px;
    right: 0px;
    justify-content: center;
}
</style>