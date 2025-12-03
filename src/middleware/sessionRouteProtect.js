
const authProtect = (req,res,next)=>{
    if(req.session && req.session.user){
        next();
    }else{
        return res.status(401).json({message:"Unauthorized: No session available"})
    }
}


module.exports = authProtect;




