<template>
    <div class="tunnel-dialog" style="pointer-events: auto;" @click.stop="void">
        <div class="header">
            <span>{{ data.deviceName || "设备名称" }}</span><span :class="connStatusCss">({{ connStatusText }})</span>
        </div>
        <el-row class="row">
            <div class="title">状态:</div>
            <div class="content">
                <el-space>
                    <span>{{ statusText }}</span>
                    <el-switch v-model="action" @change="handleCommand" inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="播放"
                        inactive-text="停止" />
                </el-space>
            </div>
        </el-row>
        <el-row class="row">
            <div class="title">播报内容:</div>
            <div class="content">

                <el-autocomplete v-model="playContent" :teleported="false" size="small" :fetch-suggestions="querySearch"
                    clearable placeholder="请输入播报内容" @select="handleSelect">
                    <template #append>
                        <el-button type="primary" @click="handlerSetContent">设置</el-button>
                    </template>
                </el-autocomplete>
            </div>
        </el-row>


    </div>
</template>
<script name="alarm-dialog" setup>
import { computed, ref, reactive, onMounted } from "vue";
import "./dialog.less"

const props = defineProps({
    data: Object
})
const statusText = computed(() => {
    switch (props.data.status) {
        case "playing":
            return "正在播报";
        case "stopped":
            return "播报已停止";
        default:
            return props.data.status;
    }

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
const action = ref("playing");

const playContent = ref("");

const selectContents = ref([]);

const querySearch = (queryString, cb) => {
    console.log("selections", selectContents.value)
    const results = queryString
        ? selectContents.value.filter(createFilter(queryString))
        : selectContents.value
    // call callback function to return suggestions
    cb(results)
}
const createFilter = (queryString) => {
    return (selectContent) => {
        return (
            selectContent.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}
const loadAll = () => {
    return [
        { value: "隧道水深，请绕行！" },
        { value: "雨天路滑，请减速行使！" },
        { value: "雨天路滑，请注意安全行使！" },
    ]
}

function handleSelect() {

}
function handlerSetContent() {

}
onMounted(() => {
    action.value = props.data.status;
    selectContents.value = loadAll();
});

function handleCommand() {

}
</script>