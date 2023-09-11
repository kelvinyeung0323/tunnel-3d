import Cookies from 'js-cookie';

const TokenKey = 'access_token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 }); // 设置cookies 1天 过期
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
