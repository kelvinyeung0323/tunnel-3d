import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

import { modelConfigs } from "./model-configs";

//材质设置
function initModelMaterials(mesh) {
  if (!mesh.material) {
    return;
  }
  // mesh.material.type = "MeshLambertMaterial";
  if (mesh.name.startsWith("wall")) {
    // console.log("wall materials", mesh.material);

    let m = mesh.material;
    m.transparent = true;
    if (mesh.name == "wall_mid") {
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xa3a2a2,
        roughness: 0.9,
        opacity: 0.9,
        transparent: true,
      });
      mesh.material = material;
    } else {
      m.roughness = 0.9;
      m.opacity = 0.2;
    }
  }

  if (mesh.name == "tunnel") {
    // console.log(mesh.name);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xababab,
      roughness: 0.9, //[0-1] //超粗糙折射光就越弱
    });
    mesh.material = material;
    // const material = new THREE.MeshPhongMaterial({
    //   color: 0x7f7f7f,
    // });
    // mesh.material = material;
    // console.log("mesh", mesh.material);
  }

  if (mesh.name.includes("bar")) {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xa3a2a2,
      roughness: 0.9,
    });
    mesh.material = material;
  }
  if (mesh.name.includes("fence")) {
    // console.log("fence:", mesh.name, mesh);
    // const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
    // mesh.material = material;
  }

  if (
    mesh.name.includes("indicator") &&
    (mesh.name.endsWith("_go") || mesh.name.endsWith("_forbid"))
  ) {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xa3a2a2,
      roughness: 0.9,
    });
    mesh.material = material;
  }

  if (mesh.name.includes("_traffic_")) {
    if (mesh.name.includes("_light_")) {
      mesh.material.transparent = true;
      mesh.material.opacity = 0.1;
    }
    if (mesh.name.includes("_arrow_")) {
      const material = new THREE.MeshStandardMaterial();
      material.color.set(0xff0000);
      material.shininess = 100;
      material.emissive.set(0xff0000);
      // material.specular.set(0xff0000);
      mesh.material = material;
    }
  }
}

class ModelHelper {
  //所有设备物体的数组
  deviceObjects = [];
  //一个影射表，key为模型名称,value为组件模型各组件（物体）的列表
  deviceModels = {};

  currentDialog;
  //一个映射表，key为物体名称，value为对像模型的所有组件的列表，用于intersects时高亮所有模型组件；
  objMap = {};
  modelConfigMap = {};
  deviceObjectMap = {};
  constructor() {}
  animationMixer;
  init(gltf, mixer) {
    this.animationMixer = mixer;
    this.loadObjects(gltf);
    this.loadAnimations(gltf);
  }

  loadAnimations(gltf) {
    gltf.animations?.forEach((clip) => {
      for (let key in modelConfigs) {
        if (clip.name.startsWith(key)) {
          const action = this.animationMixer.clipAction(clip);
          // action.loop = THREE.LoopOnce;
          // 停在最后一帧
          action.clampWhenFinished = true;
          // action.play();
          modelConfigs[key].animationClip = clip;
          modelConfigs[key].animationAction = action;
        }
      }
    });
  }
  loadObjects(gltf) {
    // console.log("children", gltf.scene.children);
    this.loadObject0(gltf.scene.children);
    for (let key in this.deviceModels) {
      let arr = this.deviceModels[key];
      // console.log("arr", arr);
      arr.forEach((el) => {
        this.objMap[el.name] = arr;
        this.modelConfigMap[el.name] = modelConfigs[key];
        this.deviceObjectMap[el.name] = el;
      });
    }
  }

  loadObject0(children) {
    children.forEach((element) => {
      let name = element.name;
      for (let key in modelConfigs) {
        let mConfig = modelConfigs[key];
        if (element.material != undefined && name.startsWith(key)) {
          this.deviceObjects.push(element);
          if (!this.deviceModels.hasOwnProperty(key)) {
            this.deviceModels[key] = [];
          }
          this.deviceModels[key].push(element);
          if (name == mConfig.main) {
            mConfig.obj = element;
            if (mConfig.pos == null) {
              //只用pos为null才设置，不为null即为可以手工设置；
              mConfig.pos = element.position;
            }
          }

          break;
        }
      }
      //模型材质设置
      initModelMaterials(element);
      if (element.children) {
        this.loadObject0(element.children);
      }
    });
  }

