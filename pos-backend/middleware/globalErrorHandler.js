const config = require("../config/config");

const globalErrorHandler = (err, req, res, next) => {
  // Debug logs
  console.log('=== Global Error Handler Called ===');
  console.log('err:', err);
  console.log('req exists:', !!req);
  console.log('res exists:', !!res);
  console.log('res.status exists:', typeof res?.status);
  console.log('===================================');

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    status: statusCode,
    message,
    errorStack: config.nodeEnv === "development" ? err.stack : ""
  });
};

module.exports = globalErrorHandler;