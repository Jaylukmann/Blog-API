import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/blogDB.js";
dotenv.config();


const app = express();

const PORT = process.env.PORT || 3010;

app.listen(PORT,async () => {
  await connectDB();
    console.log(`Server running on port ${PORT}`);
});




















//Get random string for JWT secret key
// node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

//$2b$12$o.YMRYETmNhSVxACQ6wfC.4lo6wzM2W/sZwxVsSCqQ44NeiYg2V3W",
//"$2b$12$o.YMRYETmNhSVxACQ6wfC.4lo6wzM2W/sZwxVsSCqQ44NeiYg2V3W"