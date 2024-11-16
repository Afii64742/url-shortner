import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

 const urlSchema = new Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    originalURL:{
        type:String,
        required:true
    },
    clickCount:{
        type:Number,
        default:0
    }

},{ timestamps: true })

export const URL = mongoose.model('url', urlSchema)