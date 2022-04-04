import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const http = {
  register: async (body) => {
    try {
      const response = await api.post("/register", body);
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  search: async (body) => {
    try {
      const response = await api.post("/search", body);
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  changeStatus: async (body) => {
    try {
      const response = await api.put("/change-status", body);
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  remove: async (body) => {
    try {
      const response = await api.delete("/remove", {
        data: body
      });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  log: async () => {
    try {
      const response = await api.get("/log-server");
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
};
export default http;
