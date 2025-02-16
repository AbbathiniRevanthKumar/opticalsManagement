const { asyncHandler } = require("../utils/asyncHandler");
const { hash, compare } = require("bcryptjs");
const adminModel = require("../models/admin");
const { setCookie } = require("../utils/jwtToken");
exports.addAdminUser = asyncHandler(async (req, res, next) => {
  const userDetails = req.body;
  if (!userDetails.email || !userDetails.password || !userDetails.username) {
    res.statusCode = 400;
    throw new Error("All fields are mandatory");
  }

  const isEmailExists = await adminModel.getAdminUser(userDetails.email);
  if (isEmailExists.length > 0) {
    res.statusCode = 400;
    throw new Error("Email already exists!");
  }
  const hashedPassword = await hash(userDetails.password, 12);
  userDetails.password = hashedPassword;
  const results = await adminModel.addAdminUser(userDetails);
  if (results) {
    res.status(201).json({
      success: true,
      message: "Registration Successfull",
    });
    return;
  }
  throw new Error("Registration Unsuccessfull");
});

exports.loginAdminUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.statusCode = 400;
    throw new Error("Provide Mandatory Fields");
  }
  const userDetails = await adminModel.getAdminUser(email);
  if (
    userDetails.length > 0 &&
    (await compare(password, userDetails[0].password))
  ) {
    const payload = {
      id: userDetails[0].id,
      username: userDetails[0].username,
      email: userDetails[0].email,
      role : userDetails[0].role,
      created_at: userDetails[0].created_at,
    };
    setCookie(payload, res, 200, "Login success");
    return;
  }
  res.statusCode = 400;
  throw new Error("Invalid Details");
});

exports.getAdminUser = async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user: user,
  });
};

exports.logoutAdminUser = async (req, res, next) => {
  req.user = null;
  res.cookie("auth", "", { maxAge: new Date(0) }).json({
    success: true,
    message: "Logout successfull",
  });
};
