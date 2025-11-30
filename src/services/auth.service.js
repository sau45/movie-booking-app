const { CustomError } = require("../middleware/errorHandler");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

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

  return user;
};

const login = async(userData)=>{
    const {email,password}=userData;
    const isUserExist = await User.findOne({email});
    if(!isUserExist)throw new CustomError("User does not exist",404);

    const token = jwt.sign({id:isUserExist._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token,{
      
    })

}

module.exports = { register,login };
