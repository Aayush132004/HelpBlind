const express=require("express");
const authRouter=express.Router();
const userMiddleware=require("../middleware/userMiddleware")
// const userMiddleware=require("../middleware/userMiddleware")
const {uploadSignature,registerScribe,registerStudent,login,logout}=require("../../controller/authScribe");

//register and doc uploading
authRouter.post("/registerScribe",registerScribe);
authRouter.get("/uploadSignature",uploadSignature);
authRouter.post("/registerStudent",registerStudent);
//login and logout
authRouter.post("/login",login);
authRouter.post("/logout",logout);


authRouter.get("/check",userMiddleware,async(req,res)=>{
  // console.log(req);
  // console.log("hi");
  const reply={
            _id: req.result._id,
            fullName: req.result.fullName,
            profile: req.result.profile ? req.result.profile:null,
            state: req.result.state,
            city: req.result.city,
            role:req.result.role,
  }
  res.status(200).json({
    user:reply,
    message:"Valid User"
  })
})
module.exports=authRouter;