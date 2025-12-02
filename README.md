Movie Booking App Backend (Node.js)

A clean and professional backend with JWT authentication, role-based authorization, MongoDB, and modular architecture.

Features:
- JWT Login & Authentication
- Role-Based Authorization (Admin/User)
- Auth Protected Routes
- CRUD for Movies
- MongoDB + Mongoose
- Central Error Handling
- Modular Architecture

Project Structure:
src/
 ├── config/db.js
 ├── controllers/
 ├── middleware/
 │     ├── authProtect.js
 │     ├── roleAuthorization.js
 │     └── errorHandler.js
 ├── models/
 ├── routes/
 ├── services/
 ├── schemas/
 └── utils/asyncHandler.js
index.js

Movie Routes Table:
GET /mba/api/v1/movies → Public
GET /api/movies/:id → Public
POST /mba/api/v1/movies → Admin only
PUT /mba/api/v1/movies/:id → Admin only
DELETE /mba/api/v1/movies/:id → Admin only

Example Protected Route:
router.post("/movies", authProtect, roleAuthorization(["admin"]), createMovie);

Environment Variables (.env):
PORT=8080
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key

Run Project:
npm install
npm run dev
