<template>
    <div class="tunnel-dialog" style="pointer-events: auto;" @click.stop="void">
        <div class="header">
            <span>{{ data.deviceName || "设备名称" }}</span>
            <span :class="connStatusCss">({{ connStatusText }})</span>

        </div>
        <el-row>
            <div class="content">
                <el-switch v-model="deviceStatus" @change="handleChange" inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="开闸"
                    inactive-text="关闸" />
            </div>
        </el-row>
    </div>
</template>
<script name="fence-dialog" setup>
import { ref, defineEmits, computed, defineProps, getCurrentInstance, onMounted } from "vue";
import "./dialog.less"
const { proxy } = getCurrentInstance();
const emit = defineEmits(['command']);
const props = defineProps({
    data: Object,
});


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

const modelName = ref("");

function handleChange() {
    emit('command', { type: 'fence', modelName: modelName.value, cmd: 'switch', param: deviceStatus.value ? "opened" : "closed" })
}
onMounted(() => {
    modelName.value = proxy.$el.dataset.modelName;
})

</script>