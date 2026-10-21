import { pool } from "./pool.js";

const MAX_PER_PAGE = 100;

// Parse and clamp the paging/sorting query params. Sorting falls back to the
// primary key unless the column is in the resource's whitelist.
export function parseListQuery(resource, query) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const perPage = Math.min(Math.max(parseInt(query.per_page, 10) || 10, 1), MAX_PER_PAGE);
  const sortExpr = Object.hasOwn(resource.sortable, query.sort_column)
    ? resource.sortable[query.sort_column]
    : resource.sortable[resource.pk];
  const direction = String(query.sort_direction).toLowerCase() === "desc" ? "DESC" : "ASC";
  const search = typeof query.search === "string" && query.search ? query.search : null;
  return { page, perPage, sortExpr, direction, search };
}

export async function fetchList(resource, query) {
  const { page, perPage, sortExpr, direction, search } = parseListQuery(resource, query);

  const params = [];
  let where = "";
  if (search) {
    where = ` WHERE ${resource.search} LIKE ?`;
    params.push(`%${search}%`);
  }

  const dataSql = `SELECT ${resource.select} FROM ${resource.from}${where} ORDER BY ${sortExpr} ${direction} LIMIT ? OFFSET ?`;
  const countSql = `SELECT COUNT(*) AS total FROM ${resource.from}${where}`;

  const [rows] = await pool.query(dataSql, [...params, perPage, (page - 1) * perPage]);
  const [[{ total }]] = await pool.query(countSql, params);

  return {
    page,
    per_page: perPage,
    total,
    total_pages: Math.ceil(total / perPage),
    data: rows,
  };
}
