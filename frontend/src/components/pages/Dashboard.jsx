import { useEffect, useState } from "react";
import BlogAPI from "../../services/BlogAPI";
import BlogList from "./BlogList";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const response = await BlogAPI.get("/getAllBlogs");

      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <BlogList blogs={blogs} setBlogs={setBlogs} />

    </div>
  );
}

export default Dashboard;