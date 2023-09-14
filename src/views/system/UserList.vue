<template>
    <div>
        <el-row>
            <el-form :model="queryForm" label-width="0">
                <el-form-item label="">
                    <el-input v-model="queryForm.name" :prefix-icon="Search" />
                </el-form-item>
            </el-form>

        </el-row>
        <el-row>
            <el-space>
                <el-button type="primary">新增</el-button>
                <el-button type="error">删除</el-button>
            </el-space>
        </el-row>
        <el-row>
            <el-table ref="multipleTableRef" :data="userList" style="width:100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" label="序号" width="50" />
                <el-table-column prop="loginName" label="登录名称" />
                <el-table-column prop="userName" label="用户中文名" />
                <el-table-column prop="roleName" label="角色">
                    <template #default="scope">
                        <el-tag type="" v-for="role in scope.row.roles">
                            {{ role.roleName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" size="small" link>
                            授予角色
                        </el-button>
                        <el-button type="primary" size="small" link>
                            重置密码
                        </el-button>
                        <el-button type="primary" size="small" link>
                            删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination class="pagination" small background layout="->,prev, pager, next"
                @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                :total="totalSize" />
        </el-row>


    </div>
</template>

<script name="user-list" setup>
import { reactive, ref } from "vue";
import { Search } from '@element-plus/icons-vue'
const userList = ref([{
    loginName: "admin",
    userName: "超级管理员",
    roles: [
        { roleName: "管理员" }
    ]
}, {
    loginName: "operator",
    userName: "操作员A",
    roles: [
        { roleName: "操作员" }
    ]
},
]);

const currentPage = ref(1);
const pageSize = ref(20);
const totalSize = ref(50);
const queryForm = reactive({
    name: "",
});
const multipleTableRef = ref(null);
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
    multipleSelection.value = val
};

const handleCurrentChange = () => {

}

</script>
<style lang="less" scoped>
.pagination {
    margin-top: 10px;
    width: 100%;
    padding: 10px
}
</style>