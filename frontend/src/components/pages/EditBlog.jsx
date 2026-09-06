import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogAPI from "../../services/BlogAPI";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await BlogAPI.get(`/editBlog/${id}`);

        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await BlogAPI.put(`/editBlog/${id}`, {
        title,
        content,
      });

      navigate("/getAllBlogs");
    } catch (error) {
      console.log(error);
      alert("Failed to update blog");
    }
  };

  return (
    <div>
      <h2>Edit Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog content"
        />

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;