const lens_model = require("../models/lens");
const { asyncHandler } = require("../utils/asyncHandler");

exports.addLensTypes = asyncHandler(async (req, res, next) => {
  const { typeCode, lensType } = req.body;

  if (!lensType) {
    throw new Error("Please provide lens type details");
  }

  const results = await lens_model.addLensTypes({ typeCode, lensType });
  if (results) {
    return res.status(201).json({
      success: true,
      message: "Lens type added",
    });
  }
  res.statusCode = 500;
  throw new Error("Try again!");
});

exports.addLensModels = asyncHandler(async (req, res, next) => {
  const { modelCode, lensModel } = req.body;

  if (!lensModel) {
    throw new Error("Please provide lens model details");
  }

  const results = await lens_model.addLensModels({ modelCode, lensModel });
  if (results) {
    return res.status(201).json({
      success: true,
      message: "Lens model added",
    });
  }
  res.statusCode = 500;
  throw new Error("Try again!");
});

exports.addLensMaterials = asyncHandler(async (req, res, next) => {
  const { materialCode, lensMaterial } = req.body;

  if (!lensMaterial) {
    throw new Error("Please provide lens material details");
  }

  const results = await lens_model.addLensMaterials({
    materialCode,
    lensMaterial,
  });
  if (results) {
    return res.status(201).json({
      success: true,
      message: "Lens material added",
    });
  }
  res.statusCode = 500;
  throw new Error("Try again!");
});

exports.addLensCompanies = asyncHandler(async (req, res, next) => {
  const { companyCode, lensCompany } = req.body;

  if (!lensCompany) {
    throw new Error("Please provide lens company details");
  }

  const results = await lens_model.addLensCompanies({
    companyCode,
    lensCompany,
  });
  if (results) {
    return res.status(201).json({
      success: true,
      message: "Lens company added",
    });
  }
  res.statusCode = 500;
  throw new Error("Try again!");
});

const addLensSightDetails = asyncHandler(async (details) => {
  const { sph, add = "-", cyl = "-0.00" } = details;

  if (!sph || !cyl) throw new Error("Provide proper sight details");

  const results = await lens_model.addLensSightDetails({ sph, add, cyl });
  return results;
});

const addLensPriceDetails = asyncHandler(async (details) => {
  const { purchasePrice, salesPrice, discount = 0 } = details;

  if (!purchasePrice || !salesPrice)
    throw new Error("Provide proper price details");

  const results = await lens_model.addLensPriceDetails({
    purchasePrice,
    salesPrice,
    discount,
  });
  return results;
});

const addLensReferenceIds = async (details) => {
  const { companyId, materialId, modelId, typeId } = details;
  if (!companyId || !materialId || !modelId || !typeId) {
    throw new Error("Provide needed information");
  }
  const results = await lens_model.addLensReferenceIds(details);
  return results;
};

exports.addLensDetails = asyncHandler(async (req, res, next) => {
  const today = new Date();

  const {
    lensCode = "",
    lensName,
    typeDetails,
    materialDetails,
    modelDetails,
    companyDetails,
    sightDetails,
    priceDetails,
    purchaseDate = today,
    qty,
    extraDetails = "",
  } = req.body;

  if (
    !lensName ||
    !qty ||
    !typeDetails ||
    !materialDetails ||
    !modelDetails ||
    !sightDetails ||
    !priceDetails
  ) {
    throw new Error("Provide Mandatory details");
  }

  if (
    !Object.keys(typeDetails).includes("id") ||
    !Object.keys(materialDetails).includes("id") ||
    !Object.keys(modelDetails).includes("id") ||
    !Object.keys(companyDetails).includes("id")
  ) {
    throw new Error("Provide Sufficient Information");
  }

  //addSightDetails
  const sightId = await addLensSightDetails(sightDetails);

  //addPriceDetails
  const priceId = await addLensPriceDetails(priceDetails);

  const referenceDetails = {
    companyId: companyDetails.id,
    materialId: materialDetails.id,
    modelId: modelDetails.id,
    typeId: typeDetails.id,
  };

  const referenceId = await addLensReferenceIds(referenceDetails);

  const lensDetails = {
    lensCode: lensCode,
    lensName: lensName.trim(),
    referenceId: referenceId,
    purchaseDate: purchaseDate,
    qty: qty,
    extraDetails: extraDetails,
    sightId: sightId,
    priceId: priceId,
  };
  const rows = await lens_model.checkLensDetailsExists(lensDetails);
  if (rows.length > 0) {
    lensDetails.lensCode = rows[0].l_code;
  }
  const results = await lens_model.addLensDetails(lensDetails);
  if (results) {
    return res.status(201).json({
      success: true,
      message: "Lens details added",
    });
  }
  throw new Error(`Try again!`);
});

exports.getLensDetails = asyncHandler(async (req, res, next) => {
  const { code } = req.query;

  const results = await lens_model.getLensDetails(code);
  if (results.length > 0) {
    return res.status(200).json({
      success: true,
      data: results,
    });
  }
  throw new Error("Cannot get lens details");
});

exports.getLensDetailsByProperty = asyncHandler(async (req, res, next) => {
  const { property } = req.query;
  if (!property) {
    throw new Error("Property param is needed");
  }

  const results = await lens_model.getDetailsByProperty(property);
  if (results.length > 0) {
    return res.status(200).json({
      success: true,
      data: results,
    });
  }
  throw new Error(`cannot get lens ${property} details!Try again`);
});

exports.deleteLensDetailsByProperty = asyncHandler(async (req, res, next) => {
  const { property, id } = req.query;
  if (!property || !id) {
    throw new Error("Specify params property and id");
  }

  const results = await lens_model.deleteDetailsByProperty(property, id);
  if (results) {
    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  }
  throw new Error(`cannot delete lens ${property} details!Try again`);
});

exports.deleteLensProduct = asyncHandler(async (req, res, next) => {
  const { lensCode } = req.query;

  if (!lensCode) {
    throw new Error("Specify the lens");
  }
  const result = await lens_model.deleteLensProduct(lensCode);
  if (!result) throw new Error("Please Try again!");
  return res.status(200).json({
    success: true,
    message: "Lens deleted",
  });
});


exports.getLensLowStockDetails = asyncHandler(async (req, res, next) => {
  const results = await lens_model.getLensLowStockDetails();
  if (results.length >= 0) {
    return res.status(200).json({
      success: true,
      data: results,
    });
  }
  throw new Error("Error getting lens lowstock");
});

exports.getLensDetailsByLensName = asyncHandler(async (req, res, next) => {
  let { lensName } = req.query;
  if (!lensName) throw new Error("Provide lens name");

  lensName = lensName.trim();
  const lensDetails = await lens_model.getLensDetailsByLensName(lensName);
  
  if (lensDetails.length == 0)
    return res.status(200).json({ success: true, data: lensDetails });

  //map each lens to get all details
  let totalLensDetails = lensDetails.map(async (lens) => {
    const lensDetail = await lens_model.getLensDetails(lens.l_code);
    return lensDetail[0];
  });

  totalLensDetails = await Promise.all(totalLensDetails);

  res.status(200).json({
    success: true,
    data: totalLensDetails,
  });
});

exports.updateQty = asyncHandler(async (req, res, next) => {
  const { code, qty } = req.body;
  if (!code || !qty) {
    throw new Error("Code and Qty is needed");
  }
  const results = await lens_model.updateQty(code, qty);
  if (results) {
    return res.status(200).json({
      success: true,
      message: "Quantity updated",
    });
  }
  throw new Error("Try again");
});