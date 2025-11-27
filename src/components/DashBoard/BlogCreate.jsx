import React, { useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BlogCreate = () => {
  const { setBlogEntry } = useAppContext();
  const titleRef = useRef();
  const contentRef = useRef();
  const tagsRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value.trim();
    const content = contentRef.current.value.trim();
    const tags = tagsRef.current.value.split(",").map((t) => t.trim());

    if (!title || !content) {
      toast.error("Title & content required");
      return;
    }

    setLoading(true);

    const success = await setBlogEntry({
      title,
      content,
      tags,
      isPublic: true,
    });

    setLoading(false);

    if (success) {
      toast.success("Blog created!");
      navigate("/dashboard");
    } else {
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="container mt-4 p-3 rounded-2xl" style={{ maxWidth: "1000px", boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)"}}>
      <h2>Create a New Blog</h2>

      <form onSubmit={submitHandler} style={{boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)"}}>
        <input ref={titleRef} className="form-control mt-3 p-3 rounded-3xl" placeholder="Blog Title" style={{}}/>
        <textarea ref={contentRef} rows={10}  className="form-control mt-3" placeholder="Write your blog content here..."/>

        <input ref={tagsRef} className="form-control mt-3" placeholder="Tags..."/>

        <button className="btn btn-success w-100 mt-4 mb-4 p-3" disabled={loading}>
          {loading ? "Posting..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogCreate;
