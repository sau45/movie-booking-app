const { CustomError } = require("../middleware/errorHandler");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const register = async (userData) => {
  const { name, email, password } = userData;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) throw new CustomError("User already exist", 409);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    name,
    email
  };
};

const login = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });
  if (!user) throw new CustomError("Invalid email or password", 401);

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new CustomError("Invalid email or password", 401);

  const userDetails = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(
    userDetails,          // Clean payload
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    ...userDetails,
  };
};


module.exports = { register,login };
