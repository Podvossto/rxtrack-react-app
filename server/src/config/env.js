import "dotenv/config";

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var ${name}`);
  return value;
};

const isTest = process.env.NODE_ENV === "test";

export const config = {
  port: Number(process.env.PORT) || 5000,
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((s) => s.trim()),
  jwtSecret: isTest ? process.env.JWT_SECRET || "test-secret" : required("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "rxtrack",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "rxtrack",
  },
};
