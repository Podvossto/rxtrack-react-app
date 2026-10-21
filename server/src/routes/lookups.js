import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { validate } from "../middleware/validate.js";
import { wrap } from "../middleware/errors.js";

const router = Router();

const medtypeSchema = z.object({
  medType: z.string().trim().min(1).max(20),
  medTypeDetail: z.string().trim().max(50).optional().default(""),
});
const medunitSchema = z.object({ medUnit: z.string().trim().min(1).max(20) });
const medlocationSchema = z.object({
  location_name: z.string().trim().min(1).max(10),
  rack: z.string().trim().min(1).max(10),
  room: z.string().trim().min(1).max(10),
  quantity: z.coerce.number().int().min(0).default(0),
});

router.post(
  "/medtype",
  validate(medtypeSchema),
  wrap(async (req, res) => {
    const { medType, medTypeDetail } = req.body;
    const [r] = await pool.query("INSERT INTO medtype (medType, medTypeDetail) VALUES (?, ?)", [
      medType,
      medTypeDetail,
    ]);
    res.status(201).json({ type_id: r.insertId });
  })
);

router.post(
  "/medunit",
  validate(medunitSchema),
  wrap(async (req, res) => {
    const [r] = await pool.query("INSERT INTO medunit (medUnit) VALUES (?)", [req.body.medUnit]);
    res.status(201).json({ unit_id: r.insertId });
  })
);

router.post(
  "/medlocation",
  validate(medlocationSchema),
  wrap(async (req, res) => {
    const { location_name, rack, room, quantity } = req.body;
    const [r] = await pool.query(
      "INSERT INTO medlocation (location_name, rack, room, quantity) VALUES (?, ?, ?, ?)",
      [location_name, rack, room, quantity]
    );
    res.status(201).json({ location_id: r.insertId });
  })
);

export default router;
