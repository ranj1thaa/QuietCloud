import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const JournalEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJournalEntry, updateJournalEntry } = useAppContext();
  const [loading, setLoading]=useState(false)

  const [form, setForm] = useState({
    title: "",
    mood: "",
    rating: "",
    content: "",
    whatILearned: "",
    whatIWantToChange: "",
    whatHurtMe: "",
    noteForTomorrow: "",
    letterToFutureSelf: "",
    isPublic: false
  });


  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);
      const allEntries = await getJournalEntry();
      const selected = allEntries.find((e) => e.id === id);

      if (!selected) {
        toast.error("Journal entry not found");
        setLoading(false);
        navigate("/journal-main");
        return;
      }

      setForm(selected);
      setLoading(false);
    };

    fetchEntry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.mood || !form.content) {
      return toast.warn("Please fill title and select mood.");
    }
    setLoading(true);
    const success = await updateJournalEntry(id, form);
    setLoading(false);

    if (success) {
      toast.success("Journal updated!");
      navigate("/journal-main");
    } else {
      toast.error("Failed to update journal.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={12}>
            <Card className="shadow-sm" style={{ boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.2)"}}>
              <Card.Header>
                <h5 className="mb-0">Edit Journal</h5>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter journal title"
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Mood</Form.Label>
                        <Form.Select
                          name="mood"
                          value={form.mood}
                          onChange={handleChange}
                        >
                          <option value="">Select mood</option>
                          <option value="😊 Happy">😊 Happy</option>
                          <option value="😢 Sad">😢 Sad</option>
                          <option value="😠 Angry">😠 Angry</option>
                          <option value="😌 Relaxed">😌 Relaxed</option>
                          <option value="😤 Frustrated">😤 Frustrated</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Rate your day (0–10)</Form.Label>
                        <Form.Control
                          type="number"
                          min={0}
                          max={10}
                          name="rating"
                          value={form.rating}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Type your heart out</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>What I Learned</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="whatILearned"
                      value={form.whatILearned}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>What I Want to Change</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="whatIWantToChange"
                      value={form.whatIWantToChange}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>What Hurt Me Today</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="whatHurtMe"
                      value={form.whatHurtMe}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Note for Tomorrow</Form.Label>
                    <Form.Control
                      name="noteForTomorrow"
                      value={form.noteForTomorrow}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Letter to Future Self</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="letterToFutureSelf"
                      value={form.letterToFutureSelf}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Check
                    type="switch"
                    label="Make this journal public"
                    name="isPublic"
                    checked={form.isPublic}
                    onChange={handleChange}
                    className="mb-3"
                  />

                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate("/journal-main")}
                    >
                      Cancel
                    </Button>

                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? "Saving..." : "Update Entry"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default JournalEdit;
