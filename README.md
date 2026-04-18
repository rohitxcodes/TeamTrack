<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&pause=1000&color=6C63FF&center=true&vCenter=true&width=500&lines=TeamTrack+%F0%9F%97%82%EF%B8%8F;Role-Based+Task+Manager;Built+for+the+Real+World" alt="TeamTrack" />

<br/>

<img src="https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge&logo=statuspage&logoColor=white"/>
<img src="https://img.shields.io/github/stars/rohitxcodes/TeamTrack?style=for-the-badge&logo=github&color=6C63FF"/>
<img src="https://img.shields.io/github/last-commit/rohitxcodes/TeamTrack?style=for-the-badge&logo=git&color=orange"/>

<br/><br/>

> **Secure multi-user task management with role-based access control.**
> A secure, production-style task management system implementing **authentication, authorization, and ownership control** — the core pillars of real-world backend systems..

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express%20v5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

</div>

---

## The Problem

Most beginner MERN projects look like this:

```
✗  Any user can read/modify other users' data
✗  No difference between admin and regular users
✗  No ownership rules, no access control
✗  Not usable in a real-world context
```

TeamTrack is built the opposite way:

```
✓  Employees access only their own tasks
✓  Admin has full control via protected routes
✓  JWT stored as httpOnly cookie — XSS-safe
✓  Every route middleware-enforced at the server level
```

---

## Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication
- Register & login with email/password
- JWT issued as `httpOnly` cookie
- `bcrypt` password hashing
- `/me` route for session validation

</td>
<td width="50%">

### 🛡️ Role-Based Access
- Two roles: `admin` and `employee`
- Admin-only routes blocked at middleware
- Employees only see tasks assigned to them
- Role enforced server-side, not client-side

</td>
</tr>
<tr>
<td width="50%">

### 📋 Task Management
- `pending` → `in-progress` → `completed`
- Admin creates and assigns tasks
- Employees update their own tasks only
- Full CRUD with ownership validation

</td>
<td width="50%">

### 👥 Groups & Workspaces
- Group-based workspace model
- Membership management by admin
- Add / remove members from groups
- Scoped data access per workspace

</td>
</tr>
</table>

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
│   ├── routes/         # /api/auth · /api/admin · /api/groups
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

---

## API Routes

### `/api/auth` — Public

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/register` | Create account |
| `POST` | `/login` | Get JWT cookie |
| `GET` | `/me` | Current user session |

### `/api/tasks` — Employee Protected

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/` | Create task |
| `GET` | `/` | Get own tasks |
| `GET` | `/:id` | Get task (owner only) |
| `PUT` | `/:id` | Update task (owner only) |
| `DELETE` | `/:id` | Delete task (owner only) |

### `/api/admin` — Admin Only

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/users` | All users |
| `DELETE` | `/users/:id` | Delete user |
| `GET` | `/tasks` | All tasks |
| `DELETE` | `/tasks/:id` | Delete any task |

### `/api/groups` — Protected

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/` | Create group |
| `GET` | `/` | My groups |
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
- [x] Role middleware — admin / employee
- [x] Ownership-enforced task access
- [x] Admin route suite
- [x] Group & membership model
- [ ] Task routes fully wired
- [ ] Frontend admin dashboard
- [ ] Real-time updates via Socket.io
- [ ] Pagination & task filters
- [ ] Email notifications

---

<div align="center">

Built by **[Rohit Kumar](https://rohitxcodes.me)** · [GitHub](https://github.com/rohitxcodes) · [Portfolio](https://rohitxcodes.me)

</div>
