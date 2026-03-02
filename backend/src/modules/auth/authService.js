// src/modules/auth/authService.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db.js";
import { ENV } from "../../config/env.js";
import { HttpError } from "../../core/httpException.js";

export const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new HttpError(400, "username, email and password is required");
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    throw new HttpError(409, "User already exists");
  }

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashed,
      role: "ENGINEER",
    },
  });

  const { password: _, ...userSafe } = user;
  return { userSafe };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new HttpError(400, "email and password is required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      role: true,
    },
  });

  if (!user) throw new HttpError(401, "invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new HttpError(401, "invalid credentials");

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    ENV.JWT_SECRET,
    { expiresIn: "1d" },
  );

  const { password: _, ...userSafe } = user;

  return { token, userSafe };
};
