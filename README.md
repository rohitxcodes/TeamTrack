<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&pause=1000&color=6C63FF&center=true&vCenter=true&width=500&lines=TeamTrack+%F0%9F%97%82%EF%B8%8F;Role-Based+Task+Manager;Node+%C2%B7+Express+%C2%B7+MongoDB+%C2%B7+React" alt="TeamTrack" />

<br/>

<img src="https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge&logo=statuspage&logoColor=white"/>
<img src="https://img.shields.io/github/stars/rohitxcodes/TeamTrack?style=for-the-badge&logo=github&color=6C63FF"/>
<img src="https://img.shields.io/github/last-commit/rohitxcodes/TeamTrack?style=for-the-badge&logo=git&color=orange"/>

<br/><br/>

> **Multi-user task management with role-based access control.**
> A backend-focused MERN project built around **authentication, authorization, and ownership control**.

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express%20v5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

**[Live demo](https://team-track-beta.vercel.app)**

</div>

---

## Overview

TeamTrack is a task management app with two roles, `admin` and `employee`. I built it to practice the access-control fundamentals behind multi-user systems: who you are (authentication), what you may do (authorization), and which data is yours (ownership).

**Access rules**

```
✓  Employees create and access only their own personal tasks
✓  Admins have separate, protected routes to view and delete users and tasks
✓  JWT is stored in an httpOnly cookie, so JavaScript cannot read it
✓  Role and ownership checks are enforced on the server, never trusted from the client
```

> **Status:** authentication, role middleware, the admin routes, and the group/membership model are working. Task routes, the admin dashboard, and the items under [Roadmap](#roadmap) are still in progress.

---

## Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication
- Register and login with email and password
- JWT issued as an `httpOnly` cookie
- `bcrypt` password hashing
- `/me` route for session validation

</td>
<td width="50%">

### 🛡️ Role-Based Access
- Two roles: `admin` and `employee`
- Admin-only routes blocked at middleware
- Roles enforced server-side, not client-side
- Admins can view all users and tasks, and delete either

</td>
</tr>
<tr>
<td width="50%">

### 📋 Task Management
- Status flow: `pending` → `in-progress` → `completed`
- Employees create their own personal tasks
- Employees read, update, and delete only their own tasks
- Ownership validated on every task request

</td>
<td width="50%">

### 👥 Groups & Memberships
- Group model with a separate `Membership` collection (users to groups, many-to-many)
- Create groups and list your own groups
- Admin can add and remove members
- Workspace-scoped task access is planned (see Roadmap)

</td>
</tr>
</table>

---

## Access Control Model

| Action | Employee | Admin |
|--------|----------|-------|
| Create a personal task | ✓ | |
| Read / update / delete own task | ✓ | |
| Read another user's task | ✗ | via `/api/admin/tasks` |
| Delete any task | ✗ | ✓ |
| List all users | ✗ | ✓ |
| Delete a user | ✗ | ✓ |

Guards live in `Backend/src/middleware/`: an auth guard (valid session), an admin guard (role check), and a group guard (group membership).

---

## Security Notes

- **Passwords:** hashed with `bcrypt`; plaintext passwords are never stored.
- **Token storage:** the JWT is in an `httpOnly` cookie, so a cross-site scripting (XSS) bug cannot read and steal the token. This does not make XSS harmless: injected script could still send requests as the logged-in user while the page is open, so XSS has to be prevented separately.
- **Cookie-based sessions and CSRF:** cookie auth needs CSRF consideration. A `SameSite` policy review and further hardening are on the roadmap.
- **Authorization:** role and ownership checks run on the server for every protected route.

---

## Tech Stack

```
Backend                          Frontend
─────────────────────────        ─────────────────────────
Node.js + Express v5             React 19
MongoDB + Mongoose 9             Vite 8
JWT (jsonwebtoken 9)             TailwindCSS 4
bcrypt 6                         React Router 7
cookie-parser                    Context API (Auth)
dotenv                           Axios (http.js)
```

---

## Project Structure

```
TeamTrack/
│
├── Backend/src/
│   ├── config/         # DB connection
│   ├── controllers/    # auth · admin · task
│   ├── middleware/     # auth guard · admin guard · group guard
│   ├── models/         # User · Task · Group · Membership
│   ├── routes/         # /api/auth · /api/admin · /api/groups · /api/tasks
│   ├── app.js          # Express setup
│   └── index.js        # Server entry
│
└── Frontend/src/
    ├── api/            # http.js · auth.js · admin.js · groups.js
    ├── context/        # AuthContext · useAuth hook
    ├── pages/
    │   ├── Public/     # Landing · Login · Register · About
    │   └── Both/       # Dashboard · Workspace · Account
    └── routes/         # AppRouter · PrivateRoute
```

---

## Getting Started

**Prerequisites:** Node.js 20+ and a MongoDB Atlas (or local MongoDB) connection string.

### 1. Clone

```bash
git clone https://github.com/rohitxcodes/TeamTrack.git
cd TeamTrack
```

### 2. Backend

```bash
cd Backend && npm install
```

Create `Backend/.env`:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_32_chars_minimum
PORT=3000
```

```bash
npm run dev
```

### 3. Frontend

```bash
cd Frontend && npm install
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:3000`.

---

## API Routes

### `/api/auth`: Public

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/register` | Create account |
| `POST` | `/login` | Validate credentials, set JWT cookie |
| `GET` | `/me` | Current user session |

### `/api/tasks`: Authenticated (personal tasks)

> Route wiring for tasks is still in progress (see Roadmap).

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/` | Create a personal task |
| `GET` | `/` | List your own tasks |
| `GET` | `/:id` | Get a task (owner only) |
| `PUT` | `/:id` | Update a task (owner only) |
| `DELETE` | `/:id` | Delete a task (owner only) |

### `/api/admin`: Admin only

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/users` | List all users |
| `DELETE` | `/users/:id` | Delete a user |
| `GET` | `/tasks` | List all tasks |
| `DELETE` | `/tasks/:id` | Delete any task |

### `/api/groups`: Authenticated

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/` | Create group |
| `GET` | `/` | List my groups |
| `POST` | `/:id/members` | Add member (admin) |
| `DELETE` | `/:id/members/:uid` | Remove member (admin) |

---

## Auth Flow

```
POST /api/auth/login
        │
        ▼
  Validate credentials
        │
   ┌────┴────┐
  fail      pass
   │         │
  401     Sign JWT
           │
     Set httpOnly cookie
           │
        200 OK ──▶ protected routes now accessible
```

---

## Roadmap

- [x] JWT auth with httpOnly cookies
- [x] Role middleware (admin / employee)
- [x] Ownership-enforced task access
- [x] Admin route suite
- [x] Group and membership model
- [ ] Task routes fully wired
- [ ] Frontend admin dashboard
- [ ] Logout endpoint (clear the session cookie)
- [ ] Login rate limiting and request validation
- [ ] CSRF hardening (`SameSite` policy review)
- [ ] Automated tests for the authorization rules (admin vs employee vs another user's resource)
- [ ] Scope tasks to group workspaces
- [ ] Pagination and task filters
- [ ] Real-time updates via Socket.io
- [ ] Email notifications

---

<div align="center">

Built by **[Rohit Kumar](https://rohitxcodes.me)** · [GitHub](https://github.com/rohitxcodes) · [Portfolio](https://rohitxcodes.me)

</div>
