import crypto from "crypto";
import path from "path";
import express from "express";



import {postShortenLink,getShortnerPage, redirectToShortLink} from "../controllers/shortner.controller.js";
const router=express.Router();







router.get("/",getShortnerPage);
router.post("/",postShortenLink);



/*app.post("/", async (req, res) => {
    try {
        const { url, shortcode } = req.body;
console.log(req.body);
        // Check if both URL and shortcode are provided
        if (!url || !shortcode) {
            return res.status(400).send("Both URL and shortcode are required.");
        }

        // Load existing links
        const links = await loadlinks();

        // Check if the provided shortcode is already in use
        if (links[shortcode]) {
            return res.status(400).send("Shortcode already exists. Please choose another.");
        }

        // Add the URL and the provided shortcode to the links
        links[shortcode] = url;

        // Save the updated links
        await savelinks(links);

        // Return success response
        return res.status(201).send(`Short URL created: ${req.headers.host}/${shortcode}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
*/


router.get("/:shortCode",redirectToShortLink);
export const shortenedurls=router;