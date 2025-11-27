import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const BlogOpen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllPublicBlogs } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);

      const allEntries = (await getAllPublicBlogs()) || [];
      const selected = allEntries.find(e => e.id === id);

      if (!selected) {
        setLoading(false);    
        navigate("/dashboard", { replace: true });
        return;
      }

      setEntry(selected);
      setLoading(false);
    };

    fetchEntry();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="text-center mt-5">
        <p>Entry not found</p>
        <Button onClick={() => navigate("/dashboard")}>Back</Button>
      </div>
    );
  } 

  return (
    <div style={{ padding: "20px",paddingBottom: "60px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)"}} className="journal-opens">
      <Button variant="secondary" className="mb-3" onClick={() => navigate("/dashboard")}>
        Back to Journals
      </Button>

      <Card className="shadow-sm" style={{ boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.4)"}} >
        <Card.Header>
          <h4>{entry.title}</h4>
        </Card.Header>
        <Card.Body>
          <h4><strong>Content:</strong></h4>
          <p>{entry.content}</p><br />
          {entry.tags && <p><strong>Tags:</strong><br />{entry.tags}</p>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogOpen
