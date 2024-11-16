import express from "express";
import shortid from "shortid";
import { URL } from "../models/url.js";  // Assuming you have a URL model

const router = express.Router();
router.post("/", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send({ message: "URL is required" });
  }
  const shortID = shortid.generate();
  
 
   const newURl = new URL({
      shortId:shortID,
      originalURL:url,
     })

     await newURl.save();
  
  return res.send({ shortURL: `http://localhost:3000/api/url/${shortID}` }); 
});

router.get("/:shortID", async (req, res) => {
   const { shortID } = req.params;

   try {
     // Find the URL entry by shortId
     const urlEntry = await URL.findOne({ shortId: shortID });
 
     if (!urlEntry) {
       return res.status(404).send("URL not found in the system");
     }
 
     // Increment click count
     urlEntry.clickCount += 1;
     await urlEntry.save();

     // Redirect to the original URL
     if (!urlEntry.originalURL.startsWith("http://") && !urlEntry.originalURL.startsWith("https://")) {
      return res.redirect(`https://${urlEntry.originalURL}`);
    }
    return res.redirect(urlEntry.originalURL);
    
   } catch (err) {
     console.error("Error while resolving URL:", err);
     res.status(500).send({ message: "Internal Server Error" });
   }
 });

export default router;
