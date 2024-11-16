import express, { Router } from "express"
// import {urlhandler} from "../controllers/url.js"
const router = express.Router();

router.get("/", (req,res)=>{
    return res.send("welcome from home page")
} )

export default router;