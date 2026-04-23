# TeamTrack Codebase Index (Current)

This document is a live context map of the current repository for fast onboarding, debugging, and implementation planning.

## 1) Product Context

- PRD source: `PRD.md`
- Product direction: role-based team task management with auth, group membership, and protected admin/member actions.

## 2) Workspace Structure

- `Backend/`: Node.js + Express + Mongoose API
- `Frontend/`: Vite + React app with auth, role-gated routes, and themed UI
- `PRD.md`: product requirements

## 3) Backend Folder Tree (excluding node_modules)

```text
Backend/
├── .gitignore
├── package-lock.json
├── package.json
└── src/
    ├── .env
    ├── app.js
    ├── index.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── auth.controller.js
    │   └── group.controller.js
    ├── middleware/
    │   ├── admin.middleware.js
    │   ├── auth.middleware.js
    │   └── member.middleware.js
    ├── models/
    │   ├── Group.model.js
    │   ├── Invitation.model.js
    │   ├── Membership.model.js
    │   ├── Notification.model.js
    │   ├── Task.model.js
    │   └── User.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   └── group.routes.js
    ├── seed/
    │   ├── seedGroups.js
    │   ├── seedMembership.js
    │   └── seedUsers.js
    └── services/
        ├── auth.service.js
        └── group.service.js
```

## 4) Backend Runtime Entry Points

- Server bootstrap: `Backend/src/index.js`
  - Loads env using dotenv (with fallback to `src/.env`)
  - Starts server with `app.listen(process.env.PORT || 5000)`
- App composition: `Backend/src/app.js`
  - Connects DB
  - Registers parsers and cookie middleware
  - Mounts routers on `/api/auth` and `/api/groups`
- DB connector: `Backend/src/config/db.js`

## 5) Backend API Surface (Current)

### Auth Router (`/api/auth`)

File: `Backend/src/routes/auth.routes.js`

- `POST /register` -> `userSignUp`
- `POST /login` -> `userLogin`
- Protected by `restrictedUserOnly` after public routes
- `POST /logout` -> `userLogout`
- `GET /me` -> `getMe`

### Group Router (`/api/groups`)

File: `Backend/src/routes/group.routes.js`

- Global guard: `restrictedUserOnly`
- `POST /` -> `createGroupController`
- `GET /` -> `getGroupsForUserContoller`
- `GET /:groupId` -> `isMember` -> `getAllMembersController`
- `DELETE /:groupId` -> `isAdmin` -> `deleteGroupByIdController`

## 6) Backend Layering (Current)

- Routes -> Controllers -> Services pattern is active for auth and group modules.
- Controllers perform request/response shaping.
- Services hold business logic and model operations.

## 7) Backend Controllers

### `Backend/src/controllers/auth.controller.js`

- Delegates signup/login/logout/me to auth service
- Sets/clears auth cookie around service responses

### `Backend/src/controllers/group.controller.js`

- `createGroupController`
- `getGroupsForUserContoller`
- `getAllMembersController`
- `deleteGroupByIdController`

## 8) Backend Services

### `Backend/src/services/auth.service.js`

- Signup (hash + create)
- Login (verify + JWT issue)
- Logout payload
- Authenticated-user payload helper

### `Backend/src/services/group.service.js`

- `createGroupService`: creates group and creates ADMIN membership
- `getGroupsForUSerService`: finds group memberships for a user
- `getAllMembersService`: returns ACTIVE memberships with user info
- `deleteGroupService`: deletes group and linked memberships

## 9) Backend Middleware

### `Backend/src/middleware/auth.middleware.js`

- Reads `req.cookies.token`
- Verifies JWT
- Loads user and attaches `req.user`

### `Backend/src/middleware/member.middleware.js`

- Checks membership by `user + group + status: ACTIVE`
- Allows only group members

### `Backend/src/middleware/admin.middleware.js`

- Checks membership by `user + group + status: ACTIVE`
- Allows only `role: ADMIN`

## 10) Backend Data Models

### `Backend/src/models/User.model.js`

