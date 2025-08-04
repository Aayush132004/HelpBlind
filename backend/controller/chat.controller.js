
import { generateStreamToken } from "../src/config/stream.js";



export async function getStreamToken(req,res){

    try{
        
        const token = generateStreamToken(req.body.user._id);
        res.status(200).json({token});
    }
    catch(err){
        console.log(err)
    }
        
    
    
}