  initDialogs(refs) {
    // console.log("ref", refs);
    refs.forEach((ref) => {
      // console.log("ref", ref.$el);
      this.initDialog(ref);
    });
  }
  initDialog(ref) {
    // console.log("deviceName", ref.$el);

    // const el = ref.value.$el;
    const el = ref.$el;
    const modeleName = el.dataset.modelName;
    const model = modelConfigs[modeleName];
    const dialog = model.dialog;
    const pos = dialog.pos;
    const objCss = new CSS2DObject(el);

    objCss.position.set(model.dialog.pos);
    objCss.position.set(pos.x, pos.y, pos.z);
    objCss.visible = false;
    objCss.center.set(0, 0);
    model.obj?.add(objCss);
    dialog.objCss = objCss;
  }

  showDialog(deviceName) {
    let config = this.modelConfigMap[deviceName];
    if (this.currentDialog) {
      this.currentDialog.visible = false;
      this.currentDialog = null;
    }
    this.currentDialog = config?.dialog?.objCss;
    if (this.currentDialog) {
      this.currentDialog.visible = true;
    }
  }
  hideDialog(deviceName) {
    if (this.currentDialog) {
      this.currentDialog.visible = false;
    } else {
      let dialog = this.modelConfigMap[deviceName];
      if (dialog) {
        dialog.visible = false;
      }
    }
  }

  //道路指示器开关
  switchIndicator(modelName, status) {
    const goSign = this.deviceObjectMap[modelName + "_go"];
    const forbidSign = this.deviceObjectMap[modelName + "_forbid"];

    if (status == "go") {
      goSign.visible = true;
      forbidSign.visible = false;
      goSign.material.color.set(0x00ff00);
    }

    if (status == "forbid") {
      goSign.visible = false;
      forbidSign.visible = true;
      forbidSign.material.color.set(0xff0000);
    }
    if (status == "closed") {
      goSign.visible = true;
      forbidSign.visible = true;
      goSign.material.color.set(0xa3a2a2);
      forbidSign.material.color.set(0xa3a2a2);
    }
  }
  //交通灯开关
  switchTrafficLight(modelName, color) {
    const arrow1 = this.deviceObjectMap[modelName + "_arrow_01"];
    const arrow2 = this.deviceObjectMap[modelName + "_arrow_02"];
    const arrow3 = this.deviceObjectMap[modelName + "_arrow_03"];
    this.switchTrafficLightArrowColor(arrow1, color);
    this.switchTrafficLightArrowColor(arrow2, color);
    this.switchTrafficLightArrowColor(arrow3, color);
  }
  switchTrafficLightArrowColor(arrow, color) {
    if (arrow) {
      const material = arrow.material;
      if (color == "red") {
        material.color.set(0xff0000);
        material.shininess = 100;
        material.emissive.set(0xff0000);
      } else if (color == "green") {
        material.color.set(0x00ff00);
        material.shininess = 100;
        material.emissive.set(0x00ff00);
      } else {
        material.color.set(0xa3a2a2);
        material.shininess = 100;
        material.emissive.set(0);
      }
    }
  }

  //报警器开关
  switchAlarm(modelName, status) {}
  //道闸开关
  switchFence(modelName, status) {
    console.log("switch fence.");
    const fence = modelConfigs[modelName];
    const action = fence.animationAction;
    action.clampWhenFinished = true;
    // action.play();
    action.loop = THREE.LoopOnce;
    action.reset();
    if (status == "closed") {
      //倒入动画
      action.time = action._clip.duration;
      action.timeScale = -1;
    } else {
      action.timeScale = 1;
    }
    action.play();
  }
  switchDeviceStatus(deviceDataMap) {
    console.log("switch status....");
    //设置
    for (let key in deviceDataMap) {
      if (deviceDataMap.hasOwnProperty(key)) {
        let model = deviceDataMap[key];
        if (model.type == "fence") {
          this.switchFence(key, model.status);
        } else if (model.type == "indicator") {
          this.switchIndicator(key, model.status);
        } else if (model.type == "traffic-light") {
          this.switchTrafficLight(key, model.status);
        }
      }
    }
  }
}
export { ModelHelper };
