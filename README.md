# 🎬 Movie Booking App Backend

A professional Node.js backend API with session-based authentication, role-based authorization, and MongoDB integration.

---

## ✨ Features

- 🔐 **Session-Based Authentication** - Secure login with express-session & MongoDB store (Currently Active)
- 🎫 **JWT Authentication** - Token-based auth system (Alternative implementation available)
- 👥 **Role-Based Authorization** - Admin and User roles
- 🛡️ **Protected Routes** - Auth middleware for sensitive endpoints
- 🎥 **Movie Management** - Complete CRUD operations
- 🗄️ **MongoDB Integration** - Mongoose ODM for data modeling
- ⚠️ **Error Handling** - Centralized error management
- 📦 **Modular Architecture** - Clean, scalable code structure

---

## 🔐 Authentication System

**Currently Active: Session-Based Authentication**

Session-based authentication with MongoDB persistence:
- Login creates session stored in MongoDB (24-hour expiry)
- Browser receives HttpOnly cookie with encrypted session ID
- Session data available in `req.session` for all requests
- Logout destroys session from database

**Alternative: JWT Authentication (Available but not active)**
- Token-based stateless authentication
- Can be switched by modifying middleware configuration

---

## 🛣️ API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| 🟢 GET | `/mba/api/v1/movies` | Public | Get all movies |
| 🟢 GET | `/mba/api/v1/movies/:id` | Public | Get movie by ID |
| 🔵 POST | `/mba/api/v1/users/signup` | Public | Register user |
| 🔵 POST | `/mba/api/v1/users/login` | Public | User login |
| 🔵 POST | `/mba/api/v1/movies` | 🔒 Admin | Create new movie |
| 🟡 PUT | `/mba/api/v1/movies/:id` | 🔒 Admin | Update movie |
| 🔴 DELETE | `/mba/api/v1/movies/:id` | 🔒 Admin | Delete movie |

---

## 🔒 Protected Route Example

```javascript
 app.post(
    "/mba/api/v1/movies",
    // jwtRouteProtect,
    // jwtRoleAuthorization(['user', 'manager']),
    sessionRouteProtect,
    sessionRoleAuthorization(['admin', 'manager']),
    validate(movieZodSchema),
    MovieController.createMovie
  );
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_secure_secret_key
NODE_ENV=development
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
npm start
```

### Production

```bash
# Start production server
NODE_ENV=production npm start
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication (Active):** express-session + connect-mongo
- **Authentication (Available):** JWT (jsonwebtoken)
- **Security:** bcrypt for password hashing

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ for seamless movie booking management.