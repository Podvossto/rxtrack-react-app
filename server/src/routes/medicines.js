import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { validate } from "../middleware/validate.js";
import { wrap } from "../middleware/errors.js";

const router = Router();

const fields = {
  name: z.string().trim().min(1).max(20),
  status: z.string().trim().min(1).max(20),
  description: z.string().trim().max(50),
  medQuantity: z.coerce.number().int().min(0).max(999),
  unit_id: z.coerce.number().int().positive(),
  type_id: z.coerce.number().int().positive(),
  location_id: z.coerce.number().int().positive(),
};

const createSchema = z.object(fields);
const updateSchema = z.object(fields).partial();

router.post(
  "/",
  validate(createSchema),
  wrap(async (req, res) => {
    const { name, status, description, medQuantity, unit_id, type_id, location_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO medicine (name, status, description, medQuantity, unit_id, type_id, location_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, status, description, medQuantity, unit_id, type_id, location_id]
    );
    res.status(201).json({ med_id: result.insertId });
  })
);

router.put(
  "/:id",
  validate(updateSchema),
  wrap(async (req, res) => {
    const keys = Object.keys(req.body);
    if (keys.length === 0) return res.status(400).json({ error: "Nothing to update" });
    const sets = keys.map((k) => `\`${k}\` = ?`).join(", ");
    const [result] = await pool.query(`UPDATE medicine SET ${sets} WHERE med_id = ?`, [
      ...keys.map((k) => req.body[k]),
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Medicine not found" });
    res.json({ updated: true });
  })
);

router.delete(
  "/:id",
  wrap(async (req, res) => {
    const [result] = await pool.query("DELETE FROM medicine WHERE med_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Medicine not found" });
    res.json({ deleted: true });
  })
);

export default router;
