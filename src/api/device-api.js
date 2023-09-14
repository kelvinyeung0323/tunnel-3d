import axios from "@/utils/http";
export function listDevices(params) {
  return axios.get("/api/devices", { params });
}

export function getDevice(id) {
  return axios.get("/api/device/" + id);
}
export function addDevice(params) {
  return axios.post("/api/device", params);
}

export function updateDevice(params) {
  return axios.put("/api/device", params);
}

export function delDevices(ids) {
  return axios.delete("/api/device", params);
}
