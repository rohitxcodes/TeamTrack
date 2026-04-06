# TeamTrack Codebase Index

This is an updated context map of the current repository for fast navigation, implementation planning, and debugging.

## 1) Product Context

- PRD source: `PRD.md`
- Product intent: role-based task management with authentication, authorization, admin controls, and ownership boundaries.

## 2) Current Workspace Structure

- `Backend/`: Node.js + Express + Mongoose API
- `Frontend/`: Vite + React application scaffold with starter UI
- `PRD.md`: product requirements

## 3) Backend Runtime Entry Points

- Server bootstrap: `Backend/src/index.js`
  - Loads env with dotenv
  - Starts server with `app.listen`
- App composition: `Backend/src/app.js`
  - Calls DB connection
  - Registers parsers and cookie middleware
  - Mounts routers on `/api/auth`, `/api/admin`, `/api/groups`
- DB connector: `Backend/src/config/db.js`

## 4) Backend API Surface (Routes)

### Auth Router (`/api/auth`)

- File: `Backend/src/routes/auth.routes.js`
- `POST /register` -> `userSignUp`
- `POST /login` -> `userLogin`
- Guard applied after login/register: `restrictedUserOnly`
- `POST /logout` -> `userLogout`
- `GET /me` -> placeholder text response

### Admin Router (`/api/admin`)

- File: `Backend/src/routes/admin.routes.js`
- Guards: `restrictedUserOnly`, then `adminOnly`
- `POST /tasks` -> `adminCreateTask`
- `GET /tasks` -> placeholder
- `PATCH /tasks/:id` -> placeholder
- `DELETE /tasks/:id` -> placeholder
- `GET /users` -> placeholder
- `DELETE /users/:id` -> placeholder

### Group Router (`/api/groups`)

- File: `Backend/src/routes/group.routes.js`
- Global guard: `restrictedUserOnly`
- Group guard: `groupedUserOnly` on `/:groupId`
- Admin-only operations guarded by `adminOnly` on `/:groupId`
- Group endpoints currently placeholder responses:
  - `POST /`
  - `GET /my`
  - `GET /:groupId`
  - `POST /:groupId/invite`
  - `GET /:groupId/members`
  - `PATCH /:groupId/members/:userId/role`
  - `DELETE /:groupId/members/:userId`
  - `POST /:groupId/tasks`
  - `GET /:groupId/tasks`
  - `GET /:groupId/tasks/my`
  - `PATCH /:groupId/tasks/:taskId/status`

## 5) Backend Controllers

- `Backend/src/controllers/auth.controller.js`
  - Implemented: `userSignUp`, `userLogin`, `userLogout`
  - Uses `bcrypt` and `jsonwebtoken`
- `Backend/src/controllers/admin.controller.js`
  - Implemented: `adminCreateTask`
  - Stubbed: `taskToEmployee`, `assignmentValidation`
- `Backend/src/controllers/task.controller.js`
  - Empty file

## 6) Backend Middleware

- `Backend/src/middleware/auth.middleware.js`
  - Cookie token read (`req.cookies.token`)
  - JWT verify
  - User lookup and attach to `req.user`
- `Backend/src/middleware/admin.middleware.js`
  - Allows only `req.user.role === "admin"`
- `Backend/src/middleware/groupedUserOnly.middleware.js`
  - Stubbed pass-through (`next()`)

## 7) Backend Data Models

- `Backend/src/models/User.model.js`
  - Fields: `name`, `email`, `password`, `role`
  - Role enum: `admin | employee`
- `Backend/src/models/Task.model.js`
  - Fields: `title`, `description`, `status`, `createdBy`, `assignedTo`
  - Status enum: `pending | in-progress | completed`
- `Backend/src/models/Group.model.js`
  - Fields: `name`, `createdBy`
- `Backend/src/models/Membership.model.js`
  - Fields: `user`, `group`, `role`
  - Unique compound index: `{ user: 1, group: 1 }`

## 8) Backend Environment Variables In Use

- `MONGO_URI`
- `PORT`
- `JWT_SECRET`

## 9) Frontend Index

- Frontend package: `Frontend/package.json`
  - Stack: Vite + React 19
  - Scripts: `dev`, `build`, `lint`, `preview`
- Entry point: `Frontend/src/main.jsx`
- Root component: `Frontend/src/App.jsx`
  - Starter Vite demo UI with local counter state
- Styles:
  - `Frontend/src/index.css`
  - `Frontend/src/App.css`
- Assets:
  - `Frontend/src/assets/hero.png`
  - `Frontend/src/assets/react.svg`
  - `Frontend/src/assets/vite.svg`

## 10) PRD vs Implementation Snapshot

- Auth register/login: implemented at basic level
- Auth `/me`: placeholder
- User task CRUD at `/api/tasks` from PRD: not present yet
- Admin task and user management: mostly placeholder except admin task create
- Group domain exists as route skeleton; business logic still pending
- Frontend exists now, but still starter template (not product UI/flows)

## 11) Key Gaps and Inconsistencies

- Backend startup path mismatch has been fixed to `nodemon src/index.js`.
- Backend env loading now supports root `.env` with fallback to `Backend/src/.env`.
- PRD role naming (`user/admin`) differs from model role naming (`employee/admin`)
- Several handlers return plain strings rather than structured JSON + status codes

## 12) Fast Onboarding Read Order

1. `PRD.md`
2. `Backend/src/app.js`
3. `Backend/src/routes/auth.routes.js`
4. `Backend/src/routes/admin.routes.js`
5. `Backend/src/routes/group.routes.js`
6. `Backend/src/controllers/auth.controller.js`
7. `Backend/src/controllers/admin.controller.js`
8. `Backend/src/models/User.model.js`
9. `Backend/src/models/Task.model.js`
10. `Frontend/src/main.jsx`
11. `Frontend/src/App.jsx`

## 13) Suggested Next Reindex Targets

- Add an endpoint-by-endpoint implementation matrix (implemented, placeholder, missing)
- Add request/response contracts per endpoint
- Add auth and role decision table per route
- Add startup/runbook section for backend and frontend commands
