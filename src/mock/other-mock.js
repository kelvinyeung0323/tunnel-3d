export default [
  {
    url: "/api/cctv/codec/:id",
    method: "GET",
    response: () => {
      return {
        code: 0,
        msg: "",
        data: [{ Type: "video" }],
      };
    },
  },
  {
    url: "/api/cctv/sdp/:id",
    method: "GET",
    response: () => {
      return {
        code: 0,
        msg: "",
        data: "v=0",
      };
    },
  },
];
