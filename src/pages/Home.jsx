import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const navigate = useNavigate();

  useGSAP(() => {
  const tl = gsap.timeline();

  tl.from(".qc-journal-access-container", {
    x: -20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.to(".qc-btns", {
    opacity: 0.65,
    duration: 0.9,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: 0.8,
  });
});

  return (
    <Container fluid className="qc-journal-access-container"  style={{  minHeight: "calc(100vh - var(--qc-navbar-height))", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem 1rem", }} >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 className="qc-title" style={{ fontSize: "2rem" }}>
          Welcome Back
        </h1>
        <p className="qc-text" style={{ fontSize: "1rem", color: "var(--color-text-soft)" }}>
          Access your personal growth tools below
        </p>
      </div>

      <Row className="g-4 justify-content-center" style={{ width: "100%", maxWidth: "900px" }} >
        <Col xs={12} md={6}>
          <Card className="qc-journal-access-card"  style={{ minHeight: "260px", cursor: "pointer" }} onClick={() => navigate("/journal-main")} >
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="qc-title rose-text">Journal</Card.Title>
              <Card.Text className="qc-text">
                Access your personal journal entries & reflections
              </Card.Text>
              <Button className="qc-btn qc-btns" onClick={() => navigate("/journal-main")}>
                Open Journal
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="qc-journal-access-card" style={{ minHeight: "260px", cursor: "pointer" }} onClick={() => navigate("/vision-board")}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="qc-title" style={{ color: "var(--color-lavender)" }}>
                Vision Board
              </Card.Title>
              <Card.Text className="qc-text">
                Build and reflect on your current & future goals
              </Card.Text>
              <Button className="qc-btn qc-btns"  style={{ background: "var(--color-lavender)", color: "#0B1020" }} onClick={() => navigate("/vision-board")}>
                Open Vision Board
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
