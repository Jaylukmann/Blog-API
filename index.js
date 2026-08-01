require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./database/blogDB");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use("/", blogRoutes);
app.use(logger);
app.use(errorHandler);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});