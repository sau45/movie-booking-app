# 🎬 Movie Booking App Backend

A professional Node.js backend API with JWT authentication, role-based authorization, and MongoDB integration.

---

## ✨ Features

- 🔐 **JWT Authentication** - Secure login system
- 👥 **Role-Based Authorization** - Admin and User roles
- 🛡️ **Protected Routes** - Auth middleware for sensitive endpoints
- 🎥 **Movie Management** - Complete CRUD operations
- 🗄️ **MongoDB Integration** - Mongoose ODM for data modeling
- ⚠️ **Error Handling** - Centralized error management
- 📦 **Modular Architecture** - Clean, scalable code structure

---

## 📁 Project Structure

```
src/
 ├── 📂 config/
 │    └── db.js
 ├── 📂 controllers/
 ├── 📂 middleware/
 │    ├── authProtect.js
 │    ├── roleAuthorization.js
 │    └── errorHandler.js
 ├── 📂 models/
 ├── 📂 routes/
 ├── 📂 services/
 ├── 📂 schemas/
 └── 📂 utils/
      └── asyncHandler.js
index.js
```

---

## 🛣️ API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| 🟢 GET | `/mba/api/v1/movies` | Public | Get all movies |
| 🟢 GET | `/mba/api/v1/movies/:id` | Public | Get movie by ID |
| 🔵 POST | `/mba/api/v1/movies` | 🔒 Admin | Create new movie |
| 🟡 PUT | `/mba/api/v1/movies/:id` | 🔒 Admin | Update movie |
| 🔴 DELETE | `/mba/api/v1/movies/:id` | 🔒 Admin | Delete movie |

---

## 🔒 Protected Route Example

```javascript
router.post(
  "/movies",
  authProtect,
  roleAuthorization(["admin"]),
  createMovie
);
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```

---

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run in development mode
npm run dev
```

### Production

```bash
# Start production server
npm start
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcrypt for password hashing

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ for seamless movie booking management.