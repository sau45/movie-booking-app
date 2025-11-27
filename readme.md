# 🎬 Movie Booking App (Node.js Backend)

A production-ready RESTful API backend for a **Movie Booking Application** built with **Node.js**, featuring comprehensive error handling, input validation, and industry-standard architecture.

---

## 🚀 Features

- ✅ **CRUD Operations:** Create, read, update, and delete movies and bookings
- ✅ **Advanced Error Handling:** Centralized error management with detailed responses
- ✅ **Input Validation:** Zod-based schema validation for data integrity
- ✅ **RESTful API Design:** Clean, intuitive endpoints following REST principles
- ✅ **Async Error Handling:** Custom async handler for clean controller code
- ✅ **Type-Safe Validation:** Runtime type checking with Zod
- ✅ **Custom Error Classes:** Operational error handling with proper HTTP status codes
- ✅ **404 Handler:** Graceful handling of undefined routes
- ✅ **Security:** Input sanitization and validation at multiple layers

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **Validation:** Zod (schema validation)
- **Error Handling:** Custom error middleware with async handler
- **Development:** Nodemon, dotenv

---

## 📁 Project Structure
```
movie-booking-app/
├── src/
│   ├── config/
│   │   └── db.js                    # Database configuration
│   ├── controllers/
│   │   └── movieController.js       # Route controllers
│   ├── middleware/
│   │   ├── errorHandler.js          # Centralized error handler
│   │   └── validateSchema.js        # Zod validation middleware
│   ├── models/
│   │   └── Movie.js                 # Mongoose schemas
│   ├── routes/
│   │   └── route.movie.js           # API routes
│   ├── services/
│   │   └── movieService.js          # Business logic
│   ├── schemas/
│   │   └── movieSchema.js           # Zod validation schemas
│   └── utils/
│       └── asyncHandler.js          # Async wrapper utility
├── index.js                         # Entry point
├── .env                             # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Steps

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/movie-booking-app.git
   cd movie-booking-app
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
```env
   PORT=8181
   MONGODB_URI=mongodb://localhost:27017/movie-booking
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
```

4. **Start the server**
```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
```

5. **Verify installation**
```bash
   curl http://localhost:8181/
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:8181/api
```

### Endpoints

#### **Movies**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/movies` | Get all movies | No |
| GET | `/movies/:id` | Get movie by ID | No |
| POST | `/movies` | Create new movie | Yes |
| PUT | `/movies/:id` | Update movie | Yes |
| DELETE | `/movies/:id` | Delete movie | Yes |

#### **Example Requests**

**Create Movie**
```bash
POST /api/movies
Content-Type: application/json

{
  "title": "Inception",
  "year": 2010,
  "genre": ["Action", "Sci-Fi"],
  "director": "Christopher Nolan",
  "cast": ["Leonardo DiCaprio", "Tom Hardy"],
  "rating": 8.8
}
```

**Response (Success)**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Inception",
    "year": 2010,
    "genre": ["Action", "Sci-Fi"],
    "director": "Christopher Nolan",
    "cast": ["Leonardo DiCaprio", "Tom Hardy"],
    "rating": 8.8,
    "createdAt": "2024-11-27T10:30:00.000Z"
  }
}
```

---

## 🛡️ Error Handling

This application implements a **comprehensive error handling system** with multiple layers of protection.

### Error Handling Architecture
```
Request → Zod Validation → Controller → Service → Database
   ↓           ↓              ↓           ↓          ↓
  404      Validation      Custom     Business   Mongoose
Handler     Errors        Errors      Logic      Errors
   ↓           ↓              ↓           ↓          ↓
   └───────────┴──────────────┴───────────┴──────────┘
                            ↓
                  Centralized Error Handler
                            ↓
                    Formatted Response
```

### Error Types & Responses

#### 1. **Zod Validation Errors (400)**
Triggered when request data doesn't match schema.

**Example Request:**
```bash
POST /api/movies
{
  "title": "AB",
  "year": "invalid"
}
```

**Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title must be at least 3 characters",
      "code": "too_small"
    },
    {
      "field": "year",
      "message": "Expected number, received string",
      "code": "invalid_type"
    }
  ]
}
```

#### 2. **Custom Errors (400, 401, 403, 404)**
Application-specific business logic errors.

**Example:** Movie Not Found
```json
{
  "success": false,
  "message": "Movie not found"
}
```

**Example:** Unauthorized Access
```json
{
  "success": false,
  "message": "Not authorized to delete this movie"
}
```

#### 3. **Mongoose Validation Errors (422)**
Database schema validation failures.

**Response:**
```json
{
  "success": false,
  "message": "Database validation failed",
  "errors": {
    "director": "Path `director` is required"
  }
}
```

#### 4. **Duplicate Key Errors (409)**
Unique constraint violations.

**Response:**
```json
{
  "success": false,
  "message": "title already exists",
  "field": "title"
}
```

#### 5. **Cast Errors (400)**
Invalid MongoDB ObjectId or type mismatches.

**Example Request:**
```bash
GET /api/movies/invalid-id
```

**Response:**
```json
{
  "success": false,
  "message": "Invalid _id: invalid-id"
}
```

#### 6. **JWT Errors (401)**
Authentication token issues.

**Invalid Token:**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

**Expired Token:**
```json
{
  "success": false,
  "message": "Token expired"
}
```

#### 7. **Route Not Found (404)**
Unmatched API endpoints.

**Example Request:**
```bash
GET /api/wrong-route
```

**Response:**
```json
{
  "success": false,
  "message": "Cannot GET /api/wrong-route"
}
```

#### 8. **Server Errors (500)**
Unexpected internal errors.

**Development Response:**
```json
{
  "success": false,
  "message": "Detailed error message",
  "stack": "Error: ...\n    at ..."
}
```

**Production Response:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🔐 Error Handling Best Practices

### 1. **Two-Layer Validation**
- **Layer 1 (Zod):** Validates input before database operations
- **Layer 2 (Mongoose):** Enforces database constraints (unique, required, etc.)

### 2. **Async Handler Pattern**
Clean controller code without repetitive try-catch blocks:
```javascript
const getMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.getMovieById(req.params.id);
  
  if (!movie) {
    throw new CustomError("Movie not found", 404);
  }
  
  res.json({ success: true, data: movie });
});
```

### 3. **Custom Error Class**
Operational errors with proper status codes:
```javascript
throw new CustomError("Unauthorized access", 403);
throw new CustomError("Payment required", 402);
```

### 4. **Centralized Error Handler**
All errors flow through a single middleware for consistent responses.

---

## 📝 HTTP Status Codes Used

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST requests |
| 400 | Bad Request | Invalid input, malformed JSON |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource or route doesn't exist |
| 409 | Conflict | Duplicate unique field (email, title) |
| 422 | Unprocessable Entity | Database validation failure |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server errors |

---

## 🧪 Testing

### Manual Testing with Postman/cURL

**Test Validation Error:**
```bash
curl -X POST http://localhost:8181/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title": "AB"}'
```

**Test 404 Error:**
```bash
curl http://localhost:8181/api/wrong-route
```

**Test Invalid ObjectId:**
```bash
curl http://localhost:8181/api/movies/invalid123
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Express.js for the robust web framework
- Mongoose for elegant MongoDB object modeling
- Zod for TypeScript-first schema validation
- The Node.js community for amazing tools and libraries

---

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub or contact the maintainer.

**Happy Coding! 🚀**