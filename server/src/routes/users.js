import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { validate } from "../middleware/validate.js";
import { requireAdmin } from "../middleware/auth.js";
import { wrap } from "../middleware/errors.js";

const router = Router();

const base = {
  username: z.string().trim().min(3).max(20),
  password: z.string().min(8).max(72),
  name: z.string().trim().min(1).max(30),
  // the edit form sends "0"/"1"; z.coerce.boolean would treat "0" as true
  isAdmin: z.preprocess((v) => (v === "0" || v === 0 ? false : v === "1" || v === 1 ? true : v), z.boolean()).default(false),
  email: z.string().trim().email().max(30),
  tel: z.string().trim().regex(/^\d{9,10}$/, "tel must be 9-10 digits"),
};

const createSchema = z.object(base);
const updateSchema = z.object(base).partial();

// user management is admin-only
router.use(requireAdmin);

router.post(
  "/",
  validate(createSchema),
  wrap(async (req, res) => {
    const { username, password, name, isAdmin, email, tel } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO `user` (username, password, name, isAdmin, email, tel) VALUES (?, ?, ?, ?, ?, ?)",
      [username, hash, name, isAdmin ? 1 : 0, email, tel]
    );
    res.status(201).json({ user_id: result.insertId });
  })
);

router.put(
  "/:id",
  validate(updateSchema),
  wrap(async (req, res) => {
    const body = { ...req.body };
    if (body.password) body.password = await bcrypt.hash(body.password, 10);
    if (body.isAdmin !== undefined) body.isAdmin = body.isAdmin ? 1 : 0;

    const keys = Object.keys(body);
    if (keys.length === 0) return res.status(400).json({ error: "Nothing to update" });

    // keys are limited to the zod schema above, values stay parameterized
    const sets = keys.map((k) => `\`${k}\` = ?`).join(", ");
    const [result] = await pool.query(`UPDATE \`user\` SET ${sets} WHERE user_id = ?`, [
      ...keys.map((k) => body[k]),
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
    res.json({ updated: true });
  })
);

router.delete(
  "/:id",
  wrap(async (req, res) => {
    if (String(req.user.id) === req.params.id) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }
    const [result] = await pool.query("DELETE FROM `user` WHERE user_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
    res.json({ deleted: true });
  })
);

export default router;
