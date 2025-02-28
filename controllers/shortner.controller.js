import crypto from "crypto";
import { loadlinks,savelinks,getLinkByShortCode } from "../models/shortner.model.js";

export async function getShortnerPage(req,res) {
    try{
        const links=await loadlinks();
        return res.render("index",{
            links,
            host:req.host,
    });
}
catch(err){
console.error(err);
return res.status(500).send("Internal Server Error");
}
}


export async function postShortenLink(req,res){
    try{
        const {url,shortCode}=req.body;
        const finalShortCode=shortCode||crypto.randomBytes(4).toString("hex");

        const link=await getLinkByShortCode(shortCode);
        if(link){
            return res.status(400).send('<h1>Url with that shortcode already exists, please choose another <a href="/">Go Back</a></h1>');
        }
    

await savelinks({url,shortCode:finalShortCode});

return res.redirect("/");
    }
catch(err){
    console.error(err);
    return res.status(500).send("Internal Server Error");
    }
}

export async function redirectToShortLink(req, res) {
    try {
        const { shortCode } = req.params;
        console.log("Requested Short Code:", shortCode); // Debugging log

        const link = await getLinkByShortCode(shortCode);
        
        if (!link) {
            console.log("Short code not found, redirecting to /404");
            return res.redirect("/404");
        }

        console.log("Redirecting to:", link.URL); // Debugging log
        return res.redirect(link.url);  // Ensure this is a valid URL
    } catch (err) {
        console.error("Redirect Error:", err);
        return res.status(500).send("Internal Server Error");
    }
}



