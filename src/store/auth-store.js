import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('auth-store', () => {


  const accessToken = ref(null);

  function saveToken(token){
    accessToken.value = token;
    localStorage.setItem("access_token",token);
  }
  function getToken(){
    if(!accessToken.value){
     let token= localStorage.getItem("access_token");
     accessToken.value = token;
    }
    return accessToken.value;
  }

  function isLogin(){
    if(accessToken.value){
      return true;
    }
    return false;
  }
  function removeToken(){
    accessToken.value = null;
    localStorage.removeItem("access_token");
  }
  return {  isLogin,removeToken,getToken,saveToken };
})