import axios from "@/utils/http";

export function getCodecInfo(suuid) {
  return axios.get("/api/cctv/codec/" + suuid);
}

export function getRemoteSdp(suuid, sdp) {
  return axios.get("/api/cctv/sdp/" + suuid);
}
