
import axios from '@/utils/http';
export  function login(username,password){
  return axios.post("/login", {username,password});
}