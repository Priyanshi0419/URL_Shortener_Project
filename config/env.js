import { z } from "zod";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const env = z.object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URI: z.string(),
    MONGODB_DATABASE_NAME: z.string(),
//DATABASE_HOST:z.string(),
//DATABASE_USER:z.string(),
//DATABASE_PASSWORD:z.string(),
//DATABASE_NAME:z.string(),
//DATABASE_PORT:z.string()|| 3306,
}).parse(process.env);
