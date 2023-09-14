export default [
  {
    url: "/api/users",
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
    url: "/api/user/{userId}",
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
    url: "/api/user",
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
    url: "/api/device/",
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
