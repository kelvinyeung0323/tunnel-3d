<template>
  <div class='login-view'>
    <div class='login-plane'>
      <el-form>
        <el-input v-model='username' />
        <el-input v-model='password'/>
      </el-form>
    </div>
  </div>
</template>
<script name='login' setup>
import {ref} from 'vue';
import {login} from '@/api/auth-api';

const username = ref("");
const password = ref("");


function doLogin(){
  login(username,password).then((resp)=>{
    //保存tocken

  }).catch(e=>{

  })
}

</script>

<style lang='less' scoped>
.login-view{

  .login-plane{

  }
}

</style>