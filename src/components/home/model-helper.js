import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

const Constrants = {
  HZ_FENCE_01: "hz_fence_01",
  HZ_FENCE_02: "hz_fence_02",
  HZ_FENCE_03: "hz_fence_03",
  HZ_INDICATOR_01: "hz_indicator_01",
  HZ_INDICATOR_02: "hz_indicator_02",
  HZ_INDICATOR_03: "hz_indicator_03",
  HZ_ALARM: "hz_alarm",
  HZ_CCTV_01: "hz_cctv_01",
  HZ_CCTV_02: "hz_cctv_02",
  HZ_TRAFFIC_01: "hz_traffic_01",
  HZ_TRAFFIC_02: "hz_traffic_02",
  HZ_RULER_01: "hz_ruler_01",
  HZ_RULER_02: "hz_ruler_02",
  HZ_TILT: "hz_tilt",
  //天河方向
  TH_FENCE_01: "th_fence_01",
  TH_FENCE_02: "th_fence_02",
  TH_FENCE_03: "th_fence_03",
  TH_FENCE_04: "th_fence_04",
  TH_INDICATOR_01: "th_indicator_01",
  TH_INDICATOR_02: "th_indicator_02",
  TH_INDICATOR_03: "th_indicator_03",
  TH_INDICATOR_04: "th_indicator_04",
  TH_ALARM_01: "th_alarm_01",
  TH_ALARM_02: "th_alarm_02",
  TH_CCTV_01: "th_cctv_01",
  TH_CCTV_02: "th_cctv_02",
  TH_CCTV_03: "th_cctv_03",
  TH_TRAFFIC_01: "th_traffic_01",
  TH_TRAFFIC_02: "th_traffic_02",
  TH_RULER_01: "th_ruler_01",
  TH_RULER_02: "th_ruler_02",
  TH_TILT: "th_tilt",
};

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
  modelConfigs = {
    hz_fence_01: {
      type: "fence",
      pos: { x: 0, y: 0, z: 0 },
      main: "hz_fence_01_main",
      viewPoint: { x: -72, y: 4, z: 2 },
      dialog: {
        pos: { x: 0, y: 2, z: 0 },
        cssObj: null,
      },
    },
    hz_fence_02: {
      type: "fence",
      pos: { x: 0, y: 0, z: 0 },
      main: "hz_fence_02_main",
      viewPoint: { x: -72, y: 4, z: 2 },
      dialog: {
        pos: { x: 0, y: 2, z: 0 },
        cssObj: null,
      },
    },
    hz_fence_03: {
      type: "fence",
      pos: { x: 0, y: 0, z: 0 },
      main: "hz_fence_03_main",
      viewPoint: { x: -72, y: 4, z: 2 },
      dialog: {
        pos: { x: 0, y: 2, z: 0 },
        cssObj: null,
      },
    },
    hz_indicator_01: {
      type: "indicator",
      pos: { x: 0, y: 0, z: 0 },
      main: "hz_indicator_01_box",
      viewPoint: { x: -75, y: 8, z: 2 },
      dialog: {
        pos: { x: 0, y: 1.2, z: 0 },
        cssObj: null,
      },
    },
    hz_indicator_02: {
      type: "indicator",
      pos: { x: 0, y: 0, z: 0 },
      main: "hz_indicator_02_box",
      viewPoint: { x: -75, y: 8, z: 2 },
      dialog: {
        pos: { x: 0, y: 1.2, z: 0 },
        cssObj: null,
      },
    },
    hz_indicator_03: {
      type: "indicator",
      pos: { x: 0, y: 0, z: 0 },
      main: "hz_indicator_03_box",
      viewPoint: { x: -75, y: 8, z: 2 },
      dialog: {
        pos: { x: 0, y: 1.2, z: 0 },
        cssObj: null,
      },
    },
    hz_alarm: {
      type: "alarm",
      pos: null,
      main: "hz_alarm_box",
      viewPoint: {
        x: -81,
        y: 6,
        z: 1,
      },
      dialog: {
        pos: { x: 0.8, y: 0.3, z: 0 },
        cssObj: null,
      },
    },
    hz_cctv_01: {
      type: "cctv",
      pos: null,
      main: "hz_cctv_01_body",
      viewPoint: { x: -72, y: 6, z: 5 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    hz_cctv_02: {
      type: "cctv",
      pos: null,
      main: "hz_cctv_02_body",
      viewPoint: { x: -27, y: -5, z: 2 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    hz_traffic_01: {
      type: "traffic-light",
      pos: { x: 0, y: 0, z: 0 },
      main: "hz_traffic_01_box",
      viewPoint: { x: -83.368025, y: 6.544511, z: 2.9524699999999995 },
      dialog: {
        pos: { x: 0, y: 0.4, z: -1 },
        cssObj: null,
      },
    },
    hz_traffic_02: {
      type: "traffic-light",
      pos: { x: 0, y: 0, z: 0 },
      main: "hz_traffic_02_box",
      viewPoint: { x: -83.368025, y: 6.544511, z: 2.9524699999999995 },
      dialog: {
        pos: { x: 0, y: 0.4, z: -1 },
        cssObj: null,
      },
    },
    hz_ruler_01: {
      type: "ruler",
      pos: {
        x: -24,
        y: -7,
        z: -1,
      },
      main: "hz_ruler_01_1",
      viewPoint: { x: -27, y: -5, z: 2 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    hz_ruler_02: {
      type: "ruler",
      pos: {
        x: -25.5,
        y: -7,
        z: 4,
      },
      main: "hz_ruler_02_1",
      viewPoint: { x: -27, y: -7, z: 3 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    hz_tilt: {
      type: "tilt",
      pos: {
        x: -24,
        y: -7,
        z: -1,
      },
      main: "hz_tilt_main_1",
      viewPoint: { x: -24.5, y: -6.2, z: -0.1 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    th_fence_01: {
      type: "fence",
      pos: { x: 0, y: 0, z: -5 },
      main: "th_fence_01_main",
      viewPoint: { x: 61, y: 0, z: -4 },
      dialog: {
        pos: { x: 0, y: 1, z: 0 },
        cssObj: null,
      },
    },
    th_fence_02: {
      type: "fence",
      pos: { x: 0, y: 0, z: -5 },
      main: "th_fence_02_main",
      viewPoint: { x: 61, y: 0, z: -4 },
      dialog: {
        pos: { x: 0, y: 1, z: 0 },
        cssObj: null,
      },
    },
    th_fence_03: {
      type: "fence",
      pos: { x: 0, y: -5, z: -10 },
      main: "th_fence_03_main",
      viewPoint: { x: 47, y: -4, z: -9 },
      dialog: {
        pos: { x: 0, y: 1, z: 0 },
        cssObj: null,
      },
    },
    th_fence_04: {
      type: "fence",
      pos: { x: 0, y: -5, z: -10 },
      main: "th_fence_04_main",
      viewPoint: { x: 47, y: -4, z: -9 },
      dialog: {
        pos: { x: 0, y: 1, z: 0 },
        cssObj: null,
      },
    },
    th_indicator_01: {
      type: "indicator",
      pos: { x: 0, y: -3, z: 0 },
      main: "th_indicator_01_box",
      viewPoint: {
        x: 64,
        y: 4,
        z: -4,
      },
      dialog: {
        pos: { x: 0, y: 0.6, z: -0.4 },
        cssObj: null,
      },
    },
    th_indicator_02: {
      type: "indicator",
      pos: { x: 0, y: -3, z: 0 },
      main: "th_indicator_02_box",
      viewPoint: { x: 64, y: 4, z: -4 },
      dialog: {
        pos: { x: 0, y: 0.4, z: 1 },
        cssObj: null,
      },
    },
    th_indicator_03: {
      type: "indicator",
      pos: { x: 0, y: 0, z: -10 },
      main: "th_indicator_03_box",
      viewPoint: { x: 50, y: -1, z: -10 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    th_indicator_04: {
      type: "indicator",
      pos: { x: 0, y: 0, z: -10 },
      main: "th_indicator_04_box",
      viewPoint: { x: 50, y: -1, z: -10 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    th_alarm_01: {
      type: "alarm",
      pos: { x: 0, y: -3, z: 0 },
      main: "th_alarm_01_box",
      viewPoint: { x: 64, y: 4, z: -4 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    th_alarm_02: {
      type: "alarm",
      pos: { x: 0, y: 3.5, z: -10 },
      main: "th_alarm_02_box",
      viewPoint: { x: 61, y: 3.5, z: -9 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    th_cctv_01: {
      type: "cctv",
      pos: { x: 0, y: -3, z: 0 },
      main: "th_cctv_01_body",
      viewPoint: { x: 64, y: 4, z: -4 },
      dialog: {
        pos: { x: 0.8, y: 0.3, z: 0 },
        cssObj: null,
      },
    },
    th_cctv_02: {
      type: "cctv",
      pos: { x: 0, y: 0, z: -10 },
      main: "th_cctv_02_body",
      viewPoint: { x: 50, y: -1, z: -10 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    th_cctv_03: {
      type: "cctv",
      pos: { x: 0, y: 0, z: 0 },
      main: "th_cctv_03_body",
      viewPoint: { x: 25, y: -6, z: -3 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    th_traffic_01: {
      type: "traffic-light",
      pos: { x: 0, y: 3.5, z: -10 },
      main: "th_traffic_01_box",
      viewPoint: { x: 61, y: 3.5, z: -9 },
      dialog: {
        pos: { x: 0, y: 1, z: 0 },
        cssObj: null,
      },
    },
    th_traffic_02: {
      type: "traffic-light",
      pos: { x: 0, y: 3.5, z: -10 },
      main: "th_traffic_02_box",
      viewPoint: { x: 61, y: 3.5, z: -9 },
      dialog: {
        pos: { x: 0, y: 1, z: 0 },
        cssObj: null,
      },
    },
    th_ruler_01: {
      type: "ruler",
      pos: { x: 19, y: -11, z: -20 },
      main: "th_ruler_01_1",
      viewPoint: { x: 21, y: -7, z: -7 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    th_ruler_02: {
      type: "ruler",
      pos: { x: 19, y: -11, z: 5 },
      main: "th_ruler_02_1",
      viewPoint: { x: 20, y: -7, z: -2 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
    th_tilt: {
      type: "tilt",
      pos: { x: 19, y: -11, z: 5 },
      main: "th_tilt_main_1",
      viewPoint: { x: 20, y: -7, z: -2 },
      dialog: {
        pos: { x: 0, y: 0, z: 0 },
        cssObj: null,
      },
    },
  };

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
      for (let key in this.modelConfigs) {
        if (clip.name.startsWith(key)) {
          const action = this.animationMixer.clipAction(clip);
          // action.loop = THREE.LoopOnce;
          // 停在最后一帧
          action.clampWhenFinished = true;
          // action.play();
          this.modelConfigs[key].animationClip = clip;
          this.modelConfigs[key].animationAction = action;
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
        this.modelConfigMap[el.name] = this.modelConfigs[key];
        this.deviceObjectMap[el.name] = el;
      });
    }
  }

  loadObject0(children) {
    children.forEach((element) => {
      let name = element.name;
      for (let key in this.modelConfigs) {
        let mConfig = this.modelConfigs[key];
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
    const model = this.modelConfigs[modeleName];
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
    const fence = this.modelConfigs[modelName];
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
}
export { ModelHelper };
