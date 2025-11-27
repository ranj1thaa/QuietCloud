import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Messages = () => {
  const { getAllPublicJournal } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const data = await getAllPublicJournal();
    setMessages(data.filter(msg => msg.message)); 
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h4 className="mb-4 ">Public Journal Messages</h4>
      <Row>
        {messages.length === 0 && <p>No public messages yet.</p>}

        <Swiper modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={1.2}
          navigation
          breakpoints={{
            768: { slidesPerView: 2.2 },
            992: { slidesPerView: 3.2 },
          }}
          className="mb-4"
        >
          {messages.map((msg) => (
            <SwiperSlide><Col xs={12} md={6} lg={12} key={msg.id} className="mb-3" >
              <Card className="shadow-sm" style={{boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)", maxHeight:'260px', minHeight:'260px', padding:'0 20px 60px 40px'}}>
                <Card.Body style={{ maxHeight:'260px', minHeight:'260px'}}>
                  <Card.Text style={{marginTop:'20px', color:'var(--text-main)'}}>{msg.message}</Card.Text>
                  <div className="text-muted small" style={{marginTop:'150px'}}>
                    <span style={{color:'var(--text-main)'}}>{msg.authorName || "Anonymous"} |{" "}</span>
                    <span style={{color:'var(--text-subtle)'}}>{msg.createdAt?.toDate().toLocaleDateString()}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col></SwiperSlide>
          
          ))}
        </Swiper>
        
      </Row>
    </Container>
  );
};

export default Messages
