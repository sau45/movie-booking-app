// errorHandler.js - Complete Error Handler with Detailed Examples

const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // ============================================================
  // 1. ZOD VALIDATION ERROR
  // ============================================================
  // Kab hota hai: Jab Zod schema validation fail ho
  // Example request:
  // POST /api/movies
  // Body: { "title": "AB", "year": "two thousand" }
  //
  // Response:
  // {
  //   "success": false,
  //   "message": "Validation failed",
  //   "errors": [
  //     { "field": "title", "message": "Title must be at least 3 characters", "code": "too_small" },
  //     { "field": "year", "message": "Expected number, received string", "code": "invalid_type" }
  //   ]
  // }
  if (err instanceof ZodError) {
    const errors = err.issues.map((e) => ({
      // ✅ issues
      field: e.path.join("."),
      message: e.message,
      code: e.code,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // ============================================================
  // 2. MONGOOSE VALIDATION ERROR
  // ============================================================
  // Kab hota hai: Jab Mongoose schema validation fail ho (DB level)
  // Example request:
  // POST /api/movies
  // Body: { "year": 2024 }  // title missing but Mongoose schema requires it
  //
  // Response:
  // {
  //   "success": false,
  //   "message": "Database validation failed",
  //   "errors": {
  //     "title": "Path `title` is required.",
  //     "director": "Path `director` is required."
  //   }
  // }
  if (err.name === "ValidationError") {
    const errors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {});

    return res.status(422).json({
      success: false,
      message: "Database validation failed",
      errors,
    });
  }

  // ============================================================
  // 3. MONGOOSE DUPLICATE KEY ERROR (E11000)
  // ============================================================
  // Kab hota hai: Jab unique field me duplicate value insert karo
  // Example request:
  // POST /api/movies
  // Body: { "title": "Inception", "year": 2010 }
  // (But "Inception" already exists in DB with unique constraint)
  //
  // Response:
  // {
  //   "success": false,
  //   "message": "title already exists",
  //   "field": "title"
  // }
  //
  // Common scenarios:
  // - Email already registered
  // - Username already taken
  // - Movie title already exists
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
      field,
    });
  }

  // ============================================================
  // 4. MONGOOSE CAST ERROR
  // ============================================================
  // Kab hota hai: Jab invalid ObjectId ya wrong data type pass karo
  // Example request:
  // GET /api/movies/abc123  (invalid ObjectId)
  // GET /api/movies/123     (too short)
  //
  // Response:
  // {
  //   "success": false,
  //   "message": "Invalid _id: abc123"
  // }
  //
  // Common scenarios:
  // - Invalid MongoDB ObjectId in URL params
  // - Wrong data type in query (expected Number, got String)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // ============================================================
  // 5. JWT - JsonWebTokenError
  // ============================================================
  // Kab hota hai: Jab JWT token invalid ho (tampered, malformed)
  // Example request:
  // GET /api/movies/protected
  // Headers: { "Authorization": "Bearer invalid.token.here" }
  //
  // Response:
  // {
  //   "success": false,
  //   "message": "Invalid token"
  // }
  //
  // Common scenarios:
  // - Token ko manually change kiya
  // - Wrong secret key se verify kiya
  // - Malformed token structure
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  // ============================================================
  // 6. JWT - TokenExpiredError
  // ============================================================
  // Kab hota hai: Jab JWT token expire ho chuka ho
  // Example request:
  // GET /api/movies/protected
  // Headers: { "Authorization": "Bearer expired.token.here" }
  //
  // Response:
  // {
  //   "success": false,
  //   "message": "Token expired"
  // }
  //
  // Common scenario:
  // - User login kiye 7 days ho gaye (token expiry: 7d)
  // - Refresh token use karke nayi token generate karni padegi
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  // ============================================================
  // 7. MULTER ERROR (File Upload)
  // ============================================================
  // Kab hota hai: File upload me problem ho
  // Example request:
  // POST /api/movies/upload
  // Body: FormData with 50MB file (but limit is 10MB)
  //
  // Response for LIMIT_FILE_SIZE:
  // {
  //   "success": false,
  //   "message": "File too large"
  // }
  //
  // Common Multer errors:
  // - LIMIT_FILE_SIZE: File size limit exceed
  // - LIMIT_FILE_COUNT: Too many files
  // - LIMIT_UNEXPECTED_FILE: Unexpected field name
  // - LIMIT_FIELD_KEY: Field name too long
  // - LIMIT_FIELD_VALUE: Field value too long
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large",
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files uploaded",
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected file field",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // ============================================================
  // 8. CUSTOM OPERATIONAL ERRORS
  // ============================================================
  // Kab hota hai: Jab aap manually CustomError throw karo
  // Example code:
  // if (!movie) {
  //   throw new CustomError("Movie not found", 404);
  // }
  //
  // Response:
  // {
  //   "success": false,
  //   "message": "Movie not found"
  // }
  //
  // Common scenarios:
  // - Resource not found (404)
  // - Unauthorized access (403)
  // - Payment required (402)
  // - Bad request with custom message (400)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // ============================================================
  // 9. SYNTAX ERROR (Invalid JSON)
  // ============================================================
  // Kab hota hai: Jab malformed JSON body bhejo
  // Example request:
  // POST /api/movies
  // Body (raw): { "title": "Inception", }  // trailing comma
  //
  // Response:
  // {
  //   "success": false,
  //   "message": "Invalid JSON"
  // }
  //
  // Common scenarios:
  // - Missing quotes in JSON
  // - Trailing commas
  // - Single quotes instead of double quotes
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON",
    });
  }

  // ============================================================
  // 10. RATE LIMIT ERROR (express-rate-limit)
  // ============================================================
  // Kab hota hai: Too many requests in short time
  // Example:
  // 100 requests in 1 minute (limit: 10 req/min)
  //
  // Response:
  // {
  //   "success": false,
  //   "message": "Too many requests, please try again later"
  // }
  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      message: "Too many requests, please try again later",
    });
  }

  // ============================================================
  // 11. DEFAULT ERROR (Unknown/Unexpected)
  // ============================================================
  // Kab hota hai: Koi bhi unexpected error
  // Examples:
  // - Database connection lost
  // - Third-party API down
  // - Server out of memory
  // - Unhandled promise rejection
  //
  // Development Response:
  // {
  //   "success": false,
  //   "message": "Detailed error message",
  //   "stack": "Error stack trace..."
  // }
  //
  // Production Response:
  // {
  //   "success": false,
  //   "message": "Internal server error"
  // }
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// ============================================================
// CUSTOM ERROR CLASS
// ============================================================
// Usage Examples:
// throw new CustomError("Movie not found", 404);
// throw new CustomError("Unauthorized access", 403);
// throw new CustomError("Invalid credentials", 401);
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // To distinguish from programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// ⚠️ IMPORTANT: Export both errorHandler and CustomError
module.exports = { errorHandler, CustomError };
