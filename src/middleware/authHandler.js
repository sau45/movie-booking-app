const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const authProtect = asyncHandler((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

});

module.exports = { authProtect };