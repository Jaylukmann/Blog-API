import BlogAPI from "../../services/BlogAPI";

function BlogList({ blogs, setBlogs }) {
  const handleDelete = async (id) => {
    try {
      await BlogAPI.delete(`/blogs/${id}`);

      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete blog");
    }
  };

  const handleEdit = (id) => {
    console.log("Edit blog:", id);
  };

  return (
    <div>
      <h2>My Blogs</h2>

      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>

          <p>{blog.content}</p>

          <button onClick={() => handleEdit(blog._id)}>
            Edit
          </button>

          <button onClick={() => handleDelete(blog._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;

