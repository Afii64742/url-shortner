import mongoose from "mongoose";
export const dbConnection = (url)=>{
    return mongoose.connect(url)
}
