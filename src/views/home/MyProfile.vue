<template>
    <div class="container">
        <el-row class="avatar">
            <el-avatar size="large" :icon="UserFilled"></el-avatar>
        </el-row>
        <el-row class="title">
            <div>xxx 开发部</div>
        </el-row>
        <el-row class="form">
            <el-form label-width="70px">
                <el-form-item label="旧密码">
                    <el-input v-model="oldPwd" password />
                </el-form-item>
                <el-form-item label="新密码" password>
                    <el-input v-model="oldPwd" />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="oldPwd" password />
                </el-form-item>
            </el-form>
            <el-button type="primary">修改密码</el-button>
        </el-row>

    </div>
</template>

<script name="my-profile" setup>
import { UserFilled } from "@element-plus/icons-vue"
</script>

<style lang="less" scoped>
.container {
    background-color: white !important;
    ;

    .avatar {
        background-color: white !important;
        ;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .title {
        background-color: white !important;
        ;
        display: flex;
        justify-content: center;
        padding: 10px;
    }

    .form {
        background-color: white !important;
        ;
        width: 100%;
        // display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

