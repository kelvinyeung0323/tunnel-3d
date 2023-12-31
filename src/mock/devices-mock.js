const deviceList = [
  {
    deviceId: "1",
    deviceName: "交通灯-海珠01",
    type: "traffic-light",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "2",
    deviceName: "交通灯-海珠01",
    type: "traffic-light",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "3",
    deviceName: "摄像头-海珠01",
    type: "cctv",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "3",
    deviceName: "摄像头-海珠02",
    type: "cctv",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "4",
    deviceName: "声光报警器-海珠01",
    type: "alarm",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "5",
    deviceName: "道闸-海珠01",
    type: "fence",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "6",
    deviceName: "道闸-海珠02",
    type: "fence",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "7",
    deviceName: "道闸-海珠03",
    type: "fence",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "8",
    deviceName: "路道指示器-海珠01",
    type: "indicator",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "9",
    deviceName: "路道指示器-海珠02",
    type: "indicator",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "10",
    deviceName: "路道指示器-海珠03",
    type: "indicator",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "11",
    deviceName: "电子水尺-海珠01",
    type: "ruler",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "12",
    deviceName: "电子水尺-海珠02",
    type: "ruler",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "13",
    deviceName: "超声波液位计-海珠01",
    type: "tilt",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "14",
    deviceName: "声光报警器-天河01",
    type: "alarm",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "15",
    deviceName: "声光报警器-天河02",
    type: "alarm",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "16",
    deviceName: "道闸-天河01",
    type: "fence",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "17",
    deviceName: "道闸-天河02",
    type: "fence",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "18",
    deviceName: "道闸-天河03",
    type: "fence",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "closed",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "19",
    deviceName: "道闸-天河04",
    type: "fence",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "20",
    deviceName: "路道指示器-天河01",
    type: "indicator",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "21",
    deviceName: "路道指示器-天河02",
    type: "indicator",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "22",
    deviceName: "路道指示器-天河03",
    type: "indicator",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "23",
    deviceName: "路道指示器-天河04",
    type: "indicator",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "24",
    deviceName: "交通灯-天河01",
    type: "traffic-light",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "25",
    deviceName: "交通灯-天河02",
    type: "traffic-light",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "26",
    deviceName: "摄像头-天河01",
    type: "cctv",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "27",
    deviceName: "摄像头-天河02",
    type: "cctv",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "28",
    deviceName: "摄像头-天河03",
    type: "cctv",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "29",
    deviceName: "电子水尺-天河01",
    type: "ruler",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "30",
    deviceName: "电子水尺-天河02",
    type: "ruler",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
  {
    deviceId: "31",
    deviceName: "超声波液位计-天河01",
    type: "tilt",
    rstp: "",
    ip: "@ip",
    port: "3302",
    connStatus: "@pick(['online','offline'])",
    status: "opened",
    description: "设备描述",
    setupAddr: "安装地址",
    faultCause: "",
  },
];
export default [
  {
    url: "/api/devices",
    method: "GET",
    response: (options) => {
      console.log("mock option", options);
      options.query.type;
      let data = deviceList;
      if (options.query.type) {
        data = deviceList.filter((v) => v.type == options.query.type);
      }
      return {
        code: 0,
        msg: "",
        total: 31,
        data: data,
      };
    },
  },
  {
    url: "/api/device/{deviceId}",
    method: "GET",
    response: () => {
      return {
        code: 0,
        msg: "",
        data: [],
      };
    },
  },
  {
    url: "/api/device",
    method: "POST",
    response: () => {
      return {
        code: 0,
        msg: "",
        data: [],
      };
    },
  },
  {
    url: "/api/device/{deviceId}",
    method: "PUT",
    response: () => {
      return {
        code: 0,
        msg: "",
        data: [],
      };
    },
  },
  {
    url: "/api/device/{deviceId}",
    method: "PUT",
    response: () => {
      return {
        code: 0,
        msg: "",
        data: [],
      };
    },
  },
];
