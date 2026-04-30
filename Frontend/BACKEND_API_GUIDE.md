# TeamTrack Backend API Guide for Frontend

This file summarizes the backend endpoints that the React app can call from the frontend.

Base URL:

```text
http://localhost:5000/api
```

Important frontend rule:

- Auth uses an httpOnly cookie named `token`.
- Send requests with `withCredentials: true`.
- Protected endpoints require a logged-in session.
- Admin-only endpoints require the logged-in user to have the `admin` role.
- In the frontend, treat `admin` and `member` as group-scoped roles, not global user roles. Use `/api/groups` to load the user’s groups, then `/api/groups/:groupId` to determine the current user’s role inside a selected workspace.

## Endpoint Count

There are **23 usable API endpoints** exposed by the backend routes that the frontend should care about:

- 4 auth endpoints
- 11 group endpoints
- 4 invitation endpoints
- 4 personal task endpoints

There are also **4 backward-compatible alias routes** in the personal task router, but because the app currently mounts that router at `/api/tasks/personal`, those aliases are not the clean frontend target. Use the canonical paths listed below.

## 1. Auth Endpoints

Base path: `/api/auth`

| Method | Path        | Auth | What to send                       |
| ------ | ----------- | ---- | ---------------------------------- |
| `POST` | `/register` | No   | `{ name, email, password, role? }` |
| `POST` | `/login`    | No   | `{ email, password }`              |
| `POST` | `/logout`   | Yes  | No body                            |
| `GET`  | `/me`       | Yes  | No body                            |

### Auth request bodies

`POST /api/auth/register`

```json
{
  "name": "Rohit",
  "email": "rohit@example.com",
  "password": "secret123",
  "role": "admin"
}
```

- `role` is optional on the backend, but if you send it the backend will store it.
- If omitted, the backend may use its model default.

`POST /api/auth/login`

```json
{
  "email": "rohit@example.com",
  "password": "secret123"
}
```

`POST /api/auth/logout`

- No request body.

`GET /api/auth/me`

- No request body.
- Uses the cookie session to return the current user.

### Auth response shape

Typical success responses look like:

```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "admin"
  }
}
```

## 2. Group Endpoints

Base path: `/api/groups`

These routes require a logged-in user.

| Method   | Path                        | Auth | Role               | What to send            |
| -------- | --------------------------- | ---- | ------------------ | ----------------------- |
| `POST`   | `/`                         | Yes  | Any logged-in user | `{ name }`              |
| `GET`    | `/`                         | Yes  | Any logged-in user | No body                 |
| `GET`    | `/:groupId`                 | Yes  | Member or admin    | No body                 |
| `POST`   | `/:groupId/invite`          | Yes  | Admin              | `{ email }`             |
| `DELETE` | `/:groupId/members/:userId` | Yes  | Admin              | No body                 |
| `DELETE` | `/:groupId`                 | Yes  | Admin              | No body                 |
| `POST`   | `/:groupId/tasks`           | Yes  | Admin              | Task body               |
| `GET`    | `/:groupId/tasks`           | Yes  | Member or admin    | Optional `status` query |
| `GET`    | `/:groupId/tasks/:taskId`   | Yes  | Member or admin    | No body                 |
| `PATCH`  | `/:groupId/tasks/:taskId`   | Yes  | Member or admin    | Update body             |
| `DELETE` | `/:groupId/tasks/:taskId`   | Yes  | Admin              | No body                 |

### Group request bodies

`POST /api/groups`

```json
{
  "name": "Design Team"
}
```

`POST /api/groups/:groupId/invite`

```json
{
  "email": "member@example.com"
}
```

`POST /api/groups/:groupId/tasks`

```json
{
  "title": "Review PR",
  "description": "Check the latest merge request",
  "assignedTo": "664f1c2a0b1d2e3f4a5b6c7d",
  "priority": "HIGH",
  "dueDate": "2026-05-10"
}
```

Allowed values for group task creation:

- `priority`: `LOW`, `MEDIUM`, `HIGH`
- `dueDate`: optional
- `assignedTo`: optional MongoDB ObjectId string

