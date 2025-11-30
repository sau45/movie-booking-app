const express = require("express");
const app = express();
const dontenv = require("dotenv");
const connectDB = require("./src/config/db");
dontenv.config();
const MovieRoutes = require("./src/routes/route.movie");
const UserRoutes = require("./src/routes/route.user");
const { errorHandler, CustomError } = require("./src/middleware/errorHandler"); // ✅ Fixed!

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

UserRoutes(app);
MovieRoutes(app);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Server is running correct ✅");
});

// ============================================================
// 404 HANDLER - 
// ============================================================
app.use((req, res, next) => {
  next(new CustomError(`Route ${req.originalUrl} not found`, 404));
});

// Error handler (must be last!)
app.use(errorHandler);

app.listen(process.env.PORT || 8181, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
