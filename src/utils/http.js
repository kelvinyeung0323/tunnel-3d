/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useAuthStore } from '../store/auth-store'
import {  ElNotification } from 'element-plus';
import router from '@/router/router.js';


/** 是否显示了未登录的信息 - 防止重复显示 */
let IsShowNoLoginMsg = false;

const http = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API,
  timeout: 60000, //毫秒
  withCredentials: false, //使用tocken 不需cookie
  headers: { 'Content-Type': 'application/json' },
  // transformRequest: (data) => JSON.stringify(data),
});

/**
 *  设置拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * TOKEN校验(JWT),接收服务器返回的token,存储到vuex/本地存储中，
 * 第一次向服务器发请求，我们应该把token带上
 */
http.interceptors.request.use(
  config => {
    //携带token
    const authStore = useAuthStore();
    let token = authStore.getToken();
    token && (config.headers.Authorization = `Bearer ${token}`);
    if (config.headers['Content-type'] === 'application/json') {
      config.transformRequest = JSON.stringify(config.data);
    } else {
      config.headers = { 'Content-type': 'application/x-www-form-urlencoded' };
    }
    if (import.meta.env.NODE_ENV === 'development') {
      // 单点登录，开发模式的传参
      config.headers.dev = true;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
/**
 * 响应拦截器
 */

http.validateStatus = status => {
  //自定义响应成功的HTTP状态码
  return /^(2|3)\d{2}$/.test(status);
};



http.interceptors.response.use(
  response => {
    let ret = response.data;
    return ret;
  },
  error => {
    const authStore = useAuthStore();
    let { response } = error;
    if (response) {
      //服务器错误
      switch (response.status) {
        //401未登录
        case 401:
        case 403:
          //token 过期
          authStore.removeToken('Authorization');
          router.push('/login');
          break;
        case 404:
          //找不到地址
          break;
        default:
          ElNotification({
            message: response.data.message
              ? response.data.message
              : response.data.error,
            duration: 5 * 1000,
            type: 'error',
          });
      }
    } else {
      //服务器无响应或网络不通
      if (error.message == 'Network Error') {
        // message.error('请求超时，请稍候重试...');
        ElNotification({
          message: '请求超时，请稍候重试...',
          duration: 5 * 1000,
          type: 'error',
        });
      } else if (!window.navigator.onLine) {
        //断网处理：可以跳转到断网页面
        // message.error('请求超时失，请检查网络连接情况...');
        ElNotification({
          message: '请求超时失，请检查网络连接情况...',
          duration: 5 * 1000,
          type: 'error',
        });
        return;
      }
      return Promise.reject(error);
    }
    Promise.reject(error);
  }
);

export default http;
