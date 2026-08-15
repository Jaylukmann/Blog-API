require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./database/blogDB");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorhandler");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.static(path.join(__dirname, 'views')));//use 
connectDB();

app.use(cors());
app.use(express.json());
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);
app.use(logger);
app.use(errorHandler);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




















//Get random string for JWT secret key
// node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

//$2b$12$o.YMRYETmNhSVxACQ6wfC.4lo6wzM2W/sZwxVsSCqQ44NeiYg2V3W",
//"$2b$12$o.YMRYETmNhSVxACQ6wfC.4lo6wzM2W/sZwxVsSCqQ44NeiYg2V3W"