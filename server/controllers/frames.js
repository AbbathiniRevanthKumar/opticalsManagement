const { asyncHandler } = require("../utils/asyncHandler");
const frameModel = require("../models/frames");

exports.addOrUpdateMaterialTypes = asyncHandler(async (req, res, next) => {
  const { materialCode = "", materialType } = req.body;
  if (!materialType) {
    throw new Error("Provide mandatory fields");
  }
  const response = await frameModel.addOrUpdateMaterialType({
    materialCode,
    materialType,
  });
  if (response) {
    res.status(201).json({
      success: true,
      message: "Material Type Added",
    });
    return;
  }
  throw new Error("Please Try agian!");
});

exports.addOrUpdateModelType = asyncHandler(async (req, res, next) => {
  const { modelCode = "", modelType } = req.body;
  if (!modelType) {
    throw new Error("Provide mandatory fields");
  }
  const response = await frameModel.addOrUpdateModelType({
    modelCode,
    modelType,
  });
  if (response) {
    res.status(201).json({
      success: true,
      message: "Model Type Added",
    });
    return;
  }
  throw new Error("Please Try agian!");
});

exports.addOrUpdateSize = asyncHandler(async (req, res, next) => {
  const { sizeCode = "", size } = req.body;
  if (!size) {
    throw new Error("Provide mandatory fields");
  }
  const response = await frameModel.addOrUpdateSize({
    sizeCode,
    size,
  });
  if (response) {
    res.status(201).json({
      success: true,
      message: "Frame size Added",
    });
    return;
  }
  throw new Error("Please Try agian!");
});

exports.addOrUpdateCompany = asyncHandler(async (req, res, next) => {
  const { companyCode = "", companyName } = req.body;
  if (!companyName) {
    throw new Error("Provide mandatory fields");
  }
  const response = await frameModel.addOrUpdateCompany({
    companyCode,
    companyName,
  });
  if (response) {
    res.status(201).json({
      success: true,
      message: "Frame company Added",
    });
    return;
  }
  throw new Error("Please Try agian!");
});

const addPriceDetails = async (priceDetails) => {
  const { purchasePrice, salesPrice, discount = 0 } = priceDetails;
  if (!purchasePrice || !salesPrice) {
    throw new Error("Provide mandatory price fields");
  }
  const response = await frameModel.addFramePrices({
    purchasePrice,
    salesPrice,
    discount,
  });
  if (response.length > 0) {
    return response[0].id;
  }
  throw new Error("Please Try agian!");
};

const addFrameReferenceIds = async (referenceDetails) => {
  const { frameCompanyId, frameMaterialId, frameModelId, sizeId } =
    referenceDetails;
  if ((!frameCompanyId, !frameMaterialId, !frameModelId, !sizeId)) {
    throw new Error("Provide needed information");
  }
  const results = await frameModel.addFrameDetailsReferences(referenceDetails);
  if (results.length > 0) {
    return results[0].id;
  }
  throw new Error("Cannot add frame details try again");
};

exports.getFrameSubDetailsByProperty = asyncHandler(async (req, res, next) => {
  const { property, id } = req.query;

  if (!property) {
    throw new Error("Provide required params");
  }

  const results = await frameModel.getFrameSubDetailsByProperty(property, id);
  if (results) {
    return res.status(200).json({
      success: true,
      data: results,
    });
  }

  res.statusCode = 500;
  throw new Error("Error at fetching frame property details");
});

