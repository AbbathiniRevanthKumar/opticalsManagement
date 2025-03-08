const { authorizeByRole } = require("../utils/authorizeUser");
const { authenticateUser } = require("../utils/jwtToken");
const {sendMailWithAttachment} = require("../utils/mailHandler");

const router = require("express").Router();

//mailHandler
router.post(
  "/sendMail",
  authenticateUser,
  authorizeByRole(["super-admin"]),
  sendMailWithAttachment
);

module.exports = router;
