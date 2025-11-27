import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate=useNavigate()
  return (
    <div className="card shadow-sm mb-3" style={{boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)", padding:'10px 0 10px 25px', maxHeight:"270px", minHeight:'270px'}}>
      <div className="card-body">
        <h4>{blog.title}</h4>
        <p className="text-muted small mb-5">
          {blog.authorName} •{" "}
          {blog.createdAt?.toDate?.().toLocaleString?.() || ""}
        </p>

        <p>
          {blog.content.length > 150
            ? blog.content.slice(0, 150) + "..."
            : blog.content}
        </p>

        <div className="d-flex gap-2 mt-2 flex-wrap">
          {blog.tags?.map((tag, index) => (
            <span key={index} className="badge bg-secondary">
              {tag}
            </span>
          ))}
        </div>

        <button style={{color:'--text-main', border:'1px solid var(--logo-accent)', backgroundColor:'var(--logo-accent)', padding:'6px', borderRadius:'10px', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'5px', marginTop:'15px'}} onClick={()=>navigate(`/blog-open/${blog.id}`)}>Read Full Blog <FaLongArrowAltRight /></button>
      </div>
    </div>
  );
};

export default BlogCard;
