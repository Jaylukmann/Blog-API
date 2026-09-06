import express from "express";
const router = express.Router();


import blogControllers from "../controllers/blogControllers.js";

import validateCreateBlog  from "../validators/validateCreateBlog.js";
import validateEditBlog  from "../validators/validateEditBlog.js";
import userAuth from "../middlewares/userAuth.js";

router.post("/createBlog",userAuth,validateCreateBlog,blogControllers.createBlog);
router.get("/getAllBlogs",userAuth, blogControllers.getAllBlogs);
router.get("/getBlog/:id",userAuth, blogControllers.getBlog);
router.put("/editBlog/:id",userAuth, validateEditBlog, blogControllers.editBlog);
router.delete("/deleteBlog/:id",userAuth,blogControllers.deleteBlog);

export default router;    