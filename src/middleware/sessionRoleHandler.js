const roleAuthorization = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.session.user.role; // Assuming req.user is populated with authenticated user's info
    console.log("User role:", userRole);

    if (allowedRoles.includes(userRole)) {
      next(); // User has one of the allowed roles, proceed to the next middleware/route handler
    } else {
      res.status(403).json({ message: "Forbidden: You do not have access to this resource." });
    }
  };
};

module.exports = roleAuthorization;