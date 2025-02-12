const bodyParser = require("body-parser");
const express = require("express");
const { errorHandler, notFound } = require("./utils/errorHandler");
const dotenv = require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");
const framesRoutes = require("./routes/framesRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(cors({ origin: allowedOrigins, credentials: true  }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/admin", adminRoutes);
app.use("/api/products/frames", framesRoutes);

app.use(errorHandler);
app.use(notFound);
module.exports = app;
