import { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";

const CATEGORY_OPTIONS = ["Career","Health","Mind","Finance","Relationships","Spiritual","Skills"];

const VisionEntry = () => {
  const navigate = useNavigate();
  const { createVisionBoard, user, uploadImage } = useAppContext();

  const [vision, setVision] = useState({
    period: "1 Year",
    title: "",
    intention: "",
    targetDate: "",
    categories: [{ category: "", goals: "", habits: "", fear: "", feeling: "", imageUrl: "" ,preview: ""}],
  });

  const addCategory = () => {
    setVision(prev => ({
      ...prev,
      categories: [...prev.categories, { category: "", goals: "", habits: "", fear: "", feeling: "", imageUrl: "", preview: "" }]
    }));
  };

  const removeCategory = (index) => {
    setVision(prev => ({ ...prev, categories: prev.categories.filter((_, i) => i !== index) }));
  };

  const updateCategory = (index, field, value) => {
    const updated = [...vision.categories];
    updated[index][field] = value;
    setVision({ ...vision, categories: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createVisionBoard({ ...vision, createdAtClient: new Date().toISOString() });
      if (res) navigate("/vision-board");
    } catch (err) { console.log(err) }
  };

  return (
    <Container className="my-5 max-w-3xl">
      <Card className="vision-form-card">
        <h4 className="mb-4">🌱 Create Vision</h4>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Vision Period</Form.Label>
              <Form.Select value={vision.period} onChange={e => setVision({...vision, period: e.target.value})}>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>1 Year</option>
                <option>5 Years</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Target Date</Form.Label>
              <Form.Control type="date" value={vision.targetDate} onChange={e => setVision({...vision, targetDate: e.target.value})}/>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Vision Title</Form.Label>
            <Form.Control placeholder="A calm, clear future I am building" value={vision.title} onChange={e => setVision({...vision, title: e.target.value})}/>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Overall Intention</Form.Label>
            <Form.Control as="textarea" rows={2} placeholder="Why this vision matters to me" value={vision.intention} onChange={e => setVision({...vision, intention: e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Add any Image</Form.Label>
          </Form.Group>
          

          <div className="d-flex justify-between items-center mb-3">
            <h5>Vision Categories</h5>
            <Button variant="outline-dark" onClick={addCategory}>+ Add Category</Button>
          </div>

          {vision.categories.map((cat, index) => (
            <Card key={index} className="category-card mb-4">
              <div className="d-flex justify-between items-center mb-2">
                <strong>Category {index + 1}</strong>
                <Button variant="outline-danger" size="sm" onClick={() => removeCategory(index)}>Remove</Button>
              </div>

              <Form.Select value={cat.category} onChange={e => updateCategory(index, "category", e.target.value)}>
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
              </Form.Select>

              <Form.Control as="textarea" rows={2} value={cat.goals} onChange={e => updateCategory(index, "goals", e.target.value)} placeholder="Goals"/>
              <Form.Control value={cat.habits} onChange={e => updateCategory(index, "habits", e.target.value)} placeholder="Habits to build"/>
              <Form.Control value={cat.fear} onChange={e => updateCategory(index, "fear", e.target.value)} placeholder="Fear / Resistance"/>
              <Form.Control value={cat.feeling} onChange={e => updateCategory(index, "feeling", e.target.value)} placeholder="How I want to feel"/>

              <Form.Control type="file"  accept="image/*"  onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                console.log(file)
                const previewURL = URL.createObjectURL(file);
                console.log(previewURL)
                updateCategory(index, "preview", previewURL);
                try {
                  const uploadedURL = await uploadImage(file, user.uid);
                    updateCategory(index, "imageUrl", uploadedURL);
                } catch (err) {
                console.error("Upload failed:", err); 
                }
              }}/>
              {(cat.preview || cat.imageUrl) && (  <img src={cat.preview || cat.imageUrl} className="img-fluid mt-2 rounded" alt="Vision preview" style={{ objectFit: "cover" }} />)}

            </Card>
          ))}

          <div className="flex gap-3">
            <Button type="submit" className="qc-btn">Save Vision</Button>
            <Button variant="outline-secondary" onClick={() => navigate("/vision-board")}>Cancel</Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}

export default VisionEntry
