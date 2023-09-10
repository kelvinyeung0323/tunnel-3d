<template>
    <div class="tunnel-dialog" style="pointer-events: auto;" @click.stop="void">
        <div class="header">
            <span>{{ data.deviceName || "设备名称" }}</span>
            <span :class="connStatusCss">({{ connStatusText }})</span>
        </div>
        <el-row class="row">
            <div class="content">
                <el-radio-group v-model="deviceStatus" @change="handleChange" size="small">
                    <el-radio-button label="red">红灯</el-radio-button>
                    <el-radio-button label="green">绿灯</el-radio-button>
                    <el-radio-button label="closed">关闭</el-radio-button>
                </el-radio-group>
            </div>
        </el-row>
    </div>
</template>
<script name="traff-light-dialog" setup>
import { getCurrentInstance, defineEmits, defineProps, computed, reactive, onMounted, ref } from "vue";
import "./dialog.less"

const { proxy } = getCurrentInstance();
const modelName = ref("");
const emit = defineEmits(['command']);
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


const deviceStatus = ref("");


function handleChange(val) {
    // console.log(deviceStatus.value);
    emit('command', { type: 'traffic-light', modelName: modelName.value, cmd: 'switch', param: val })
}
onMounted(() => {
    modelName.value = proxy.$el.dataset.modelName;
})
</script>