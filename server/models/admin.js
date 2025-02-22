const db = require("../utils/db");
exports.addAdminUser = async (userDetails) => {
  const userDetailsInsertQuery = `INSERT INTO admin_users(username,email,password,role) VALUES($1,$2,$3,$4)`;
  try {
    const { rowCount } = await db.query(userDetailsInsertQuery, [
      userDetails.username,
      userDetails.email,
      userDetails.password,
      userDetails.role
    ]);
    if (rowCount) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAdminUser = async (email) => {
  const adminUserQuery = `SELECT * FROM admin_users WHERE email = $1`;
  
  try {
    const { rows, fields } = await db.query(adminUserQuery,[email]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  } catch (error) {
    throw new Error(error);
  }
};
