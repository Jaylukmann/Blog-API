const express = require("express");
const router = express.Router();

const {
    createBlog,
    getAllBlogs,
    getBlog,
    editBlog,
    deleteBlog
} = require("../controllers/blogControllers.js");

const  validateCreateBlog  = require("../middlewares/validateCreateBlog.js");
 const  validateEditBlog  = require("../middlewares/validateEditBlog.js");
  const userAuth = require("../middlewares/userAuth.js");

router.post("/createBlog",userAuth,validateCreateBlog,createBlog);
router.get("/getAllBlogs",userAuth, getAllBlogs);
router.get("/getBlog/:id",userAuth, getBlog);
router.put("/editBlog/:id",userAuth, validateEditBlog, editBlog);
router.delete("/deleteBlog/:id",userAuth,deleteBlog);

module.exports = router;