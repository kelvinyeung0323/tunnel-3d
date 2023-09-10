<template>
    <div class="tunnel-dialog" style="pointer-events: auto;" @click.stop="void">
        <div class="header">
            <span>{{ data.deviceName || "设备名称" }}</span>
            <span :class="connStatusCss">({{ connStatusText }})</span>
        </div>

        <el-row>
            <el-button type="primary" size="small" :icon="VideoCamera">实时视频</el-button>
        </el-row>
    </div>
</template>
<script name="cctv-dialog" setup>
import { reactive, computed } from "vue";
import { VideoCamera } from '@element-plus/icons-vue';
import "./dialog.less"

const props = defineProps({
    data: Object
})

const connStatusText = computed(() => {
    switch (props.data.connStatus) {
        case "online":
            return "在线";
        case "offline":
            return "离线";
        default:
            return props.data.connStatus;
    }
});
const connStatusCss = computed(() => {
    switch (props.data.connStatus) {
        case "online":
            return "conn-status green";
        case "offline":
            return "conn-status red";
        default:
            return "conn-status grey";
    }
})

const data = reactive({
    status: 'red',
    content: '水深路滑，注意行车',
})
</script>