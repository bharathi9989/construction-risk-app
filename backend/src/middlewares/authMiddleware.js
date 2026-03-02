// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { HttpError } from "../core/httpException.js";

export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new HttpError(401, "No token provided"));
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    // decoded now contains id + role
    req.user = decoded;

    next();
  } catch (err) {
    next(new HttpError(401, "Invalid or expired token"));
  }
}
