# RxTrack

ระบบบริหารจัดการคลังยา — a medical inventory management web app.

> Originally built in my first year (2024) as a course project. I revisited it in 2026 to fix security issues and restructure the repo. It is still an early project: the feature set is small and some screens are unfinished (see Known limitations).

## Screenshots

Screenshots go in `docs/screenshots/` (not added yet).

## Features

- Login with JWT; all API routes and admin pages require a session, with logout
- Current stock list with search, sorting and pagination
- Stock in / stock out history
- Medicine types, units and storage locations (catalog)
- User management (admin only) and patient list
- Dashboard with charts (MUI X Charts)
- Report page (placeholder only)

## Tech stack

- Client: React 18, Vite, React Router, Bootstrap / React-Bootstrap, MUI (charts), react-data-table-component, axios
- Server: Node.js, Express, MySQL (mysql2), bcryptjs, jsonwebtoken, zod, helmet
- Tests: vitest + supertest (database mocked)
- CI: GitHub Actions (lint, build, test)

## Run with Docker

```
docker compose up --build
```

Then open http://localhost:8080. The database is created from `server/db/schema.sql` and `server/db/seed.sql` on first start. The compose file uses throwaway local credentials and a default JWT secret; set `JWT_SECRET` in your environment for anything other than a local demo.

## Run manually

Requirements: Node 20+ and MySQL 8.

```
# database
mysql -u root -p < server/db/schema.sql
mysql -u root -p < server/db/seed.sql
# create a MySQL user that matches server/.env

# server
cd server
cp .env.example .env     # set DB_* and JWT_SECRET
npm install
npm run dev              # http://localhost:5000

# client (new terminal)
cd client
cp .env.example .env     # VITE_API_URL
npm install
npm run dev              # http://localhost:5173
```

Other scripts: `npm test` and `npm run lint` in `server/`, `npm run lint` and `npm run build` in `client/`.

## Demo login

| username | password   |
| -------- | ---------- |
| admin    | admin1234  |

The seed data is fake. Change the password before using this anywhere real.

## Project structure

```
client/             Vite + React app
  src/auth/         auth context and route guard
  src/lib/api.js    axios instance (base URL, token header)
  src/routes/       pages (login, admin layout, nav pages)
  src/components/   table, charts, navbar/header
server/
  db/               schema.sql, seed.sql
  src/config/       env loading
  src/db/           pool, list queries, sort/search whitelist
  src/middleware/   auth, validation, error handling
  src/routes/       auth, users, medicines, lookups
  test/             vitest + supertest
docs/screenshots/
docker-compose.yml
```

## Security notes

What was fixed in the 2026 pass:

- Login actually checks credentials; passwords are stored as bcrypt hashes (previously plaintext, and shown in the user table)
- Sort columns come from a per-resource whitelist instead of being put into SQL; all values are parameterized
- Input validation on create/update, proper error status codes instead of hung requests
- helmet, CORS limited to origins set in `CORS_ORIGIN`, rate limit on login
- DB credentials and JWT secret come from environment variables
- Real personal data removed from the seed file

## Known limitations

- The JWT is kept in `localStorage`, so an XSS bug would expose it. An httpOnly cookie would be better.
- Only the medicine, medicine type/unit/location and user endpoints accept writes. The stock in / stock out forms (`addStock`, `addOutput`) are UI only and do not save anything yet; the "details" popup on stock in/out history shows hardcoded sample rows.
- Reports, settings and profile pages are placeholders.
- Edit/delete in the table only updates the screen state without refetching, and error feedback is minimal.
- No integration tests against a real database; the test suite mocks the DB layer.
- UI text is Thai only.

## License

MIT
