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

router.post("/createBlog",validateCreateBlog, createBlog);
router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlog/:id", getBlog);
router.put("/editBlog/:id", validateEditBlog, editBlog);
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = router;