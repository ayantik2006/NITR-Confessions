const mongoose=require("mongoose");

const mongodb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected!");        
    }
    catch(e){
        console.log("error connecting to db!");
    }
}

module.exports=mongodb;