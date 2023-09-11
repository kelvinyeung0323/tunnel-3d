<template>
  <div class='app-container'>
    <el-form :model='queryParams' ref='queryForm' :inline='true' v-show='showSearch' label-width='90px'>
      <el-form-item label='设备类型' prop='equipmentType'>
        <el-select v-model='queryParams.equipmentType'>
          <el-option v-for='type in equipmentTypeEnum'
                     :key='type.code'
                     :value='type.code'
                     :label='type.desc'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='设备名称' prop='equipmentName'>
        <el-input
          v-model='queryParams.equipmentName'
          placeholder='请输入设备名称'
          clearable
          @keyup.enter.native='handleQuery'
        />
      </el-form-item>

      <el-form-item>
        <el-button type='primary' :icon='Search' @click='handleQuery'>搜索</el-button>
        <el-button :icon='Refresh' @click='resetQuery'>重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter='10' class='mb8'>
      <el-col :span='1.5'>
        <el-button
          type='primary'
          plain
          :icon='Plus'
          @click='handleAdd'
          v-hasPermi="['suidao:equipment:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span='1.5'>
        <el-button
          type='success'
          plain
          :icon='Edit'
          :disabled='single'
          @click='handleUpdate'
          v-hasPermi="['suidao:equipment:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span='1.5'>
        <el-button
          type='danger'
          plain
          icon='el-icon-delete'
          size='small'
          :disabled='multiple'
          @click='handleDelete'
          v-hasPermi="['suidao:equipment:remove']"
        >删除
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--            type="warning"-->
      <!--            plain-->
      <!--            icon="el-icon-download"-->
      <!--            size="small"-->
      <!--            @click="handleExport"-->
      <!--            v-hasPermi="['suidao:equipment:export']"-->
      <!--        >导出-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <right-toolbar v-model:showSearch='showSearch' @queryTable='getList'></right-toolbar>
    </el-row>

    <el-table v-loading='loading' :data='equipmentList' @selection-change='handleSelectionChange' class='table-class'>
      <el-table-column type='selection' width='55' align='center' />
      <el-table-column type='index' label='序号' width='55' align='center' />
      <el-table-column label='设备名称' align='center' prop='equipmentName' />
      <el-table-column label='设备ip' align='center' prop='ip' />
      <el-table-column label='设备端口' align='center' prop='port' />
      <el-table-column label='设备类型' align='center' prop='equipmentType'>
        <template #default='scope'>
          <span>{{ equipmentTypesMap[scope.row.equipmentType] }}</span>
        </template>
      </el-table-column>
      <el-table-column label='设备状态' align='center' prop='equipmentStatus'>
        <template #default='scope'>
          <el-tag v-if='scope.row.equipmentStatus' :type='getStatusTagType(scope.row.equipmentStatus)'>
            {{ scope.row.equipmentStatusLabel }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label='网络串流' align='center' prop='rtsp' />
      <el-table-column label='设备描述' align='center' prop='equipmentDesc' />
      <el-table-column label='设备地址' align='center' prop='address' />
      <el-table-column label='设备故障描述' align='center' prop='extension1' />
      <!--      <el-table-column label="是否预警 1是 0否" align="center" prop=""-->
      <el-table-column label='关联预警设备' align='center' prop='extension2'>
        <template #default='scope'>
          <el-tag type='info' v-for="id in scope.row.extension2?.split(',')?.filter(e=>e !='')" style='margin:2px'>
            {{ allEquipmentIdMap[id] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label='操作' align='center' class-name='small-padding fixed-width'>
        <template #default='scope'>
          <el-button
            size='small'
            type='text'
            icon='el-icon-edit'
            @click='handleUpdate(scope.row)'
            v-hasPermi="['suidao:equipment:edit']"
          >修改
          </el-button>
          <el-button
            size='small'
            type='text'
            icon='el-icon-delete'
            @click='handleDelete(scope.row)'
            v-hasPermi="['suidao:equipment:remove']"
          >删除
          </el-button>
          <el-button
            v-if="scope.row.equipmentType == '2' && scope.row.linkStatus == 0"
            size='small'
            type='text'
            icon='el-icon-delete'
            @click="handleCommand('开启',scope.row.id)"

          >开启自动联动
          </el-button>
          <el-button
            v-if="scope.row.equipmentType == '2' && scope.row.linkStatus == 1"
            size='small'
            type='text'
            icon='el-icon-delete'
            @click="handleCommand('关闭',scope.row.id)"

          >关闭自动联动
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show='total>0'
      :total='total'
      v-model:page='queryParams.pageNum'
      v-model:limit='queryParams.pageSize'
      @pagination='getList'
    />

    <!-- 添加或修改设备管理对话框 -->
    <el-dialog :title='title' v-model='open' width='500px' append-to-body @close='cancel'>
      <el-form ref='formDom' :model='form' :rules='rules' label-width='80px'>
        <el-form-item label='设备类型' prop='equipmentType'>
          <el-select v-model='form.equipmentType' placeholder='请输入设备类型'>
            <el-option v-for='type in equipmentTypeEnum'
                       :key='type.code'
                       :value='type.code'
                       :label='type.desc'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='设备名称' prop='equipmentName'>
          <el-input v-model='form.equipmentName' placeholder='请输入设备名称' />
        </el-form-item>
        <el-form-item label='音量' prop='extension5' v-if='form.equipmentType ==equipmentTypeEnum.ALARM.code'>
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
        <el-form-item label='设备描述' prop='equipmentDesc'>
          <el-input v-model='form.equipmentDesc' placeholder='请输入设备描述' />
        </el-form-item>
        <el-form-item label='设备地址' prop='address'>
          <el-input v-model='form.address' placeholder='请输入设备地址' />
        </el-form-item>
        <!--        <el-form-item label="设备故障描述" prop="extension1">-->
        <!--          <el-input v-model="form.extension1" placeholder="请输入设备故障描述" />-->
        <!--        </el-form-item>-->
        <el-form-item label='关联预警设备' prop='extension2'>
          <el-select
            v-model='form.extension2'
            multiple
            filterable
            placeholder='请选择关联预警设备'
            style='width: 320px'
          >
            <el-option
              v-for='item in allEquipments'
              :key='item.id'
              :label='item.equipmentName'
              :value='item.id'
            >
              <div style='min-width: 250px'>
                <span style='float: left'>{{ item.equipmentName }}</span>
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

import useEquipmentStore from '@/store/modules/equipment'
import { computed, ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { Plus, Delete, Edit, Search, Share, Upload, Refresh } from '@element-plus/icons-vue'
// import { updataLinkStatus } from '@/api/device-api'
const  {proxy} = getCurrentInstance();
const equipmentStore = useEquipmentStore()


const equipmentTypeEnum = ref(null)
// 遮罩层
const loading = ref(true)
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
const equipmentList = ref([])
// 弹出层标题
const title = ref('')
// 是否显示弹出层
const open = ref(false)
// 查询参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  uid: null,
  equipmentName: null,
  ip: null,
  port: null,
  equipmentType: null,
  equipmentStatus: null,
  rtsp: null,
  equipmentDesc: null,
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
  equipmentName: [
    { required: true, message: '设备名称不能为空', trigger: 'blur' }
  ],
  equipmentType: [
    { required: true, message: '设备类型不能为空', trigger: 'blur' }
  ]
})



function getStatusTagType(status) {
  // ("1", "正常"),
  //     ("2", "故障"),
  //     ("3", "未启用");
  switch (status) {
    case '1':
      return 'primary'
    case '2':
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
    equipmentList.value = response.rows
    total.value = response.total
    loading.vaue = false
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
    equipmentName: null,
    ip: null,
    port: null,
    equipmentType: null,
    equipmentStatus: '0',
    rtsp: null,
    equipmentDesc: null,
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
  proxy.$modal.confirm('是否确认删除设备管理编号为"' + ids + '"的数据项？').then(function() {
    return delDevice(ids)
  }).then(() => {
    getList()
    proxy.$modal.msgSuccess('删除成功')
  }).catch(() => {
  })
}
/** 导出按钮操作 */
function handleExport() {
  download('suidao/equipment/export', {
    ...queryParams
  }, `device_${new Date().getTime()}.xlsx`)
}
function handleCommand(cmd, equipmentId) {

  // proxy.$modal.loading('命令发送中...')
  // updataLinkStatus(equipmentId, cmd).then(res => {
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
  equipmentStore.refreshAllEquipments();
  getList();
})
const allEquipments = computed(() => {
  return equipmentStore.allEquipments
})

const allEquipmentIdMap = computed(() => {
  let map = {}
  equipmentStore.allEquipments?.forEach(e => map[e.id] = e.equipmentName)
  return map
})


</script>

<style scoped lang='scss'>
.table-class {

}
</style>
