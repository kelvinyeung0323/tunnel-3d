<template>
    <div class="tunnel-dialog" style="pointer-events: auto;" @click.stop>
        <div class="header">
            <span>{{ data.deviceName || "设备名称" }}</span>
            <span :class="connStatusCss">({{ connStatusText }})</span>
        </div>

        <el-row>
            <!-- <div class="title">开关:</div> -->
            <div class="content" style="width:100%;text-align: center;">
                <el-radio-group v-model="status" @change="handleChange" size="small">
                    <el-radio-button label="go">通行</el-radio-button>
                    <el-radio-button label="forbid">禁止</el-radio-button>
                    <el-radio-button label="closed">关闭</el-radio-button>
                </el-radio-group>
            </div>
        </el-row>
    </div>
</template>
<script name="indicator-dialog" setup>
import { ref, computed, reactive, defineEmits, onMounted, getCurrentInstance } from "vue";
import "./dialog.less"
const { proxy } = getCurrentInstance();
const emit = defineEmits(['command']);
const props = defineProps({
    data: Object
})

const status = ref("");
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
const modelName = ref("");
function handleChange() {
    emit('command', { type: 'indicator', modelName: modelName.value, cmd: 'switch', param: status.value });
}
onMounted(() => {
    modelName.value = proxy.$el.dataset.modelName;
})
</script>