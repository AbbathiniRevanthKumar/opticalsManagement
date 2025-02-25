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
  const { companyId, materialId, modelId, typeId, priceId } = details;
  if (!companyId || !materialId || !modelId || !typeId || !priceId) {
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
    sightId: sightId,
    priceId: priceId,
  };

  const referenceId = await addLensReferenceIds(referenceDetails);

  const lensDetails = {
    lensCode: lensCode,
    lensName: lensName,
    referenceId: referenceId,
    purchaseDate: purchaseDate,
    qty: qty,
    extraDetails: extraDetails,
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
