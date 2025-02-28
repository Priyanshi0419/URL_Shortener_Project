import { MongoClient } from "mongodb";
import { env } from "./env.js"; 

const dbClient = new MongoClient(env.MONGODB_URI);

async function connectDB() {
    try {
        await dbClient.connect(); // Ensure connection is established
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit if connection fails
    }
}

connectDB(); // Call the function to connect

export { dbClient };

/*
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Ensure .env is loaded

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE_NAME;

console.log("MongoDB URI:", mongoUri); // Debugging
console.log("MongoDB Database:", dbName);

export const dbClient = new MongoClient(mongoUri);
await dbClient.connect();
export const db = dbClient.db(dbName);
export const shortnerCollection = db.collection("shorteners");

/*
import mysql from "mysql2/promise";
import { env } from "./env.js";

// Create a connection pool (better than a single connection)
const db = mysql.createPool({
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    port: env.DATABASE_PORT || 3306,
    ssl: {
        rejectUnauthorized: true, // Required for PlanetScale
    },
    connectionLimit: 10, // Allows multiple connections for better performance
});

export default db;

/*
import mysql from "mysql2/promise";
import {env} from "./env.js"*/
//create a connection

 
