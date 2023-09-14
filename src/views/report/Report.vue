<template>
    <div>
        <el-row>
            <div class="chart" ref="chartRef"></div>
        </el-row>
        <el-row>
            <el-table>
                <el-table-column prop="" label="设备名称" />
                <el-table-column prop="" label="水位数值" />
                <el-table-column prop="" label="采集时间" />
            </el-table>
        </el-row>
    </div>
</template>

<script name="report" setup>
import * as echarts from 'echarts'
import elementResizeDetectorMaker from 'element-resize-detector'
import { ref, onMounted, nextTick } from 'vue';

let lineChart;
const chartRef = ref(null);
const chartOption = {
    title: {
        text: 'Stacked Line'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};


onMounted(() => {
    let erd = elementResizeDetectorMaker()
    nextTick(() => {
        lineChart = echarts.init(chartRef.value)
        erd.listenTo(chartRef.value, () => {
            lineChart.resize()
        })
        lineChart.setOption(chartOption);
    })


})
</script>
<style lang="less" scoped>
.chart {
    width: 100%;
    height: 50vh;
}
</style>