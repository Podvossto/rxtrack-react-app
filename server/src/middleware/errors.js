export function notFound(req, res) {
  res.status(404).json({ error: "Not found" });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON" });
  }
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ error: "Already exists" });
  }
  if (err.code === "ER_NO_REFERENCED_ROW_2" || err.code === "ER_ROW_IS_REFERENCED_2") {
    return res.status(409).json({ error: "Referenced record conflict" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}

// lets async handlers throw into errorHandler
export const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
