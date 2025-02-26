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
  logoutAdminUser: async () => {
    try {
      const response = await axios.get(apis.adminLogout);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  fetchAdminUser: async () => {
    try {
      const response = await axios.get(apis.fetchAdminUser);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  fetchFrameProducts: async () => {
    try {
      const response = await axios.get(apis.frameProducts);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getFramesPropertyDetails: async (property) => {
    try {
      const response = await axios.get(
        apis.getFramesPropertyDetails + `?property=${property}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addFrameDetails: async (body) => {
    try {
      const response = await axios.post(apis.addFrameDetails, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteFrame: async (code) => {
    try {
      const response = await axios.delete(
        apis.deleteFrame + `?frameCode=${code}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addOrUpdateFrameCompany: async (body) => {
    try {
      const response = await axios.post(apis.addOrUpdateFrameCompany, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addOrUpdateFrameMaterialType: async (body) => {
    try {
      const response = await axios.post(
        apis.addOrUpdateFrameMaterialType,
        body
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addOrUpdateFrameModelType: async (body) => {
    try {
      const response = await axios.post(apis.addOrUpdateFrameModelType, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addOrUpdateFrameSize: async (body) => {
    try {
      const response = await axios.post(apis.addOrUpdateFrameSize, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteFrameSubDetailsByProperty: async (body) => {
    try {
      const response = await axios.delete(
        apis.deleteFrameSubDetailsByProperty +
          `?property=${body.property}&id=${body.id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getPurchaseDateTrends: async (productType) => {
    try {
      const response = await axios.get(
        apis.getPurchaseDateTrends + `?type=${productType}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  //lens

  getLensDetails: async () => {
    try {
      const response = await axios.get(apis.getLensDetails);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getLensDetailsByProperty: async (property) => {
    try {
      const response = await axios.get(
        `${apis.getLensDetailsByProperty}?property=${property}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteLensDetailsByProperty: async (property,id) => {
    try {
      const response = await axios.delete(
        `${apis.deleteLensDetailsByProperty}?property=${property}&id=${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addLensDetails: async (data) => {
    try {
      const response = await axios.post(apis.addLensDetails, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteLens: async (code) => {
    try {
      const response = await axios.delete(
        apis.deleteLens + `?lensCode=${code}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addLensType: async (data) => {
    try {
      const response = await axios.post(apis.addLensType, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addLensModel: async (data) => {
    try {
      const response = await axios.post(apis.addLensModel, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addLensMaterials: async (data) => {
    try {
      const response = await axios.post(apis.addLensMaterials, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addLensCompany: async (data) => {
    try {
      const response = await axios.post(apis.addLensCompany, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default api;
