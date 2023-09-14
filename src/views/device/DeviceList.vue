<template>
  <div class='app-container'>
    <el-form :model='queryParams' ref='queryForm' :inline='true' v-show='showSearch' label-width='90px'>
      <el-form-item label='设备类型' prop='deviceType'>
        <el-select v-model='queryParams.deviceType'>
          <el-option v-for='type in deviceTypeEnums' :key='type.code' :value='type.code' :label='type.name'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='设备名称' prop='deviceName'>
        <el-input v-model='queryParams.deviceName' placeholder='请输入设备名称' clearable @keyup.enter.native='handleQuery' />
      </el-form-item>

      <el-form-item>
        <el-button type='primary' :icon='Search' @click='handleQuery'>搜索</el-button>
        <el-button :icon='Refresh' @click='resetQuery'>重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter='10' class='mb8'>
      <el-col :span='1.5'>
        <el-button type='primary' :icon='Plus' @click='handleAdd'>新增
        </el-button>
      </el-col>
      <el-col :span='1.5'>
        <el-button type='success' :icon='Edit' :disabled='single' @click='handleUpdate'>修改
        </el-button>
      </el-col>
      <el-col :span='1.5'>
        <el-button type='danger' :icon='DeleteIcon' :disabled='multiple' @click='handleDelete'>删除
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--            type="warning"-->
      <!--            plain-->
      <!--            icon="el-icon-download"-->
      <!--            size="small"-->
      <!--            @click="handleExport"-->
      <!--            v-hasPermi="['suidao:device:export']"-->
      <!--        >导出-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <!-- <right-toolbar v-model:showSearch='showSearch' @queryTable='getList'></right-toolbar> -->
    </el-row>

    <el-table v-loading='loading' :data='deviceList' @selection-change='handleSelectionChange' class='table-class'>
      <el-table-column type='selection' width='55' align='center' />
      <el-table-column type='index' label='序号' width='55' align='center' />
      <el-table-column label='设备名称' align='center' prop='deviceName' />
      <el-table-column label='设备ip' align='center' prop='ip' />
      <el-table-column label='设备端口' align='center' prop='port' />
      <el-table-column label='设备类型' align='center' prop='type'>
        <template #default='scope'>
          <span>{{ deviceTypeEnums[scope.row.type].name }}</span>
        </template>
      </el-table-column>
      <el-table-column label='设备状态' align='center' prop='connStatus'>
        <template #default='scope'>
          <el-tag v-if='scope.row.connStatus' :type='getStatusTagType(scope.row.connStatus)'>
            {{ deviceConnStatusEnums[scope.row.connStatus].name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label='网络串流' align='center' prop='rtsp' />
      <el-table-column label='设备描述' align='center' prop='description' />
      <el-table-column label='设备地址' align='center' prop='setupAddr' />
      <el-table-column label='设备故障描述' align='center' prop='faultCause' />
      <!--      <el-table-column label="是否预警 1是 0否" align="center" prop=""-->
      <el-table-column label='关联预警设备' align='center' prop='extension2'>
        <template #default='scope'>
          <el-tag type='info' v-for="id in scope.row.extension2?.split(',')?.filter(e => e != '')" style='margin:2px'>
            {{ allDeviceIdMap[id] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label='操作' align='center' class-name='small-padding fixed-width'>
        <template #default='scope'>
          <el-button size='small' type='primary' :icon='Edit' @click='handleUpdate(scope.row)'>修改
          </el-button>
          <el-button size='small' type='danger' :icon='DeleteIcon' @click='handleDelete(scope.row)'>删除
          </el-button>
          <el-button v-if="scope.row.deviceType == '2' && scope.row.linkStatus == 0" size='small' type='text'
            icon='el-icon-delete' @click="handleCommand('开启', scope.row.id)">开启自动联动
          </el-button>
          <el-button v-if="scope.row.deviceType == '2' && scope.row.linkStatus == 1" size='small' type='text'
            icon='el-icon-delete' @click="handleCommand('关闭', scope.row.id)">关闭自动联动
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" v-show="total > 0" small background layout="->,prev, pager, next"
      @current-change="getList" :current-page="queryParams.pageNum" :page-size="queryParams.pageSize" :total="total" />
    <!-- 添加或修改设备管理对话框 -->
    <el-dialog :title='title' v-model='open' width='500px' append-to-body @close='cancel'>
      <el-form ref='formDom' :model='form' :rules='rules' label-width='80px'>
        <el-form-item label='设备类型' prop='deviceType'>
          <el-select v-model='form.deviceType' placeholder='请输入设备类型'>
            <el-option v-for='type in deviceTypeEnum' :key='type.code' :value='type.code' :label='type.desc'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='设备名称' prop='deviceName'>
          <el-input v-model='form.deviceName' placeholder='请输入设备名称' />
        </el-form-item>
        <el-form-item label='音量' prop='extension5' v-if='form.deviceType == deviceTypeEnum.ALARM.code'>
          <el-slider v-model='form.extension5' :min='1' :max='30' show-input />
        </el-form-item>
        <el-form-item label='设备ip' prop='ip'>
          <el-input v-model='form.ip' placeholder='请输入设备ip' />
        </el-form-item>
        <el-form-item label='设备端口' prop='port'>
          <el-input v-model='form.port' placeholder='请输入设备端口' />
        </el-form-item>
        <el-form-item label='网络串流' prop='rtsp'>
          <el-input v-model='form.rtsp' placeholder='请输入网络串流' />
        </el-form-item>
        <el-form-item label='设备描述' prop='deviceDesc'>
          <el-input v-model='form.deviceDesc' placeholder='请输入设备描述' />
        </el-form-item>
        <el-form-item label='设备地址' prop='address'>
          <el-input v-model='form.address' placeholder='请输入设备地址' />
        </el-form-item>
        <!--        <el-form-item label="设备故障描述" prop="extension1">-->
        <!--          <el-input v-model="form.extension1" placeholder="请输入设备故障描述" />-->
        <!--        </el-form-item>-->
        <el-form-item label='关联预警设备' prop='extension2'>
          <el-select v-model='form.extension2' multiple filterable placeholder='请选择关联预警设备' style='width: 320px'>
            <el-option v-for='item in allDevices' :key='item.id' :label='item.deviceName' :value='item.id'>
              <div style='min-width: 250px'>
                <span style='float: left'>{{ item.deviceName }}</span>
                <span style='float: right;color: var(--el-text-color-secondary); font-size: 13px;'>{{ item.ip }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='submitForm'>确 定</el-button>
        <el-button @click='cancel'>取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>

import { useDeviceStore } from '@/store/device-store'
import { computed, ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { Plus, Delete, Edit, Search, Share, Upload, Refresh, Delete as DeleteIcon } from '@element-plus/icons-vue'
import { listDevices } from '@/api/device-api'
import { deviceTypeEnums, deviceConnStatusEnums } from "@/utils/enums";
const { proxy } = getCurrentInstance();
const deviceStore = useDeviceStore()


const deviceTypeEnum = ref(null)
// 遮罩层
const loading = ref(false)
// 选中数组
const ids = ref([])
// 非单个禁用
const single = ref(true)
// 非多个禁用
const multiple = ref(true)
// 显示搜索条件
const showSearch = ref(true)
// 总条数
const total = ref(0)
// 设备管理表格数据
const deviceList = ref([])
// 弹出层标题
const title = ref('')
// 是否显示弹出层
const open = ref(false)
// 查询参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  uid: null,
  deviceName: null,
  ip: null,
  port: null,
  deviceType: null,
  deviceStatus: null,
  rtsp: null,
  deviceDesc: null,
  address: null,
  extension1: null,
  extension2: null,
  extension3: null,
  extension4: null,
  extension5: null
})
// 表单参数
const form = ref({})
// 表单校验
const rules = reactive({
  deviceName: [
    { required: true, message: '设备名称不能为空', trigger: 'blur' }
  ],
  deviceType: [
    { required: true, message: '设备类型不能为空', trigger: 'blur' }
  ]
})



function getStatusTagType(status) {
  // ("1", "正常"),
  //     ("2", "故障"),
  //     ("3", "未启用");
  switch (status) {
    case 'online':
      return 'success'
    case 'offline':
      return 'warning'
    case '3':
      return 'info'
    default:
      return 'info'
  }
};
/** 查询设备管理列表 */
function getList() {
  loading.value = true
  //把关联设备字符串转成数组
  let { ...params } = queryParams;
  params.extension2 = queryParams.extension2?.join(',')
  listDevices(params).then(response => {
    console.log("response:", response)
    deviceList.value = response.data
    total.value = response.total
    loading.value = false
  })
}
// 取消按钮
function cancel() {
  open.value = false
  reset()
}
// 表单重置
function reset() {
  form.value = {
    id: null,
    uid: null,
    deviceName: null,
    ip: null,
    port: null,
    deviceType: null,
    deviceStatus: '0',
    rtsp: null,
    deviceDesc: null,
    address: null,
    createTime: null,
    createBy: null,
    updateTime: null,
    updateBy: null,
    extension1: null,
    extension2: null,
    extension3: null,
    extension4: null
  }
  resetForm('form')
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.pageNum = 1
  getList()
}
/** 重置按钮操作 */
function resetQuery() {
  resetForm('queryForm')
  handleQuery()
}
// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}
/** 新增按钮操作 */
function handleAdd() {
  reset()
  open.value = true
  title.value = '添加设备管理'
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset()
  const id = row.id || ids.value
  getDevice(id).then(response => {
    //把关联设备字符串转成数组
    let data = response.data
    console.log('data', data)
    data.extension2 = data.extension2?.split(',')?.filter(e => e != '').map(e => e = parseInt(e))
    form.value = data
    open.value = true
    title.value = '修改设备管理'
  })
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs['formDom'].validate(valid => {
    if (valid) {
      //处理关联设备多选,逗号分隔
      let { ...params } = form.value
      params.extension2 = form.value.extension2?.join(',')
      if (form.value.id != null) {
        updateDevice(params).then(response => {
          proxy.$modal.msgSuccess('修改成功')
          open.value = false
          getList()
        })
      } else {
        addDevice(params).then(response => {
          proxy.$modal.msgSuccess('新增成功')
          open.value = false
          getList()
        })
      }
    }
  })
}
/** 删除按钮操作 */
function handleDelete(row) {
  const ids = row.id || ids.value
  proxy.$modal.confirm('是否确认删除设备管理编号为"' + ids + '"的数据项？').then(function () {
    return delDevice(ids)
  }).then(() => {
    getList()
    proxy.$modal.msgSuccess('删除成功')
  }).catch(() => {
  })
}
/** 导出按钮操作 */
function handleExport() {
  // download('suidao/device/export', {
  //   ...queryParams
  // }, `device_${new Date().getTime()}.xlsx`)
}
function handleCommand(cmd, deviceId) {

  // proxy.$modal.loading('命令发送中...')
  // updataLinkStatus(deviceId, cmd).then(res => {
  //   console.log('command response', res)
  //   if (res.code == 200) {
  //     console.log('命令发送成功', res)
  //     proxy.$modal.closeLoading()
  //     proxy.$modal.msgSuccess('命令发送成功,' + res?.msg)
  //      getList()
  //   } else {
  //     console.log('命令发送失败1', res)
  //     proxy.$modal.closeLoading()
  //     proxy.$modal.msgError('命令发送失败,' + res?.msg)
  //   }
  // }).catch((reason) => {
  //   console.log('命令发送失败2', reason)
  //   proxy.$modal.closeLoading()
  // })
}


onMounted(() => {
  deviceStore.refreshAllDevices();
  getList();
})
const allDevices = computed(() => {
  return deviceStore.allDevices
})

const allDeviceIdMap = computed(() => {
  let map = {}
  deviceStore.allDevices?.forEach(e => map[e.id] = e.devicesName)
  return map
})


</script>

<style scoped lang="less">
.table-class {}

.app-container {
  background-color: white;
  height: 70vh;
  padding: 0px;
}
</style>
