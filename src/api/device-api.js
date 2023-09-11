import axios from '@/utils/http';
export function listDevices(params){
  return axios.get("/devices",params);
}

export function getDevice(id){
  return  axios.get("/device/"+id);
}
export function addDevice(params){
  return  axios.post("/device",params);
}

export function updateDevice(params){
  return axios.put("/device",params);
}

export function delDevices(ids){
  return axios.delete("/device",params);
}