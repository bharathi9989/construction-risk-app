// src/modules/auth/authController.js
import * as AuthService from "./authService.js";

export const register = async (req, res) => {
  const result = await AuthService.registerUser(req.body);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: result.userSafe,
  });
};

export const login = async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  res.json({
    success: true,
    token: result.token,
    user: result.userSafe,
  });
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};
