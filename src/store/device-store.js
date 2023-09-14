import { defineStore } from "pinia";
import { ref } from "vue";

export const useDeviceStore = defineStore("device-store", () => {
  const allDevices = ref([]);

  function refreshAllDevices() {}

  return { allDevices, refreshAllDevices };
});