- Fields: `name`, `email`, `password`

### `Backend/src/models/Group.model.js`

- Fields: `name`, `createdBy`
- Unique constraints around group naming are present

### `Backend/src/models/Membership.model.js`

- Fields: `user`, `group`, `role`, `status`
- `role`: `ADMIN | MEMBER`
- `status`: `PENDING | ACTIVE`
- Unique compound index: `{ user: 1, group: 1 }`

### `Backend/src/models/Task.model.js`

- Fields: `title`, `description`, `status`, `createdBy`, `assignedTo`, `group`, `isPrivate`
- Status enum: `TODO | IN_PROGRESS | DONE`

### `Backend/src/models/Invitation.model.js`

- Fields: `email`, `group`, `invitedBy`, `status`
- Status enum: `PENDING | ACCEPTED | REJECTED`

### `Backend/src/models/Notification.model.js`

- Fields: `user`, `message`, `type`, `isRead`

## 11) Seed Scripts

- `Backend/src/seed/seedUsers.js`: creates 100 members and 10 admin-style users (`a1..a10@g.c`)
- `Backend/src/seed/seedGroups.js`: creates groups (`g1..g10`) by seeded admin
- `Backend/src/seed/seedMembership.js`: creates ADMIN + MEMBER ACTIVE memberships

## 12) Backend Environment Variables In Use

- `MONGO_URI`
- `PORT`
- `JWT_SECRET`

## 13) Frontend Folder Tree (excluding node_modules, dist)

```text
Frontend/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
├── public/
│   ├── logo.svg
│   ├── logoDark.svg
│   └── user.svg
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── api/
    │   ├── admin.js
    │   ├── auth.js
    │   ├── groups.js
    │   └── http.js
    ├── components/
    │   ├── Common/
    │   │   └── PageHeader.jsx
    │   └── layout/
    │       ├── Footer.jsx
    │       └── Navbar.jsx
    ├── context/
    │   ├── auth-context.js
    │   ├── AuthContext.jsx
    │   ├── theme-context.js
    │   ├── ThemeContext.jsx
    │   ├── useAuth.js
    │   └── useTheme.js
    ├── pages/
    │   ├── Admin/
    │   │   ├── AdminTasksPage.jsx
    │   │   └── AdminUsersPage.jsx
    │   ├── Both/
    │   │   ├── AccountPage.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── WorkSpace.jsx
    │   └── Public/
    │       ├── AboutPage.jsx
    │       ├── HomePage.jsx
    │       ├── LandingPage.jsx
    │       ├── LoginPage.jsx
    │       └── RegisterPage.jsx
    ├── routes/
    │   ├── AdminRoute.jsx
    │   ├── AppRouter.jsx
    │   └── PrivateRoute.jsx
    └── style/
        ├── App.css
        └── index.css
```

## 14) Frontend Runtime and Routing Snapshot

- Entry: `Frontend/src/main.jsx` with `BrowserRouter`
- Providers in `Frontend/src/App.jsx`: `ThemeProvider` and `AuthProvider`
- Main route map in `Frontend/src/routes/AppRouter.jsx`
  - Public: `/`, `/home`, `/about`, `/login`, `/register`
  - Protected: `/dashboard`, `/workspace`, `/account`
  - Admin: `/admin/users`, `/admin/tasks`
- API fetch helper in `Frontend/src/api/http.js`
  - Uses `credentials: include`
- Dev proxy in `Frontend/vite.config.js`
  - `/api` -> `http://localhost:5000`

## 15) Current Implementation Snapshot

- Auth flow exists end-to-end (register/login/logout/me)
- Group flow includes create/list/members/delete with member/admin middleware gates
- Invitation/Notification models exist but are not yet wired to routes/services
- Admin router from earlier snapshots is no longer mounted in current `app.js`

## 16) High-Value Follow-Ups

1. Add API contract section (request/response examples per endpoint)
2. Add middleware decision matrix (who can call what)
3. Wire invitation + notification modules into routes/services
4. Add test coverage map (unit + integration)
