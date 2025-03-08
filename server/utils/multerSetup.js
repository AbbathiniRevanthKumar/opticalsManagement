const multer = require("multer");


const tempStorage = multer.memoryStorage();

const tempUpload = multer({storage : tempStorage});

module.exports = {tempUpload};