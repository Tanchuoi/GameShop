function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  // Set default status code if it's not set by the custom error
  const statusCode = err.status || 500;

  // Always respond with JSON
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
}

module.exports = errorHandler;