exports.addOrUpdateFrameDetails = asyncHandler(async (req, res, next) => {
  let today = new Date();
  const {
    frameCode,
    frameName,
    frameCompanyDetails,
    frameMaterialDetails,
    frameModelDetails,
    sizeDetails,
    priceDetails,
    extraDetails = "",
    purchaseDate = today,
    qty,
  } = req.body;

  if (
    !frameName ||
    !frameCompanyDetails ||
    !frameMaterialDetails ||
    !frameModelDetails ||
    !sizeDetails ||
    !priceDetails ||
    !qty
  ) {
    throw new Error("Provide mandatory fields");
  }
  if (
    !Object.keys(frameMaterialDetails).includes("id") ||
    !Object.keys(frameModelDetails).includes("id") ||
    !Object.keys(frameCompanyDetails).includes("id") ||
    !Object.keys(sizeDetails).includes("id")
  ) {
    throw new Error("Provide sufficient information");
  }

  //add price details
  const framePriceId = await addPriceDetails(priceDetails);

  const referenceDetails = {
    frameCompanyId: frameCompanyDetails.id,
    frameMaterialId: frameMaterialDetails.id,
    frameModelId: frameModelDetails.id,
    sizeId: sizeDetails.id,
  };

  const frameReferencesId = await addFrameReferenceIds(referenceDetails);

  const frameDetailsBody = {
    frameCode,
    frameName: frameName.trim(),
    frameReferencesId,
    extraDetails,
    purchaseDate,
    qty,
    priceId: framePriceId,
  };

  //add frame details
  const checkFrameExists = await frameModel.checkFrameDetailsExists(
    frameDetailsBody
  );
  if (checkFrameExists.length > 0) {
    frameDetailsBody.frameCode = checkFrameExists[0].f_code;
  }
  const frameDetailsResult = await frameModel.addOrUpdateFrameDetails(
    frameDetailsBody
  );
  if (frameDetailsResult) {
    return res.status(201).json({
      success: true,
      message: "Frame details added",
    });
  }
  throw new Error("Error adding or updating frame details");
});

exports.getFrameDetails = asyncHandler(async (req, res, next) => {
  const { frameCode } = req.query;

  const results = await frameModel.getFrameDetails(frameCode);
  if (results.length > 0) {
    return res.status(200).json({
      success: true,
      data: results,
    });
  }
  res.statusCode = 404;
  throw new Error("Frame not exists");
});

exports.deleteFrameProduct = asyncHandler(async (req, res, next) => {
  const { frameCode } = req.query;

  if (!frameCode) {
    throw new Error("Specify the Frame");
  }
  const result = await frameModel.deleteFrameProduct(frameCode);
  if (!result) throw new Error("Please Try again!");
  return res.status(200).json({
    success: true,
    message: "Frame deleted",
  });
});

exports.deleteFrameSubDetailsByProperty = asyncHandler(
  async (req, res, next) => {
    const { property, id } = req.query;

    if (!property || !id) {
      throw new Error("Provide required params");
    }

    const results = await frameModel.deleteFrameSubDetailsByProperty(
      property,
      id
    );
    if (results > 0) {
      return res.status(200).json({
        success: true,
        message: "Deleted Successfully",
      });
    }

    res.statusCode = 500;
    throw new Error("Error at deleting frame property details");
  }
);

exports.getPurchaseDateTrends = asyncHandler(async (req, res, next) => {
  const { type } = req.query;
  if (!type) {
    throw new Error("Provide product type");
  }
  const results = await frameModel.getPurchaseDateTrends(type);
  res.status(200).json({
    success: true,
    data: results,
  });
});

exports.getFrameLowStockDetails = asyncHandler(async (req, res, next) => {
  const results = await frameModel.getFrameLowStockDetails();
  if (results.length >= 0) {
    return res.status(200).json({
      success: true,
      data: results,
    });
  }
  throw new Error("Error getting frames lowstock");
});

exports.getFrameDetailsByFrameName = asyncHandler(async (req, res, next) => {
  let { frameName } = req.query;
  if (!frameName) throw new Error("Provide frame name");

  frameName = frameName.trim();
  const frameDetails = await frameModel.getFrameDetailsByFrameName(frameName);
  if (frameDetails.length == 0)
    return res.status(200).json({ success: true, data: frameDetails });

  //map each frame to get all details
  let totalFrameDetails = frameDetails.map(async (frame) => {
    const frameDetail = await frameModel.getFrameDetails(frame.f_code);
    return frameDetail[0];
  });

  totalFrameDetails = await Promise.all(totalFrameDetails);

  res.status(200).json({
    success: true,
    data: totalFrameDetails,
  });
});

exports.updateQty = asyncHandler(async (req, res, next) => {
  const { code, qty } = req.body;
  if (!code || !qty) {
    throw new Error("Code and Qty is needed");
  }
  const results = await frameModel.updateQty(code, qty);
  if (results) {
    return res.status(200).json({
      success: true,
      message: "Quantity updated",
    });
  }
  throw new Error("Try again");
});
