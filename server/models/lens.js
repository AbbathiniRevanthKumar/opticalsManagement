const db = require("../utils/db");

//lensTypes - type of vision
exports.addLensTypes = async (details) => {
  const query = `INSERT INTO lens_types(l_type_code,l_type) VALUES($1,$2)
    ON CONFLICT(l_type_code)
    DO UPDATE 
        SET l_type = EXCLUDED.l_type,updated_at = CURRENT_TIMESTAMP
    RETURNING id;
    `;
  const isAlreadyExists = `SELECT * FROM lens_types WHERE l_type = $1`;
  const codeQuery = `UPDATE lens_types SET l_type_code = $1 WHERE id=$2`;

  const { rows: isExists } = await db.query(isAlreadyExists, [
    details.lensType,
  ]);
  if (isExists.length > 0) {
    throw new Error("Lens type already exists");
  }

  try {
    const { rows: insertedId } = await db.query(query, [
      details.typeCode,
      details.lensType,
    ]);

    if (insertedId.length > 0) {
      const { id } = insertedId[0];
      let code = `LT${String(id).padStart(6, "0")}`;

      const { rowCount } = await db.query(codeQuery, [code, id]);
      if (rowCount > 0) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error("Error at adding lens type :", error.message);
  }
};

exports.addLensModels = async (details) => {
  const query = `INSERT INTO lens_models( l_model_code ,l_model ) VALUES($1,$2)
      ON CONFLICT(l_model_code)
      DO UPDATE 
          SET l_model = EXCLUDED.l_model,updated_at = CURRENT_TIMESTAMP
      RETURNING id;
      `;
  const isAlreadyExists = `SELECT * FROM lens_models WHERE l_model = $1`;
  const codeQuery = `UPDATE lens_models SET l_model_code = $1 WHERE id=$2`;

  const { rows: isExists } = await db.query(isAlreadyExists, [
    details.lensModel,
  ]);
  if (isExists.length > 0) {
    throw new Error("Lens Model already exists");
  }

  try {
    const { rows: insertedId } = await db.query(query, [
      details.modelCode,
      details.lensModel,
    ]);

    if (insertedId.length > 0) {
      const { id } = insertedId[0];
      let code = `LM${String(id).padStart(6, "0")}`;

      const { rowCount } = await db.query(codeQuery, [code, id]);
      if (rowCount > 0) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error("Error at adding lens model :", error.message);
  }
};

exports.addLensMaterials = async (details) => {
  const query = `INSERT INTO lens_materials( l_material_code , l_material ) VALUES($1,$2)
        ON CONFLICT(l_material_code)
        DO UPDATE 
            SET l_material_code = EXCLUDED.l_material,updated_at = CURRENT_TIMESTAMP
        RETURNING id;
        `;
  const isAlreadyExists = `SELECT * FROM lens_materials WHERE l_material = $1`;
  const codeQuery = `UPDATE lens_materials SET l_material_code = $1 WHERE id=$2`;

  const { rows: isExists } = await db.query(isAlreadyExists, [
    details.lensMaterial,
  ]);
  if (isExists.length > 0) {
    throw new Error("Lens Material already exists");
  }

  try {
    const { rows: insertedId } = await db.query(query, [
      details.materialCode,
      details.lensMaterial,
    ]);

    if (insertedId.length > 0) {
      const { id } = insertedId[0];
      let code = `LF${String(id).padStart(6, "0")}`;

      const { rowCount } = await db.query(codeQuery, [code, id]);
      if (rowCount > 0) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error("Error at adding lens material :", error.message);
  }
};

exports.addLensCompanies = async (details) => {
  const query = `INSERT INTO lens_companies(  l_company_code , l_company ) VALUES($1,$2)
          ON CONFLICT(l_company_code)
          DO UPDATE 
              SET l_company = EXCLUDED.l_company,updated_at = CURRENT_TIMESTAMP
          RETURNING id;
          `;
  const isAlreadyExists = `SELECT * FROM lens_companies WHERE l_company = $1`;
  const codeQuery = `UPDATE lens_companies SET l_company_code = $1 WHERE id=$2`;

  const { rows: isExists } = await db.query(isAlreadyExists, [
    details.lensCompany,
  ]);
  if (isExists.length > 0) {
    throw new Error("Lens Company already exists");
  }

  try {
    const { rows: insertedId } = await db.query(query, [
      details.companyCode,
      details.lensCompany,
    ]);

    if (insertedId.length > 0) {
      const { id } = insertedId[0];
      let code = `LC${String(id).padStart(6, "0")}`;

      const { rowCount } = await db.query(codeQuery, [code, id]);
      if (rowCount > 0) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error("Error at adding lens company :", error.message);
  }
};

exports.addLensSightDetails = async (details) => {
  const query = `INSERT INTO lens_sight_details(spherical,addition,cylinder) VALUES($1,$2,$3) 
  ON CONFLICT(spherical,addition,cylinder) 
  DO UPDATE 
    SET updated_at = CURRENT_TIMESTAMP
  RETURNING id;
  `;

  try {
    const { rows } = await db.query(query, [
      details.sph,
      details.add,
      details.cyl,
    ]);
    if (rows.length > 0) {
      return rows[0].id;
    }
    throw new Error("Try again to add sight details");
  } catch (error) {
    error.statusCode = 500;
    throw new Error(`Error at adding lens references : ${error.message}`);
  }
};

exports.addLensPriceDetails = async (details) => {
  const query = `INSERT INTO lens_price_details(l_pruchase_price,l_sales_price,l_discount ) VALUES($1,$2,$3) 
  ON CONFLICT(l_pruchase_price,l_sales_price,l_discount) 
  DO UPDATE 
    SET updated_at = CURRENT_TIMESTAMP
  RETURNING id;
  `;

  try {
    const { rows } = await db.query(query, [
      details.purchasePrice,
      details.salesPrice,
      details.discount,
    ]);
    if (rows.length > 0) {
      return rows[0].id;
    }
    throw new Error("Try again to add price details");
  } catch (error) {
    error.statusCode = 500;
    throw new Error(`Error at adding lens references : ${error.message}`);
  }
};

exports.addLensReferenceIds = async (details) => {
  const query = `INSERT INTO lens_reference_details(  l_company_id ,l_type_id , l_model_id , l_material_id , l_sight_id , l_price_id ) VALUES($1,$2,$3,$4,$5,$6) 
  ON CONFLICT ( l_company_id ,l_type_id , l_model_id , l_material_id , l_sight_id , l_price_id ) 
  DO UPDATE 
    SET
    updated_at = CURRENT_TIMESTAMP
  RETURNING id`;
  try {
    const { rows } = await db.query(query, [
      details.companyId,
      details.typeId,
      details.modelId,
      details.materialId,
      details.sightId,
      details.priceId,
    ]);
    return rows[0].id;
  } catch (error) {
    throw new Error(`Error at adding lens references : ${error.message}`);
  }
};

exports.addLensDetails = async (details) => {
  const insertquery = `INSERT INTO lens_details( l_code ,l_name ,l_reference_id , l_extra_details ,l_purchase_date ,l_qty)
  VALUES($1,$2,$3,$4,$5,$6) 
  ON CONFLICT (l_code)
  DO UPDATE 
    SET l_name = EXCLUDED.l_name,
    l_reference_id = EXCLUDED.l_reference_id,
    l_extra_details = EXCLUDED.l_extra_details,
    l_purchase_date = EXCLUDED.l_purchase_date,
    l_qty = EXCLUDED.l_qty,
    updated_at = CURRENT_TIMESTAMP,
    status = 1
  RETURNING id;
  `;

  const codeUpdateQuery = `UPDATE lens_details SET l_code = $1 WHERE id = $2`;

  try {
    await db.query("BEGIN");
    const { rows } = await db.query(insertquery, [
      details.lensCode,
      details.lensName,
      details.referenceId,
      details.extraDetails,
      details.purchaseDate,
      details.qty,
    ]);
    if (rows.length > 0 && details.lensCode === "") {
      const code = `LN${String(rows[0].id).padStart(6, "0")}`;
      const { rows: codeResult } = await db.query(codeUpdateQuery, [
        code,
        rows[0].id,
      ]);
      if (codeResult.length > 0) {
        await db.query("COMMIT");
        return true;
      }
    }
    if (rows.length > 0) {
      await db.query("COMMIT");
      return true;
    }
    await db.query("ROLLBACK");
    throw new Error("Problem at adding lens details");
  } catch (error) {
    await db.query("ROLLBACK");
    throw new Error(`Error inserting lens details,${error.message}`);
  }
};

exports.checkLensDetailsExists = async (details) => {
  const query = `SELECT id,l_code FROM lens_details WHERE l_name='${details.lensName}' AND l_reference_id = '${details.referenceId}' AND l_extra_details ='${details.extraDetails}' AND l_purchase_date='${details.purchaseDate}' AND l_qty = '${details.qty}'`;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getLensDetails = async (code) => {
  let condition = "WHERE a.status = 1";
  if (code) {
    condition = ` AND l_code = '${String(code).toUpperCase()}'`;
  }
  const query = `SELECT a.*,b.l_material_id,b.l_model_id,b.l_type_id,b.l_company_id,c.l_material,d.l_model,e.l_type,f.l_company,g.l_pruchase_price,g.l_sales_price,g.l_discount,h.spherical,h.cylinder,h.addition
  FROM lens_details a
  JOIN lens_reference_details b ON a.l_reference_id = b.id
  JOIN lens_materials c ON b.l_material_id = c.id
  JOIN lens_models d ON b.l_model_id = d.id
  JOIN lens_types e ON b.l_type_id = e.id
  JOIN lens_companies f ON b.l_company_id =f.id
  JOIN lens_price_details g ON b.l_price_id = g.id
  JOIN lens_sight_details h ON b.l_sight_id = h.id
  ${condition}
  ORDER BY updated_at DESC;`;

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getDetailsByProperty = async (property) => {
  let query = "";
  switch (property) {
    case "materials": {
      query = `SELECT l_material as name ,id as id,l_material_code as code FROM lens_materials WHERE status = 1 ORDER BY l_material ASC`;
      break;
    }
    case "models": {
      query = `SELECT l_model as name ,id as id,l_model_code as code FROM lens_models WHERE status = 1 ORDER BY l_model ASC`;
      break;
    }
    case "types": {
      query = `SELECT l_type as name ,id as id,l_type_code as code FROM lens_types WHERE status = 1 ORDER BY l_type ASC`;
      break;
    }
    case "companies": {
      query = `SELECT l_company as name ,id as id,l_company_code as code FROM lens_companies  WHERE status = 1 ORDER BY l_company ASC`;
      break;
    }
  }
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteDetailsByProperty = async (property,id) => {
  let query = "";
  switch (property) {
    case "materials": {
      query = `UPDATE lens_materials SET status = 0 WHERE id = ${id}`;
      break;
    }
    case "models": {
      query = `UPDATE lens_models SET status = 0 WHERE id = ${id}`;
      break;
    }
    case "types": {
      query = `UPDATE lens_types SET status = 0 WHERE id = ${id}`;
      break;
    }
    case "companies": {
      query = `UPDATE lens_companies SET status = 0 WHERE id = ${id}`;
      break;
    }
  }
  try {
    const { rowCount } = await db.query(query);
    return rowCount>0 ? true : false;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteLensProduct = async (lensCode) => {
  const deleteQuery = `UPDATE lens_details SET status = 0 WHERE l_code = '${lensCode}'`;
  try {
    const { rowCount } = await db.query(deleteQuery);
    console.log(rowCount);

    return rowCount > 0 ? true : false;
  } catch (error) {
    throw new Error(`Error at deleting the lens product : ${error.message}`);
  }
};
