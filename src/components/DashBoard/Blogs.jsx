import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import BlogCard from "./BlogCard";
import { FaPlus } from "react-icons/fa6";


const Blogs = () => {
  const navigate = useNavigate();
  const { getAllPublicBlogs } = useAppContext();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function loadBlogs() {
      const list = await getAllPublicBlogs();
      setBlogs(list);
    }
    loadBlogs();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={() => navigate("/blogs-create")} style={{display:"flex", flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'4px'}}
        >
          <FaPlus />Create New Blog
        </button>
      </div>

      <h4 className="mt-3">Public Blogs...</h4>

      {blogs.length === 0 ? (
        <p className="mt-3">No blogs found</p>
      ) : (
        <div className="mt-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
