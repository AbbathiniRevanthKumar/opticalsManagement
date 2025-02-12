const { authenticateUser } = require("../utils/jwtToken");
const frameController = require("../controllers/frames");
const {authorizeByRole} = require("../utils/authorizeUser");

const router = require("express").Router();

router.post("/addOrUpdateFrameMaterialType", authenticateUser,authorizeByRole(['super-admin']),frameController.addOrUpdateMaterialTypes);
router.post("/addOrUpdateFrameModelType", authenticateUser,authorizeByRole(['super-admin']),frameController.addOrUpdateModelType);
router.post("/addOrUpdateFrameSize", authenticateUser,authorizeByRole(['super-admin']),frameController.addOrUpdateSize);
module.exports = router;
router.post("/addOrUpdateFrameCompany", authenticateUser,authorizeByRole(['super-admin']),frameController.addOrUpdateCompany);
router.post("/addFrameDetails",authenticateUser,authorizeByRole(['super-admin','admin']),frameController.addOrUpdateFrameDetails);

router.get("/getFramePropertyDetails",authenticateUser,authorizeByRole(['super-admin','admin']),frameController.getFrameSubDetailsByProperty);
router.get("/getFrameDetails",authenticateUser,authorizeByRole(['super-admin','admin']),frameController.getFrameDetails);
module.exports = router;