const apis = {
  adminLogin: "/admin/loginAdmin",
  adminRegister: "/admin/addAdmin",
  fetchAdminUser: "/admin/getAdmin",
  adminLogout: "/admin/logoutAdmin",
  frameProducts: "/products/frames/getFrameDetails",
  getFramesPropertyDetails: "/products/frames/getFramePropertyDetails",
  addFrameDetails: "/products/frames/addFrameDetails",
  deleteFrame: "/products/frames/deleteFrame",
  addOrUpdateFrameCompany: "/products/frames/addOrUpdateFrameCompany",
  addOrUpdateFrameMaterialType: "/products/frames/addOrUpdateFrameMaterialType",
  addOrUpdateFrameModelType: "/products/frames/addOrUpdateFrameModelType",
  addOrUpdateFrameSize: "/products/frames/addOrUpdateFrameSize",
  deleteFrameSubDetailsByProperty:
    "/products/frames/deleteFrameSubDetailsByProperty",
  getPurchaseDateTrends: "/products/frames/getPurchaseDateTrends",
  getLensDetails: "/products/lens/getLensDetails",
  getLensDetailsByProperty: "/products/lens/getLensDetailsByProperty",
  addLensDetails: "/products/lens/addLensDetails",
  deleteLens: "/products/lens/deleteLens",
  addLensType: "/products/lens/addLensType",
  addLensModel: "/products/lens/addLensModel",
  addLensMaterials: "/products/lens/addLensMaterials",
  addLensCompany: "/products/lens/addLensCompany",
  deleteLensDetailsByProperty: "/products/lens/deleteLensDetailsByProperty",
};

export default apis;
