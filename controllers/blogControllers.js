const Joi = require('joi');
const BlogModel = require('../model/blogModel');



// POST New – Create
const createBlog = async  (req, res,next) => {
  console.log("REQ.USER:", req.user);
console.log("REQ.USER.ID:", req.user?.id);
      try {
      //const newBlog = new BlogModel(req.body); // Create new blog instance
      const { title, content, author, category, tags, status } = req.body;

const newBlog = new BlogModel({
  title,
  content,
  author,
  user: req.user.id,
  category,
  tags,
  status
  
});
  
    await newBlog.save(); // Save to DB
    console.log(req.body);
  return res.status(200).json({
    message: "Blog created successfully",
    data : newBlog
  }); 
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res,next) => {
  try {
    const searchQuery = req.query.search || ''; // Get search query from request query parameters
    const filter = searchQuery
     ? { title: { $regex: searchQuery, $options: 'i' } }
      : {}; // Create filter object based on search query
    const{limit = 10,page = 1} = req.query; //Adding Pagination
    const skip = (page - 1)* limit;
    const blogs = await BlogModel.find(filter)
    .populate('author', 'name _id email') // Fetch all blogs from DB 
    .sort({createdAt: -1})       
    .limit(limit)
    .skip(skip)
    return res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res,next) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(
      req.params.id, // Fetch blog by ID from DB 
    { $inc: { views: 1 } },
      { new: true });   
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }
    return res.status(200).json({
      message: "Blog fetched successfully",
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

const editBlog = async (req, res,next) => {
  try {   
    const {
        title,
        content,
        category,
        tags,
        status
    } = req.body;
    
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: req.params.id,
         user: req.user._id },

      { title,
        content,
        category,
        tags,
        status}, 

      { new: true,
        runValidators: true
      }); // Update

      if (!updatedBlog) {
        return res.status(404).json({
          message: "Blog not found or you are not the owner",
        });
      }  
         res.status(200).json({
      message: "Blog updated successfully",
      data: updatedBlog
    }); 
}
catch (error) {
        next(error);
      }
     }


const deleteBlog = async (req, res,next) => {
  try {
    const deletedBlog = await BlogModel.findOneAndDelete({
       _id: req.params.id,
         user: req.user._id
        });
    if(!deletedBlog){
      return res.status(404).json({
          message: "Blog not found or you are not the owner",
        })
         };

       return res.status(200).json({
      message: "Blog deleted successfully",
      data: deletedBlog
    }); 
   
    
  } catch (error) {
      next(error);
  }
}


module.exports = {
    createBlog,
    getAllBlogs,
    getBlog,
    editBlog,
    deleteBlog
};