<template>
  <div class='login-view'>
    <div class='login-plane'>
      <div class="title"><span>隧道监控系统</span></div>
      <div class="body">
        <el-form>
          <el-form-item label="">
            <el-input v-model='username' placeholder="名称" :prefix-icon="User" @keyup.enter="doLogin" autofocus />
          </el-form-item>
          <el-form-item label="">
            <el-input v-model='password' placeholder="密码" type="password" :prefix-icon="Lock" @keyup.enter="doLogin" />
          </el-form-item>
          <el-button class="submit-btn" type="primary" round auto-insert-space @click="doLogin">确定</el-button>
        </el-form>
      </div>

    </div>
  </div>
</template>
<script name='login' setup>
import { getCurrentInstance, ref } from 'vue';
import { login } from '@/api/auth-api';
import { User, Lock } from '@element-plus/icons-vue'

const username = ref("");
const password = ref("");
const { proxy } = getCurrentInstance();

const doLogin = () => {

  proxy.$router.push("/");
  // login(username, password).then((resp) => {
  //   //保存tocken

  // }).catch(e => {

  // })
}

</script>

<style lang='less' scoped>
.login-view {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(-90deg, blue, rgb(212, 27, 219));

  .login-plane {
    padding: 20px;
    // background-color: white;
    box-shadow: 0px 0px 15px rgb(0, 0, 0);
    width: 250px;
    border-radius: 10px;

    .title {
      width: 100%;
      // font-weight: bold;
      color: white;

      font-size: 18px;
      margin-bottom: 15px;
      display: flex;
      justify-content: center;
    }

    .submit-btn {
      width: 100%;
    }
  }


}
</style>