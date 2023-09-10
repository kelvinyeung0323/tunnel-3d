<template>
    <div class="tunnel-dialog" style="pointer-events: auto;" @click.stop="void">
        <div class="header">
            <span>{{ data.deviceName || "设备名称" }}</span>
            <span :class="connStatusCss">({{ connStatusText }})</span>
        </div>
        <el-row>
            <div class="">读数:</div>
            <div class="content">{{ data.data }} cm</div>
        </el-row>

    </div>
</template>
<script name="tilt-dialog" setup>
import { reactive, computed, defineProps } from "vue";
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

</script>