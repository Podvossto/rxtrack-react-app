import { Router } from "express";
import { resources } from "../db/resources.js";
import { fetchList } from "../db/paginate.js";
import { wrap } from "../middleware/errors.js";
import users from "./users.js";
import medicines from "./medicines.js";
import lookups from "./lookups.js";

const router = Router();

// read-only list endpoints share one handler
for (const name of Object.keys(resources)) {
  router.get(
    `/${name}`,
    wrap(async (req, res) => {
      res.json(await fetchList(resources[name], req.query));
    })
  );
}

router.use("/user", users);
router.use("/medicine", medicines);
router.use(lookups);

export default router;
