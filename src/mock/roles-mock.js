export default [
  {
    url: "/api/devices",
    method: "GET",
    response: () => {
      return {
        code: 0,
        msg: "",
        data: [
          {
            deviceId: "@guid",
            deviceName: "@cname",
            deviceType: "cctv",
            rstp: "",
            ip: "192.168.1.101",
            port: "3302",
            connStatus: "online|offline",
            description: "设备描述",
            setupAddr: "安装地址",
          },
        ],
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
