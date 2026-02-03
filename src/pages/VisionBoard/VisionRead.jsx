import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const VisionRead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { visionsList } = useAppContext();

  const [vision, setVision] = useState(null);

  useEffect(() => {
    if (!visionsList.length) return;

    const selected = visionsList.find(v => v.id === id);
    if (!selected) {
      toast.error("Vision not found");
      navigate("/vision-board");
      return;
    }

    setVision(selected);
  }, [id, visionsList]);

  if (!vision) return null;

  return (
    <Container className="my-5 max-w-3xl">
      <Card className="vision-read-card p-4 shadow-sm">
        <h4 className="mb-3">🌤 Vision Board</h4>

        <Button
          variant="outline-dark"
          className="mb-3"
          onClick={() => navigate("/vision-board")}
        >
          ← Back
        </Button>

        <p><strong>Period:</strong> {vision.period}</p>
        <p><strong>Target Date:</strong> {vision.targetDate || "—"}</p>

        <hr />

        <h5 className="mt-3">{vision.title}</h5>
        <p className="text-muted">{vision.intention}</p>

        <hr className="my-4" />

        <h5>Vision Categories</h5>

        {vision.categories?.length === 0 && (
          <p className="text-muted">No categories added.</p>
        )}

        {vision.categories?.map((cat, index) => (
          <Card
            key={index}
            className="category-card mb-4 p-3 border-0 shadow-sm rounded-4"
          >
            <h6 className="mb-2">
              {index + 1}. {cat.category || "Untitled"}
            </h6>

            <p><strong>Goals</strong><br />{cat.goals || "—"}</p>
            <p><strong>Habits</strong><br />{cat.habits || "—"}</p>
            <p><strong>Fear / Resistance</strong><br />{cat.fear || "—"}</p>
            <p><strong>Desired Feeling</strong><br />{cat.feeling || "—"}</p>
          {console.log(cat.imageUrl)}
          {cat.imageUrl && (
  <Row className="mt-3 g-2">
    <Col xs={12} md={6} lg={4}>
      <img
        src={cat.imageUrl}       
        alt={`Vision ${index + 1}`}
        className="img-fluid rounded shadow-sm"
        style={{
          height: "180px",         
          objectFit: "cover",     
          width: "100%",           
          display: "block",
        }}
        onError={(e) => {
          e.target.src = "/placeholder-image.png"; 
        }}
      />
    </Col>
  </Row>
)}


          </Card>
        ))}
      </Card>
    </Container>
  );
};

export default VisionRead;
