import axios from "../utils/axiosConfig";
import apis from "./apis";

const api = {
  loginAdminUser: async (loginDetails) => {
    try {
      const response = await axios.post(apis.adminLogin, loginDetails);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  logoutAdminUser : async ()=>{
    try {
      const response = await axios.get(apis.adminLogout);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  fetchAdminUser : async()=>{
    try {
      const response = await axios.get(apis.fetchAdminUser);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  fetchFrameProducts : async ()=>{
    try {
      const response = await axios.get(apis.frameProducts);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getFramesPropertyDetails : async(property)=>{
    try {
      const response = await axios.get(apis.getFramesPropertyDetails+`?property=${property}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addFrameDetails : async(body)=>{
    try {
      const response = await axios.post(apis.addFrameDetails,body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
};

export default api;
