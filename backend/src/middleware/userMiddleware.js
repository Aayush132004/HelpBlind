const Scribe=require("../models/scribe")
const Student=require("../models/student")
const jwt=require("jsonwebtoken")
const userMiddleware=async(req,res,next)=>{
    try{
        //its gonna check weather the token we got is valid or not 
        const{token}=req.cookies;
        // console.log("hi",token)
        if(!token)
            throw new Error("Token is not present");

        const payload=jwt.verify(token,process.env.JWT_KEY);
        // console.log(payload);
        const {id}=payload;
        if(!id)
         throw new Error("Invalid token");

        const result=await Scribe.findById(id)||await Student.findById(id);
        // console.log(result);
        if(!result)
            throw new Error("User Dosen't Exist");

        req.result=result;
        next();
    }
    catch(err){
        res.status(401).send("Error:"+err.message);
    }
}
module.exports=userMiddleware;