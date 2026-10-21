import jwt from "jsonwebtoken";
import { config } from "../src/config/env.js";

export const tokenFor = (overrides = {}) =>
  jwt.sign({ sub: 1, username: "admin", isAdmin: true, ...overrides }, config.jwtSecret, {
    expiresIn: "1h",
  });
