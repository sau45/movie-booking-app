const asyncHandler = require("../middleware/asyncHandler");
const authService = require("../services/auth.service");
// success but new data create hota hai 200
// success but koi data create nahin hua hai 201

const register = asyncHandler(async (req, res) => {
  const response = await authService.register(req.body);
  return res.status(200).json({
    success: true,
    data: response,
  });
});


const login = asyncHandler(async(req,res)=>{
  // console.log("req body in login",req.body)
    const response = await authService.login(req.body);
    return res.status(200).json({
      success:true,
      data:response
    })

})


module.exports={register,login}
