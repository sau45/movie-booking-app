const { register, login } = require("../controller/auth.controller");
const validate = require("../middleware/validateSchema");
const UserSchema = require("../zodSchema/user.schema");

const router = (app) => {
  app.post("/mba/api/v1/auth/register", validate(UserSchema), register);
  app.post("/mba/api/v1/auth/login", validate(UserSchema), login);
};

module.exports = router;
