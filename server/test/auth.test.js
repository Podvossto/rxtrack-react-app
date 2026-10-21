import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../src/config/env.js";

vi.mock("../src/db/pool.js", () => ({ pool: { query: vi.fn() } }));

const { pool } = await import("../src/db/pool.js");
const { createApp } = await import("../src/app.js");
const { tokenFor } = await import("./helpers.js");

const app = createApp();
const hash = bcrypt.hashSync("admin1234", 4);
const newUser = { username: "bob", password: "password123", name: "Bob", email: "b@example.com", tel: "0812345678" };

beforeEach(() => pool.query.mockReset());

describe("POST /api/auth/login", () => {
  it("returns a token for valid credentials", async () => {
    pool.query.mockResolvedValueOnce([
      [{ user_id: 1, username: "admin", password: hash, name: "Demo Admin", isAdmin: 1 }],
    ]);
    const res = await request(app).post("/api/auth/login").send({ username: "admin", password: "admin1234" });
    expect(res.status).toBe(200);
    expect(res.body.user).toEqual({ user_id: 1, username: "admin", name: "Demo Admin", isAdmin: true });
    const payload = jwt.verify(res.body.token, config.jwtSecret);
    expect(payload.sub).toBe(1);
    expect(payload.exp).toBeGreaterThan(payload.iat);
  });

  it("rejects a wrong password", async () => {
    pool.query.mockResolvedValueOnce([[{ user_id: 1, username: "admin", password: hash, name: "x", isAdmin: 1 }]]);
    const res = await request(app).post("/api/auth/login").send({ username: "admin", password: "nope" });
    expect(res.status).toBe(401);
    expect(res.body.token).toBeUndefined();
  });

  it("rejects an unknown user with the same 401", async () => {
    pool.query.mockResolvedValueOnce([[]]);
    const res = await request(app).post("/api/auth/login").send({ username: "ghost", password: "whatever1" });
    expect(res.status).toBe(401);
  });

  it("returns 400 when fields are missing", async () => {
    const res = await request(app).post("/api/auth/login").send({ username: "admin" });
    expect(res.status).toBe(400);
    expect(pool.query).not.toHaveBeenCalled();
  });
});

describe("protected routes", () => {
  it("401 without a token", async () => {
    const res = await request(app).get("/api/medicine");
    expect(res.status).toBe(401);
    expect(pool.query).not.toHaveBeenCalled();
  });

  it("401 with a garbage token", async () => {
    const res = await request(app).get("/api/medicine").set("Authorization", "Bearer abc.def.ghi");
    expect(res.status).toBe(401);
  });

  it("401 with a token signed by another secret", async () => {
    const bad = jwt.sign({ sub: 1 }, "other-secret");
    const res = await request(app).get("/api/medicine").set("Authorization", `Bearer ${bad}`);
    expect(res.status).toBe(401);
  });

  it("200 with a valid token", async () => {
    pool.query.mockResolvedValueOnce([[{ med_id: 1 }]]).mockResolvedValueOnce([[{ total: 1 }]]);
    const res = await request(app).get("/api/medicine").set("Authorization", `Bearer ${tokenFor()}`);
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(1);
  });

  it("403 when a non-admin manages users", async () => {
    const res = await request(app)
      .post("/api/user")
      .set("Authorization", `Bearer ${tokenFor({ isAdmin: false })}`)
      .send(newUser);
    expect(res.status).toBe(403);
  });
});

describe("user endpoints", () => {
  const auth = () => ({ Authorization: `Bearer ${tokenFor()}` });

  it("stores a bcrypt hash, not the plain password", async () => {
    pool.query.mockResolvedValueOnce([{ insertId: 7 }]);
    const res = await request(app).post("/api/user").set(auth()).send(newUser);
    expect(res.status).toBe(201);
    const stored = pool.query.mock.calls[0][1][1];
    expect(stored).not.toBe("password123");
    expect(bcrypt.compareSync("password123", stored)).toBe(true);
  });

  it("rejects invalid input with 400", async () => {
    const res = await request(app).post("/api/user").set(auth()).send({ username: "b", password: "short" });
    expect(res.status).toBe(400);
  });

  it("never selects the password column in list queries", async () => {
    pool.query.mockResolvedValueOnce([[]]).mockResolvedValueOnce([[{ total: 0 }]]);
    await request(app).get("/api/user").set(auth());
    expect(pool.query.mock.calls[0][0]).not.toMatch(/password/i);
  });
});

describe("error handling", () => {
  it("returns 500 instead of hanging when the db fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    pool.query.mockRejectedValueOnce(new Error("db down"));
    const res = await request(app).get("/api/medtype").set("Authorization", `Bearer ${tokenFor()}`);
    expect(res.status).toBe(500);
  });
});

describe("user update", () => {
  it("treats isAdmin '0' from the edit form as false", async () => {
    pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
    const res = await request(app)
      .put("/api/user/2")
      .set("Authorization", `Bearer ${tokenFor()}`)
      .send({ user_id: "2", isAdmin: "0", name: "Bob" });
    expect(res.status).toBe(200);
    const [sql, params] = pool.query.mock.calls[0];
    expect(sql).not.toContain("user_id = ?, ");
    expect(params).toEqual(["Bob", 0, "2"]);
  });
});
