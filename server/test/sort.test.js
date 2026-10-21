import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

vi.mock("../src/db/pool.js", () => ({ pool: { query: vi.fn() } }));

const { pool } = await import("../src/db/pool.js");
const { createApp } = await import("../src/app.js");
const { parseListQuery } = await import("../src/db/paginate.js");
const { resources } = await import("../src/db/resources.js");
const { tokenFor } = await import("./helpers.js");

const app = createApp();

beforeEach(() => {
  pool.query.mockReset();
  pool.query.mockResolvedValueOnce([[]]).mockResolvedValueOnce([[{ total: 0 }]]);
});

const list = (qs) =>
  request(app).get(`/api/medicine?${qs}`).set("Authorization", `Bearer ${tokenFor()}`);

describe("sort whitelist", () => {
  it("uses a whitelisted column", async () => {
    await list("sort_column=name&sort_direction=desc");
    expect(pool.query.mock.calls[0][0]).toContain("ORDER BY medicine.name DESC");
  });

  it("ignores an injected sort column and falls back to the primary key", async () => {
    const res = await list("sort_column=" + encodeURIComponent("name; SELECT 1;--"));
    expect(res.status).toBe(200);
    const sql = pool.query.mock.calls[0][0];
    expect(sql).toContain("ORDER BY medicine.med_id ASC");
    expect(sql).not.toContain("SELECT 1");
  });

  it("only accepts asc or desc as direction", async () => {
    await list("sort_column=name&sort_direction=" + encodeURIComponent("desc; SELECT SLEEP(5)"));
    const sql = pool.query.mock.calls[0][0];
    expect(sql).toContain("ORDER BY medicine.name ASC");
    expect(sql).not.toMatch(/SLEEP/i);
  });

  it("does not treat inherited object keys as columns", () => {
    const q = parseListQuery(resources.medicine, { sort_column: "constructor" });
    expect(q.sortExpr).toBe("medicine.med_id");
  });

  it("keeps search as a bound parameter and applies it to the count too", async () => {
    await list("search=" + encodeURIComponent("' OR 1=1 --"));
    const [dataSql, dataParams] = pool.query.mock.calls[0];
    const [countSql, countParams] = pool.query.mock.calls[1];
    expect(dataSql).not.toContain("OR 1=1");
    expect(dataParams[0]).toBe("%' OR 1=1 --%");
    expect(countSql).toContain("WHERE");
    expect(countParams).toEqual(["%' OR 1=1 --%"]);
  });

  it("clamps per_page and page", () => {
    expect(parseListQuery(resources.user, { per_page: "100000" }).perPage).toBe(100);
    expect(parseListQuery(resources.user, { per_page: "-5", page: "0" })).toMatchObject({ perPage: 1, page: 1 });
  });
});