`PATCH /api/groups/:groupId/tasks/:taskId`

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "assignedTo": "664f1c2a0b1d2e3f4a5b6c7d",
  "priority": "MEDIUM",
  "dueDate": "2026-05-12",
  "status": "IN_PROGRESS"
}
```

Allowed status values for group task updates:

- `TODO`
- `IN_PROGRESS`
- `DONE`

### Group response shapes

- `POST /api/groups` returns `{ message, data }`
- `GET /api/groups` returns `{ message, groupForUser }`
- `GET /api/groups/:groupId` returns `{ members }`
- `POST /api/groups/:groupId/invite` returns `{ message, invitation }`
- `DELETE /api/groups/:groupId/members/:userId` returns `{ message, data }`
- `POST /api/groups/:groupId/tasks` returns `{ message, task }`
- `GET /api/groups/:groupId/tasks` returns `{ tasks }`
- `GET /api/groups/:groupId/tasks/:taskId` returns `{ task }`
- `PATCH /api/groups/:groupId/tasks/:taskId` returns `{ message, task }`
- `DELETE /api/groups/:groupId/tasks/:taskId` returns `{ message }`

### Frontend notes for group routes

- `GET /api/groups` is the main "my groups" endpoint for the frontend.
- Members only see tasks assigned to them on some endpoints.
- Admin-only actions are group creation, inviting, deleting groups, removing members, creating group tasks, and deleting group tasks.

## 3. Invitation Endpoints

Base path: `/api/invitations`

| Method   | Path                | Auth | What to send |
| -------- | ------------------- | ---- | ------------ |
| `GET`    | `/`                 | Yes  | No body      |
| `POST`   | `/:inviteId/accept` | Yes  | No body      |
| `POST`   | `/:inviteId/reject` | Yes  | No body      |
| `DELETE` | `/:inviteId`        | Yes  | No body      |

### Invitation request notes

- `GET /api/invitations` returns invitations for the current user email.
- `accept`, `reject`, and `delete` use the invitation ID in the URL path.
- No request body is required.

### Invitation response shapes

- `GET /api/invitations` returns `{ invitations }`
- `POST /:inviteId/accept` returns `{ message, data }`
- `POST /:inviteId/reject` returns `{ message, data }`
- `DELETE /:inviteId` returns `{ message, data }`

## 4. Personal Task Endpoints

The router is mounted at:

```text
/api/tasks/personal
```

Canonical endpoints to use from the frontend:

| Method   | Path       | Auth | What to send            |
| -------- | ---------- | ---- | ----------------------- |
| `POST`   | `/`        | Yes  | Personal task body      |
| `GET`    | `/`        | Yes  | Optional `status` query |
| `PATCH`  | `/:taskId` | Yes  | Update body             |
| `DELETE` | `/:taskId` | Yes  | No body                 |

### Personal task request bodies

`POST /api/tasks/personal/`

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, fruit",
  "priority": "MEDIUM",
  "dueDate": "2026-05-08",
  "status": "TODO"
}
```

Allowed values:

- `priority`: `LOW`, `MEDIUM`, `HIGH`
- `status`: `TODO`, `IN_PROGRESS`, `DONE`

`PATCH /api/tasks/personal/:taskId`

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "HIGH",
  "dueDate": "2026-05-10",
  "status": "DONE"
}
```

### Personal task response shapes

- `POST /api/tasks/personal/` returns `{ message, task }`
- `GET /api/tasks/personal/` returns `{ tasks }`
- `PATCH /api/tasks/personal/:taskId` returns `{ message, task }`
- `DELETE /api/tasks/personal/:taskId` returns `{ message }`

## 5. Frontend Usage Checklist

For React, the safest pattern is:

1. Create one axios client with `baseURL: http://localhost:5000/api`.
2. Set `withCredentials: true` so cookies are sent.
3. Call `GET /api/auth/me` on app start to hydrate global auth state.
4. Store the current user in context.
5. Use protected routes for dashboard, workspace, account, and admin pages.
6. Use admin role checks before rendering admin screens.
7. Pass route params and request bodies exactly as shown above.

## 6. Current Frontend Mapping

The frontend is now organized around groups and workspaces:

- `/workspace` shows all groups, creates groups, invites members, and lists pending and accepted invites.
- Clicking a group opens `/workspace/:groupId`, which is the dashboard for that one group.
- Group permissions are not global. A user can be an admin in one group and a member in another.
- The dashboard for a single group reads that group's members and tasks from the backend, then derives the current user's role inside that group.

## 7. Quick Summary

Use these most often from the frontend:

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/groups`
- `POST /api/groups`
- `GET /api/groups/:groupId/tasks`
- `POST /api/tasks/personal/`
- `GET /api/tasks/personal/`
- `GET /api/invitations`
