import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogAPI from "../../services/BlogAPI";

function CreateBlog() {
const navigate = useNavigate();

const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [category, setCategory] = useState("");
const [tags, setTags] = useState("");
const [status, setStatus] = useState("published");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();


if (!title.trim() || !content.trim()) {
  alert("Title and content are required");
  return;
}

try {
  setLoading(true);

  await BlogAPI.post("/createBlog", {
    title,
    content,
    category,
    tags: tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== ""),
    status,
  });

  alert("Blog created successfully");

  navigate("/blogs");
} catch (error) {
  console.log(error);

  alert(
    error.response?.data?.message || "Failed to create blog"
  );
} finally {
  setLoading(false);
}


};

return ( <div> <h2>Create Blog</h2>


  <form onSubmit={handleSubmit}>
    <div>
      <label>Title</label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
      />
    </div>

    <div>
      <label>Content</label>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your blog"
        rows="8"
      />
    </div>

    <div>
      <label>Category</label>

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category"
      />
    </div>

    <div>
      <label>Tags</label>

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="technology, javascript, react"
      />
    </div>

    <div>
      <label>Status</label>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>
    </div>

    <button type="submit" disabled={loading}>
      {loading ? "Creating..." : "Create Blog"}
    </button>

    <button
      type="button"
      onClick={() => navigate("/blogs")}
    >
      Cancel
    </button>
  </form>
</div>


);
}

export default CreateBlog;
