import express from "express";

import {
  createBlogController,
  getAllBlogsController,
  getBlogController,
  editBlogController,
  deleteBlogController
} from "../controllers/blogController.js";

import validateCreateBlog from "../validators/validateCreateBlog.js";
import validateEditBlog from "../validators/validateEditBlog.js";

import userAuth from "../middlewares/userAuth.js";
import { uploadFile } from "../middlewares/uploadFile.js";

const router = express.Router();

router.post(
  "/createBlog",
  userAuth,
  uploadFile().array("media", 5),
  validateCreateBlog,
  createBlogController
);

router.get(
  "/getAllBlogs",
  userAuth,
  getAllBlogsController
);

router.get(
  "/getBlog/:id",
  userAuth,
  getBlogController
);

router.put(
  "/editBlog/:id",
  userAuth,
  uploadFile().array("media", 10),
  validateEditBlog,
  editBlogController
);

router.delete(
  "/deleteBlog/:id",
  userAuth,
  deleteBlogController
);

export default router;