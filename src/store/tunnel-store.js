import { defineStore } from "pinia";
import { ref } from "vue";
export const useTunnelStore = defineStore("tunnel-store", () => {
  const deviceList = ref([]);
  const deviceDataMap = ref({
    hz_alarm: {
      type: "alarm",
      deviceName: "声光报警器-海珠01",
      status: "playing",
      connStatus: "online",
      content: "下雨天，注意行车！",
    },
    hz_traffic_01: {
      deviceName: "交通灯-海珠01",
      type: "traffic-light",
      status: "red",
      connStatus: "online",
    },
    hz_traffic_02: {
      deviceName: "交通灯-海珠02",
      type: "traffic-light",
      status: "green",
      connStatus: "offline",
    },
    hz_cctv_01: {
      deviceName: "摄像头-海珠01",
      type: "cctv",
      connStatus: "online",
    },
    hz_cctv_02: {
      deviceName: "摄像头-海珠02",
      type: "cctv",
      connStatus: "offline",
    },
    hz_indicator_01: {
      deviceName: "道路指示器-海珠01",
      type: "indicator",
      connStatus: "online",
      status: "go",
    },
    hz_indicator_02: {
      deviceName: "道路指示器-海珠02",
      type: "indicator",
      connStatus: "online",
      status: "go",
    },
    hz_indicator_03: {
      deviceName: "道路指示器-海珠03",
      type: "indicator",
      connStatus: "online",
      status: "forbid",
    },
    hz_fence_01: {
      deviceName: "道闸-海珠01",
      type: "fence",
      connStatus: "online",
      status: "opened",
    },
    hz_fence_02: {
      deviceName: "道闸-海珠02",
      type: "fence",
      connStatus: "offline",
      status: "opened",
    },
    hz_fence_03: {
      deviceName: "道闸-海珠03",
      type: "fence",
      connStatus: "online",
      status: "closed",
    },
    hz_tilt: {
      deviceName: "超声波液位计-海珠",
      type: "tilt",
      connStatus: "online",
      data: 12,
    },
    hz_ruler_01: {
      deviceName: "电子水尺-海珠01",
      type: "ruler",
      connStatus: "online",
      data: 13,
    },
    hz_ruler_01: {
      deviceName: "电子水尺-海珠02",
      type: "ruler",
      connStatus: "online",
      data: 14,
    },
    th_alarm_01: {
      deviceName: "声光报警器-天河01",
      type: "alarm",
      connStatus: "online",
      status: "playing",
      conntent: "下雨天，注意行车！",
    },
    th_alarm_02: {
      deviceName: "声光报警器-天河02",
      type: "alarm",
      connStatus: "online",
      status: "stopped",
      conntent: "",
    },
    th_traffic_01: {
      deviceName: "交通灯-天河01",
      type: "traffic-light",
      connStatus: "online",
      status: "red",
    },
    th_traffic_02: {
      deviceName: "交通灯-天河02",
      type: "traffic-light",
      connStatus: "online",
      status: "green",
    },
    th_cctv_01: {
      deviceName: "摄像头-天河01",
      type: "cctv",
      connStatus: "online",
    },
    th_cctv_02: {
      deviceName: "摄像头-天河02",
      type: "cctv",
      connStatus: "online",
    },
    th_cctv_03: {
      deviceName: "摄像头-天河03",
      type: "cctv",
      connStatus: "online",
    },
    th_indicator_01: {
      deviceName: "道路指示器-天河01",
      type: "indicator",
      connStatus: "online",
      status: "go",
    },
    th_indicator_02: {
      deviceName: "道路指示器-天河02",
      type: "indicator",
      connStatus: "online",
      status: "forbid",
    },
    th_indicator_03: {
      deviceName: "道路指示器-天河03",
      type: "indicator",
      connStatus: "online",
      status: "go",
    },
    th_indicator_04: {
      deviceName: "道路指示器-天河04",
      type: "indicator",
      connStatus: "offline",
      status: "forbid",
    },
    th_fence_01: {
      deviceName: "道闸-天河01",
      type: "fence",
      connStatus: "online",
      status: "closed",
    },
    th_fence_02: {
      deviceName: "道闸-天河02",
      type: "fence",
      connStatus: "online",
      status: "closed",
    },
    th_fence_03: {
      deviceName: "道闸-天河03",
      type: "fence",
      connStatus: "online",
      status: "closed",
    },
    th_fence_04: {
      deviceName: "道闸-天河04",
      type: "fence",
      connStatus: "online",
      status: "closed",
    },
    th_tilt: {
      deviceName: "超声波液位计-天河",
      type: "tilt",
      connStatus: "online",
      data: 14,
    },
    th_ruler_01: {
      deviceName: "电子水尺-天河01",
      type: "ruler",
      connStatus: "online",
      data: 13,
    },
    th_ruler_02: {
      deviceName: "电子水尺-天河02",
      type: "ruler",
      connStatus: "online",
      data: 12,
    },
  });

  function fetchDeviceList() {}

  return { deviceList, deviceDataMap, fetchDeviceList };
});
