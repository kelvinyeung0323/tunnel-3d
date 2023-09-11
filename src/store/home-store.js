import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHomeStore = defineStore('home-store', () => {
  const waterDashBoardData = ref([]);
  const thresholdSetting = ref([]);
  return { waterDashBoardData, thresholdSetting };
})