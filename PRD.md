# 📄 Product Requirements Document (PRD)

## Project Name

**TeamTrack**

## Project Type

Role-Based Task Management System (MERN – Backend Focused)

---

## 1. Problem Statement

Most beginner web applications only implement basic CRUD functionality and lack proper **authentication, authorization, and access control**.  
In such systems:

- Any logged-in user can access or modify other users’ data
- There is no distinction between normal users and administrators
- Security and ownership rules are missing

This makes these applications unsuitable for real-world usage and fails to demonstrate backend engineering skills.

---

## 2. Proposed Solution

TeamTrack is a **role-based task management system** that enforces:

- Secure user authentication
- Role-based authorization (User vs Admin)
- Ownership-based data access

Each user can manage **only their own tasks**, while an admin can manage **all users and all tasks**.

---

## 3. Objectives

### Primary Objectives

- Implement secure authentication
- Enforce authorization rules using middleware
- Demonstrate real-world backend architecture
- Build an interview-defensible MERN project

### Secondary Objectives

- Practice REST API design
- Implement clean folder structure
- Ensure proper error handling

---

## 4. User Roles

### User

- Register and login
- Create, view, update, and delete their own tasks
- Cannot access admin routes

### Admin

- View all users
- Delete users
- View and manage all tasks
- Has full system access

---

## 5. Functional Requirements

### Authentication

- Users must register using email and password
- Passwords must be securely stored
- Users must login to access protected routes

### Authorization

- Role-based access control must be enforced
- Unauthorized access must be blocked

### Task Management

- Users can manage only their own tasks
- Admin can manage all tasks

---

## 6. Non-Functional Requirements

- Secure handling of user data
- Clean and scalable backend architecture
- Proper HTTP status codes
- Centralized error handling

---

## 7. Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Frontend

- React
- Tailwind CSS

### Tools

- Git & GitHub
- Postman
- Render / Railway

---

## 8. System Architecture

---

## 9. API ROUTES (COMPLETE LIST)

### 9.1 Authentication Routes

Base Path: `/api/auth`

| Method | Endpoint    | Description                |
| ------ | ----------- | -------------------------- |
| POST   | `/register` | Register a new user        |
| POST   | `/login`    | Login user                 |
| GET    | `/me`       | Get logged-in user details |

---

### 9.2 Task Routes

Base Path: `/api/tasks`  
(Protected – User)

| Method | Endpoint | Description                  |
| ------ | -------- | ---------------------------- |
| POST   | `/`      | Create a new task            |
| GET    | `/`      | Get logged-in user’s tasks   |
| GET    | `/:id`   | Get single task (owner only) |
| PUT    | `/:id`   | Update task (owner only)     |
| DELETE | `/:id`   | Delete task (owner only)     |

---

### 9.3 Admin Routes

Base Path: `/api/admin`  
(Protected – Admin Only)

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/users`     | Get all users   |
| DELETE | `/users/:id` | Delete a user   |
| GET    | `/tasks`     | Get all tasks   |
| DELETE | `/tasks/:id` | Delete any task |

---

## 10. Database Design

### User Collection

- name
- email (unique)
- password (hashed)
- role (`user` / `admin`)
- createdAt

### Task Collection

- title
- description
- status (`pending` / `completed`)
- owner (User reference)
- createdAt

---

## 11. Security Requirements

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using middleware
- Role-based middleware for admin access

---

## 12. Implementation Strategy

### Backend

- MVC architecture
- Middleware-driven authentication
- Centralized error handling

### Frontend

- Auth-based routing
- Role-based UI rendering
- API-driven data flow

---

## 13. Use Cases

- Personal task management
- Admin-controlled task systems
- Internal company tools
- Learning project for MERN stack
- Portfolio project for placements

---

## 14. Limitations

- No real-time updates
- No third-party OAuth
- No payments or subscriptions

---

## 15. Future Enhancements

- Pagination & filtering
- Activity logs
- Email notifications
- Soft delete
- Team-based tasks

---

## 16. Conclusion

TeamTrack is a backend-focused MERN project designed to solve the problem of **secure multi-user data access**.  
It demonstrates authentication, authorization, and ownership control — core concepts used in real-world systems.

---

## Author

**Rohit Kumar**  
B.Tech CSIT  
GitHub: https://github.com/Rohitvishwakarma5133
