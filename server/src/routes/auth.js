import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { pool } from "../db/pool.js";
import { config } from "../config/env.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import { wrap } from "../middleware/errors.js";

const router = Router();

const loginSchema = z.object({
  username: z.string().min(1).max(20),
  password: z.string().min(1).max(72),
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === "test",
});

// compared against when the username doesn't exist, so response time doesn't leak it
const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8.5vKgZ0F0i6zZ0xYlq1o6iZq3l2yS";

router.post(
  "/login",
  loginLimiter,
  validate(loginSchema),
  wrap(async (req, res) => {
    const { username, password } = req.body;
    const [rows] = await pool.query(
      "SELECT user_id, username, password, name, isAdmin FROM `user` WHERE username = ?",
      [username]
    );
    const user = rows[0];
    const ok = await bcrypt.compare(password, user ? user.password : DUMMY_HASH);
    if (!user || !ok) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { sub: user.user_id, username: user.username, isAdmin: !!user.isAdmin },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );
    res.json({
      token,
      user: { user_id: user.user_id, username: user.username, name: user.name, isAdmin: !!user.isAdmin },
    });
  })
);

router.get(
  "/me",
  requireAuth,
  wrap(async (req, res) => {
    const [rows] = await pool.query(
      "SELECT user_id, username, name, isAdmin, email, tel FROM `user` WHERE user_id = ?",
      [req.user.id]
    );
    if (!rows[0]) return res.status(401).json({ error: "User no longer exists" });
    res.json(rows[0]);
  })
);

export default router;
