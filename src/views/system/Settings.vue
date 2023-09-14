<template>
  <div class="container">
    <el-row class="head">

      <div class="title">
        <el-space>
          <el-icon>
            <Setting />
          </el-icon>
          <h2>设置</h2>
        </el-space>
      </div>
      <div class="home-btn">
        <div class="spacer"></div>
        <el-button link type="primary" :icon="HomeFilled" @click="go2Home">
          <HomeFilled style="font-size: 22px;" />
          返回
        </el-button>
      </div>
    </el-row>

    <el-row>
      <el-tabs v-model="activeTab" tab-position="left" style="width: 100%;" class="demo-tabs" @tab-change="handleChange"
        :stretch="true">
        <el-tab-pane name="users" label="用户管理" style="padding: 10px;">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane name="roles" label="角色管理" style="padding:10px;">
          <router-view></router-view>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script name="setting" setup>
import { getCurrentInstance, ref } from "vue";
import { Setting, HomeFilled } from '@element-plus/icons-vue'
const activeTab = ref("users");
const { proxy } = getCurrentInstance();
function handleChange() {

  proxy.$router.push("/settings/" + activeTab.value);
}
const go2Home = () => {
  proxy.$router.push("/");
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  height: 60px;
}

.home-btn {
  position: absolute;
  display: flex;
  flex-direction: row;
  right: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  // box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
  height: 60px;

  .spacer {
    border-left: 1px solid #cecece;
    height: 35px;
    margin-right: 10px;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  }
}

.title {
  margin-left: 20px;
  display: flex;
  align-items: center;
}
</style>