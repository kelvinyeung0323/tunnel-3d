
import axios from '@/utils/http';

export function getCodecInfo(suuid){
  axios.get("/cctv/codec/"+suuid)
}

export function getRemoteSdp(suuid, sdp){
  axios.get("/cctv/sdp/"+suuid)
}