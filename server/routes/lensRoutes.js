const router = require("express").Router();
const lensController = require("../controllers/lens");
const { authenticateUser } = require("../utils/jwtToken");
const { authorizeByRole } = require("../utils/authorizeUser");

router.post(
  "/addLensType",
  authenticateUser,
  authorizeByRole(["super-admin"]),
  lensController.addLensTypes
);
router.post(
  "/addLensModel",
  authenticateUser,
  authorizeByRole(["super-admin"]),
  lensController.addLensModels
);
router.post(
  "/addLensMaterials",
  authenticateUser,
  authorizeByRole(["super-admin"]),
  lensController.addLensMaterials
);
router.post(
  "/addLensCompany",
  authenticateUser,
  authorizeByRole(["super-admin"]),
  lensController.addLensCompanies
);

router.post(
  "/addLensDetails",
  authenticateUser,
  authorizeByRole(["super-admin", "admin"]),
  lensController.addLensDetails
);

router.get(
  "/getLensDetails",
  authenticateUser,
  authorizeByRole(["super-admin", "admin"]),
  lensController.getLensDetails
);

router.get(
  "/getLensDetailsByProperty",
  authenticateUser,
  authorizeByRole(["super-admin", "admin"]),
  lensController.getLensDetailsByProperty
);

router.delete(
  "/deleteLens",
  authenticateUser,
  authorizeByRole(["super-admin"]),
  lensController.deleteLensProduct
);

router.delete(
  "/deleteLensDetailsByProperty",
  authenticateUser,
  authorizeByRole(["super-admin"]),
  lensController.deleteLensDetailsByProperty
);
module.exports = router;
