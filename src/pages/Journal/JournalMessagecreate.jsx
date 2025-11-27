import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const JournalMessagecreate = () => {
  const { setJournalEntry, loading, setLoading } = useAppContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return toast.error("Message cannot be empty");

    setLoading(true);

    const success = await setJournalEntry({
      message,
      isPublic: true,
      title: "Public Message",
    });

    setLoading(false);

    if (success) {
      toast.success("Message posted publicly!");
      setMessage("");
      navigate("/dashboard");
    } else {
      toast.error("Failed to post message. Try again.");
    }
  };

  return (
    <div className="page-wrapper">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="shadow-sm" style={{ boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)"}}>
              <Card.Header>
                <h5 className="mb-0">Share a Public Message</h5>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit} >
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="message"
                      placeholder="Enter your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default JournalMessagecreate;
