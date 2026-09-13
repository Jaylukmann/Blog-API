//Refactoring service from controller require that the service perform the logic of the app
//like saving to the database, fetching from the database, updating and deleting from the database
//and performing pagination,filtering,sorting and searching.

import BlogModel from "../model/blogModel.js";

export const createBlog = async (blogData) => {
  const newBlog = new BlogModel(blogData);

  return await newBlog.save();
};

export const getAllBlogs = async ({ search, page, limit }) => {
  const filter = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const skip = (page - 1) * limit;

  const blogs = await BlogModel.find(filter)
    .populate("author", "name _id email")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  return blogs;
};

export const getBlog = async (blogId) => {
  const blog = await BlogModel.findByIdAndUpdate(
    blogId,
    { $inc: { views: 1 } },
    { new: true }
  );

  return blog;
};

export const editBlog = async (blogId, userId, blogData) => {
  const updatedBlog = await BlogModel.findOneAndUpdate(
    {
      _id: blogId,
      user: userId
    },
    blogData,
    {
      new: true,
      runValidators: true
    }
  );

  return updatedBlog;
};

export const deleteBlog = async (blogId, userId) => {
  const deletedBlog = await BlogModel.findOneAndDelete({
    _id: blogId,
    user: userId
  });

  return deletedBlog;
};