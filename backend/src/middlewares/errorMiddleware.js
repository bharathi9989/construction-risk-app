// src/middlewares/errorMiddleware.js
export default function errorMiddleware(err, req, res, next) {
  console.error("Error:", err);

  const status = err.statusCode || 500;
  const message = err.message || "Internal server Error";

  res.status(status).json({
    success: false,
    message,
  });
}
