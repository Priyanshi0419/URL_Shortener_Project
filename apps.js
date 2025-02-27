import express from "express";
import {shortenedurls} from "./routes/shortner.route.js";



const app=express();

const PORT=process.env.PORT || 3000;
//from json file



app.use(express.static("publics"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(shortenedurls);

app.set("view engine","ejs");
app.set("views", "./views");



app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});
/*
import express from "express";
import { readFile, writeFile } from "fs/promises";
import crypto from "crypto";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join("data", "links.json");

app.use(express.static("publics"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const loadlinks = async () => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(data || "{}");
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
        throw error;
    }
};

const savelinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links));
};

app.get("/", async (req, res) => {
    try {
        const file = await readFile(path.join("views", "index.html"));
        const links = await loadlinks();

        const content = file
            .toString()
            .replaceAll(
                "{{shorten_urls}}",
                Object.entries(links)
                    .map(
                        ([shortcode, url]) =>
                            `<li><a href="/${shortcode}" target="_blank">${req.host}/${shortcode}</a> -> ${url}</li>`
                    )
                    .join(" ")
            );

        return res.send(content);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.post("/", async (req, res) => {
    try {
        const { url, shortcode } = req.body;
        console.log(req.body);
        const finalShortCode=shortcode;

        // Check if both URL and shortcode are provided
        if (!url || !finalShortCode) {
            return res.status(400).send("Both URL and shortcode are required.");
        }

        const links = await loadlinks();

        // Check if the provided shortcode is already in use
        if (links[finalShortCode]) {
            return res.status(400).send("Shortcode already exists. Please choose another.");
        }

        // Add the URL and the provided shortcode to the links
        links[finalShortCode] = url;

        // Save the updated links
        await savelinks(links);

        // Return success response
        return res.status(201).send(`Short URL created: ${req.headers.host}/${finalShortCode}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.get("/:shortcode", async (req, res) => {
    try {
        const { shortcode } = req.params;
        const links = await loadlinks();

        if (!links[shortcode]) return res.status(404).send("Short URL not found.");
        return res.redirect(links[shortcode]);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
*/
/*
import express from "express";
import { readFile, writeFile } from "fs/promises";
import crypto from "crypto";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join("data", "links.json");

app.use(express.static("publics"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Load links from the JSON file
const loadlinks = async () => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(data || "{}");
    } catch (error) {
        if (error.code === "ENOENT") {
            // If the file doesn't exist, create it with an empty object
            await writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
        console.error("Error loading links:", error);
        throw error;
    }
};

// Save the updated links to the JSON file
const savelinks = async (links) => {
    try {
        console.log("Saving links to file:", links); // Log the links being saved
        await writeFile(DATA_FILE, JSON.stringify(links, null, 2)); // Pretty-print JSON for readability
    } catch (error) {
        console.error("Error saving links:", error);
    }
};

// Render the homepage with shortened URLs
app.get("/", async (req, res) => {
    try {
        const file = await readFile(path.join("views", "index.html"));
        const links = await loadlinks();

        const content = file
            .toString()
            .replaceAll(
                "{{shorten_urls}}",
                Object.entries(links)
                    .map(
                        ([shortcode, url]) =>
                            `<li><a href="/${shortcode}" target="_blank">${req.host}/${shortcode}</a> -> ${url}</li>`
                    )
                    .join(" ")
            );

        return res.send(content);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

// Handle URL shortening (with custom shortcode)
app.post("/", async (req, res) => {
    try {
        const { url, shortcode } = req.body;
        console.log("Received body:", req.body);

        // Ensure both URL and shortcode are provided
        if (!url || !shortcode) {
            return res.status(400).send("Both URL and shortcode are required.");
        }

        const links = await loadlinks();

        // Check if the provided shortcode already exists
        if (links[shortcode]) {
            return res.status(400).send("Shortcode already exists. Please choose another.");
        }

        // Add the URL and shortcode to the links
        links[shortcode] = url;

        // Save the updated links
        await savelinks(links);

        return res.status(201).send(`Short URL created: http://${req.headers.host}/${shortcode}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

// Redirect to the original URL based on the shortcode
app.get("/:shortcode", async (req, res) => {
    try {
        const { shortcode } = req.params;
        const links = await loadlinks();

        if (!links[shortcode]) {
            return res.status(404).send("Short URL not found.");
        }

        return res.redirect(links[shortcode]);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

*/