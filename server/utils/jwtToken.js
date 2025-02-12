const jwt = require("jsonwebtoken");
const { hash } = require("bcryptjs");
const { asyncHandler } = require("../utils/asyncHandler");
const SECRET_KEY = process.env.JWT_SECRET_KEY || hash("mySecretKey", 8);
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3d";

generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  return token;
};

exports.setCookie = (payload, res, statusCode, message) => {
  const token = generateToken(payload);

  const cookieOptions = {
    httpOnly: true,
    maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
  };

  res.status(statusCode).cookie("auth", token, cookieOptions).json({
    success: true,
    message,
    token: token,
    userDetails: payload,
  });
  return;
};

verifyToken = async (token) => {
    const decodedUser = jwt.verify(token,SECRET_KEY);    
    return decodedUser;
};

exports.authenticateUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies ? req.cookies?.auth : null;
    
    if(!token)
    {
        res.statusCode = 403;
        throw new Error("Authenctiation Error! Provide Login Credentials");  
    }
    
    const user = await verifyToken(token);
    req.user = user;
    next();
});
