import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URL;
let isConnected=false; 
async function dbconnect() {
    if(isConnected){
        console.log("Mongodb is already connected");
        return ;
    }
    try{
  const db=await mongoose.connect(MONGODB_URI);
  isConnected=db.connections[0].readyState===1; 
  
  console.log("connected to mongodb",db); 
    }catch(error){
console.log("failed to connect to mongodb");
throw error;
    }
}
export default dbconnect;
