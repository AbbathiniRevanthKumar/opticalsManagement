const db = require("../utils/db");

exports.addOrUpdateMaterialType = async (materialDetails) => {
  const materialInsertQuery = `INSERT INTO frame_material_types (f_material_code, f_material_name, updated_at)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    ON CONFLICT (f_material_code) 
    DO UPDATE
      SET updated_at = EXCLUDED.updated_at, f_material_name = EXCLUDED.f_material_name
    RETURNING id;`;

  const materialCodeQuery = `UPDATE frame_material_types
      SET f_material_code = $1
      WHERE id = $2`;

  const { rows: isMaterialExists } = await db.query(
    "SELECT * FROM frame_material_types WHERE f_material_name = $1",
    [materialDetails.materialType]
  );

  if (isMaterialExists.length > 0) {
    throw new Error("Material Type already exists!");
  }

  try {
    const { rows: material } = await db.query(materialInsertQuery, [
      materialDetails.materialCode,
      materialDetails.materialType,
    ]);

    if (material.length > 0) {
      const { id } = material[0];

      let materialCode = `MT${String(id).padStart(6, "0")}`;

      const { rowCount } = await db.query(materialCodeQuery, [
        materialCode,
        id,
      ]);

      if (rowCount) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error(`Error in addOrUpdateMaterialType: ${error.message}`);
  }
};

exports.addOrUpdateModelType = async (modelDetails) => {
  const modelInsertQuery = `INSERT INTO frame_model_types (f_model_code, f_model_name, updated_at)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    ON CONFLICT (f_model_code) 
    DO UPDATE
      SET updated_at = EXCLUDED.updated_at, f_model_name = EXCLUDED.f_model_name
    RETURNING id;`;

  const modelCodeQuery = `UPDATE frame_model_types
      SET f_model_code = $1
      WHERE id = $2`;

  const { rows: isModelExists } = await db.query(
    "SELECT * FROM frame_model_types WHERE f_model_name = $1",
    [modelDetails.modelType]
  );

  if (isModelExists.length > 0) {
    throw new Error("Model Type already exists!");
  }

  try {
    const { rows: model } = await db.query(modelInsertQuery, [
      modelDetails.modelCode,
      modelDetails.modelType,
    ]);

    if (model.length > 0) {
      const { id } = model[0];

      let modelCode = `MD${String(id).padStart(6, "0")}`;

      const { rowCount } = await db.query(modelCodeQuery, [modelCode, id]);

      if (rowCount) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error(`Error in addOrUpdateModelType: ${error.message}`);
  }
};

exports.addOrUpdateSize = async (sizeDetails) => {
  const sizeInsertQuery = `INSERT INTO frame_sizes (f_size_code, f_size, updated_at)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    ON CONFLICT (f_size_code) 
    DO UPDATE
      SET updated_at = EXCLUDED.updated_at, f_size = EXCLUDED.f_size
    RETURNING id;`;

  const sizeCodeQuery = `UPDATE frame_sizes
      SET f_size_code = $1
      WHERE id = $2`;

  const { rows: isSizeExists } = await db.query(
    "SELECT * FROM frame_sizes WHERE f_size = $1",
    [sizeDetails.size]
  );

  if (isSizeExists.length > 0) {
    throw new Error("Frame size already exists!");
  }

  try {
    const { rows: size } = await db.query(sizeInsertQuery, [
      sizeDetails.sizeCode,
      sizeDetails.size,
    ]);

    if (size.length > 0) {
      const { id } = size[0];

      let sizeCode = `SZ${String(id).padStart(6, "0")}`;

      const { rowCount } = await db.query(sizeCodeQuery, [sizeCode, id]);

      if (rowCount) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error(`Error in addOrUpdateFrameSize: ${error.message}`);
  }
};

exports.addOrUpdateCompany = async (companyDetails) => {
  const companyInsertQuery = `INSERT INTO frame_companies (f_company_code, f_company_name, updated_at)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    ON CONFLICT (f_company_code) 
    DO UPDATE
      SET updated_at = EXCLUDED.updated_at, f_company_name = EXCLUDED.f_company_name
    RETURNING id;`;

  const companyCodeQuery = `UPDATE frame_companies
      SET f_company_code = $1
      WHERE id = $2`;

  const { rows: isCompanyExists } = await db.query(
    "SELECT * FROM frame_companies WHERE f_company_name = $1",
    [companyDetails.companyName]
  );

  if (isCompanyExists.length > 0) {
    throw new Error("Frame company already exists!");
  }

  try {
    const { rows: company } = await db.query(companyInsertQuery, [
      companyDetails.companyCode,
      companyDetails.companyName,
    ]);

    if (company.length > 0) {
      const { id } = company[0];

      let companyCode = `C${String(id).padStart(6, "0")}`;

      const { rowCount } = await db.query(companyCodeQuery, [companyCode, id]);

      if (rowCount) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error(`Error in addOrUpdateFrameCompany: ${error.message}`);
  }
};

exports.addFramePrices = async (priceDetails) => {
  const priceInsertQuery = `INSERT INTO frame_prices( f_purchase_price,f_sales_price,f_discount) VALUES($1,$2,$3) 
  ON CONFLICT (f_purchase_price,f_sales_price,f_discount) 
    DO UPDATE SET updated_at = CURRENT_TIMESTAMP
  RETURNING id`;

  await db.query("BEGIN");
  try {
    const { rows } = await db.query(priceInsertQuery, [
      priceDetails.purchasePrice,
      priceDetails.salesPrice,
      priceDetails.discount,
    ]);
    await db.query("COMMIT");
    return rows;
  } catch (error) {
    await db.query("ROLLBACK");
    throw new Error(error.message);
  }
};

exports.getFrameSubDetailsByProperty = async (property, id = false) => {
  let condition = "";
  let query = "";

  if (id) {
    condition = ` WHERE id = ${id} `;
  } else {
    condition = ` ORDER BY updated_at DESC`;
  }
  switch (property) {
    case "materialType": {
      query = `SELECT id as id,f_material_name  as value,f_material_code as code FROM frame_material_types `;
      break;
    }
    case "modelType": {
      query = `SELECT id as id,f_model_name as value,f_model_code  as code FROM frame_model_types `;
      break;
    }
    case "size": {
      query = `SELECT id as id,f_size as value,f_size_code as code FROM frame_sizes `;
      break;
    }
    case "company": {
      query = `SELECT id as id,f_company_name as value,f_company_code as code FROM frame_companies `;
      break;
    }
    default: {
      throw new Error("Invalid Property details");
    }
  }
  query = query + condition;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching property details : ${error.message}`);
  }
};

exports.deleteFrameSubDetailsByProperty = async (property, id) => {
  let condition = "";
  let query = "";

  condition = ` WHERE id = ${id}`;

  switch (property) {
    case "materialType": {
      query = `DELETE FROM frame_material_types`;
      break;
    }
    case "modelType": {
      query = `DELETE FROM frame_model_types`;
      break;
    }
    case "size": {
      query = `DELETE FROM frame_sizes`;
      break;
    }
    case "company": {
      query = `DELETE FROM frame_companies`;
      break;
    }
    default: {
      throw new Error("Invalid Property details");
    }
  }
  query = query + condition;
  try {
    const { rowCount } = await db.query(query);
    return rowCount;
  } catch (error) {
    throw new Error(`Error deleting property details : ${error.message}`);
  }
};

exports.addFrameDetailsReferences = async (referenceDetails) => {
  const frameReferencesInsertQuery = `INSERT INTO frame_details_reference_ids( f_company_id,f_material_id,f_model_id, f_size_id,f_price_id) VALUES($1,$2,$3,$4,$5) 
  ON CONFLICT (f_company_id,f_material_id,f_model_id, f_size_id,f_price_id) 
  DO UPDATE 
    SET
    updated_at = CURRENT_TIMESTAMP
  RETURNING id `;
  await db.query("BEGIN");
  try {
    const { rows } = await db.query(frameReferencesInsertQuery, [
      referenceDetails.frameCompanyId,
      referenceDetails.frameMaterialId,
      referenceDetails.frameModelId,
      referenceDetails.sizeId,
      referenceDetails.priceId,
    ]);
    await db.query("COMMIT");
    return rows;
  } catch (error) {
    await db.query("ROLLBACK");
    throw new Error(
      `Error at adding frame details references : ${error.message}`
    );
  }
};
exports.checkFrameDetailsExists = async (frameDetails) => {
  const query = `SELECT f_code FROM frame_details WHERE f_name='${frameDetails.frameName}' AND f_reference_id = '${frameDetails.frameReferencesId}' AND f_extra_details = '${frameDetails.extraDetails}' AND f_purchase_date = '${frameDetails.purchaseDate}' AND f_qty = '${frameDetails.qty}'`;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.addOrUpdateFrameDetails = async (frameDetails) => {
  const frameDetailsInsertQuery = `INSERT INTO frame_details( f_code,f_name,f_reference_id,f_extra_details,f_purchase_date,f_qty ) VALUES($1,$2,$3,$4,$5,$6) 
  ON CONFLICT (f_code) 
  DO UPDATE 
    SET f_name=EXCLUDED.f_name,
    f_reference_id = EXCLUDED.f_reference_id,
    f_extra_details=EXCLUDED.f_extra_details,
    f_purchase_date=EXCLUDED.f_purchase_date,
    f_qty=EXCLUDED.f_qty,
    updated_at = CURRENT_TIMESTAMP
  RETURNING id`;

  const frameDetailsCodeQuery = `UPDATE frame_details SET f_code = $1 WHERE id = $2`;
  const frameDetailsExists = `SELECT f_code FROM frame_details WHERE f_code = $1`;

  await db.query("BEGIN");
  try {
    const { rows: isExists } = await db.query(frameDetailsExists, [
      frameDetails.frameCode,
    ]);
    let frameCode = "";
    if (isExists.length > 0) {
      frameCode = isExists[0].f_code;
    }
    const { rows: frameDetailsResult } = await db.query(
      frameDetailsInsertQuery,
      [
        frameCode,
        frameDetails.frameName,
        frameDetails.frameReferencesId,
        frameDetails.extraDetails,
        frameDetails.purchaseDate,
        frameDetails.qty,
      ]
    );
    if (frameDetailsResult.length > 0) {
      const id = frameDetailsResult[0].id;
      const frameCode = `FM${String(id).padStart(6, "0")}`;
      const { rowCount } = await db.query(frameDetailsCodeQuery, [
        frameCode,
        id,
      ]);
      if (rowCount) {
        await db.query("COMMIT");
        return true;
      }
    }
    await db.query("ROLLBACK");
    return false;
  } catch (error) {
    await db.query("ROLLBACK");
    throw new Error(
      `Error at adding or updating frame details : ${error.message}`
    );
  }
};

exports.getFrameDetails = async (frameCode) => {
  let condition = "";

  if (frameCode) {
    frameCode = String(frameCode).toUpperCase();
    condition = ` WHERE f_code = '${frameCode}'`;
  }
  const frameDetailsQuery = `
    SELECT a.*,b.f_company_id,b.f_material_id,b.f_model_id,b.f_size_id,b.f_price_id,c.f_material_name,d.f_model_name,e.f_purchase_price,e.f_sales_price,e.f_discount,f.f_size,g.f_company_name FROM frame_details a
    LEFT JOIN frame_details_reference_ids b ON
     a.f_reference_id = b.id
    LEFT JOIN frame_material_types c ON c.id = b.f_material_id
    LEFT JOIN frame_model_types d ON d.id = b.f_model_id
    LEFT JOIN frame_prices e ON e.id = b.f_price_id
    LEFT JOIN frame_sizes f ON f.id = b.f_size_id
    LEFT JOIN frame_companies g ON g.id = b.f_company_id
    ${condition}
    ORDER BY a.updated_at DESC 
  `;

  try {
    const { rows } = await db.query(frameDetailsQuery);
    return rows;
  } catch (error) {
    throw new Error(`Error at fetching frame details  : ${error.message}`);
  }
};

exports.deleteFrameProduct = async (frameCode) => {
  const deleteQuery = `DELETE FROM frame_details WHERE f_code = '${frameCode}'`;
  try {
    const { rowCount } = await db.query(deleteQuery);
    return rowCount > 0 ? true : false;
  } catch (error) {
    throw new Error(`Error at deleting the frame product : ${error.message}`);
  }
};

exports.getPurchaseDateTrends = async (type) => {
  let query = "";
  if (type === "frames") {
    query =
      "SELECT f_purchase_date as date,sum(f_qty) as qty FROM frame_details GROUP BY(f_purchase_date) ORDER BY f_purchase_date";
  }
  if (type === "lens") {
    query = "";
  }
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error(`Error getting purchase trends`);
  }
};
