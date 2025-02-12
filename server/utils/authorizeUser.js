const { asyncHandler } = require("../utils/asyncHandler");

exports.authorizeByRole = (allowedRoles) => {
  return (req, res, next) => {
    
    if (!req.user.role) {
      res.statusCode = 403;
      throw new Error("Access Denied. No role found");
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.statusCode = 403;
      throw new Error("Access Denied. Insufficent Permissions");
    }
    next();
  };
};
