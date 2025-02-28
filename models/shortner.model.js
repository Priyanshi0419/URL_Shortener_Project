import {dbClient} from "../config/db-client.js"
import { env } from "../config/env.js"

const db=dbClient.db(env.MONGODB_DATABASE_NAME);
const shortnerCollection=db.collection("shorteners");

/*
import db from "../config/db-client.js"

export const loadlinks=async()=>{
    //read data 
    const [rows]=await db.execute(`select * from SHORT_LINKS`);
    return rows;
    
}


export const savelinks=async({url,shortCode})=>{
    //insert data
    const [result]=await db.execute(`insert into SHORT_LINKS(SHORT_CODE,URL) values (?,?)`,[shortCode,url]);
    return result;
}


export const getLinkByShortCode = async (shortCode) => {
  try {
      // Query the database for the short code
      const [rows] = await db.execute(
          `SELECT * FROM SHORT_LINKS WHERE SHORT_CODE = ? LIMIT 1`,
          [shortCode]
      );

      // Return the first result if found, otherwise return null
      return rows.length > 0 ? rows[0] : null;
  } catch (error) {
      console.error("Database Error:", error);
      return null;
  }
};
*/
export const loadlinks=async () =>{
    return shortnerCollection.find({}).toArray();
};

export const savelinks=async (link) =>{
    return shortnerCollection.insertOne(link);
};

export const getLinkByShortCode = async (shortCode) => {
    return await shortnerCollection.findOne({ shortCode: shortCode });
};
