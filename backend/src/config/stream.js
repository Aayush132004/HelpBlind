// import {StreamChat} from 'stream-chat'
// import 'dotenv/config'

// const apikey = process.env.STREAM_API_KEY;
// const apisecret = process.env.STREAM_SECRET_KEY;

// if(!apikey || !apisecret) {
//     console.log('STREAM_API_KEY and STREAM_SECRET_KEY missing in .env file');
// }

// const streamClient = StreamChat.getInstance(apikey, apisecret); // beacause of the streamClient we can communicate with stream application

// export const upsertStreamUser = async (userData)=>{

//     try{
//         await streamClient.upsertUsers([userData]); // upsertUser is used to create or update a user in Stream
//         return userData; 
//     }
//     catch(err){
//         console.error('Error creating Stream user:', err);
//     }
// }

// export const generateStreamToken = (userId)=>{
//   try{
//     console.log("working")
//     const userIdStr= userId.toString(); // ensure userId is in string
//     const token = streamClient.createToken(userIdStr);
//     console.log(token)
//     return token;

    
//   }
//   catch(err){
//     return resizeBy.status(500).json({message:"Server Error in generating Stream Tokenn",});
//   }
// }
const { StreamChat } = require('stream-chat');
require('dotenv/config');

const apikey = process.env.STREAM_API_KEY;
const apisecret = process.env.STREAM_SECRET_KEY;

if (!apikey || !apisecret) {
  console.log('STREAM_API_KEY and STREAM_SECRET_KEY missing in .env file');
}

const streamClient = StreamChat.getInstance(apikey, apisecret);

// Function to create or update user
const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (err) {
    console.error('Error creating Stream user:', err);
  }
};

// Function to generate token
const generateStreamToken = (userId) => {
  try {
    console.log("working");
    const userIdStr = userId.toString(); // ensure userId is string
    const token = streamClient.createToken(userIdStr);
    console.log(token);
    return token;
  } catch (err) {
    console.error("Server Error in generating Stream Token:", err);
    return null;
  }
};

// Export all functions
module.exports = {
  upsertStreamUser,
  generateStreamToken,
  streamClient,
};
