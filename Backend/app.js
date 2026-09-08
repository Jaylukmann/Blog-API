
import express from "express";
import cors from "cors";
import path from "path";



import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorhandler.js";
import  blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();
// app.use(express.static(path.join(__dirname, 'views')));//use 

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Blog API is running successfully",
    status: "OK"
  });
});
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);
app.use(logger);
app.use(errorHandler);


export default app;