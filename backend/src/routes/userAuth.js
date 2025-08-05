const express=require("express");
const authRouter=express.Router();
const userMiddleware=require("../middleware/userMiddleware")
// const userMiddleware=require("../middleware/userMiddleware")
const {uploadSignature,registerScribe,registerStudent,login,logout , stdreq , seltscb , getstudents , accept, getPermanentStudents, getPermanentScribe , rejectrequest , acceptrequest , getRejectedRequests}=require("../../controller/authScribe");
const { getStreamToken } = require("../../controller/chat.controller");

//register and doc uploading
authRouter.post("/registerScribe",registerScribe);
authRouter.get("/uploadSignature",uploadSignature);
authRouter.post("/registerStudent",registerStudent);
//login and logout
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.post("/stdreq" ,stdreq);
authRouter.post("/seltscb" ,seltscb);

authRouter.post("/getstudents" ,getstudents);
authRouter.post("/accept" , accept);
authRouter.post("/getPermanentStudents" , getPermanentStudents);
authRouter.post("/getPermanentScribe" , getPermanentScribe);
authRouter.post("/token",getStreamToken);
authRouter.post("/acceptrequest",acceptrequest);
authRouter.post("/rejectrequest",rejectrequest);

authRouter.post("/getRejectedRequests",getRejectedRequests);

// acceptrequest
// rejectrequest


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