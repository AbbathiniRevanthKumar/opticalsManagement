exports.errorHandler = (err, req, res, next) => { 
  
  const errorMessage = err.message || "Internal server error";
  const errorCode = err.statusCode || res.statusCode === 200 ? 400 : 500;

  return res.status(errorCode).json({
    success: false,
    message: errorMessage,
    stack: process.env.NODE_ENV === "Production" ? null : err.stack,
  });
};

exports.notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "Request not found",
  });
};
