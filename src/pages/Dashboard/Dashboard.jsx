import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useAppContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Dashboard1 from './Dashboard1';
import "../../styles/dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate();
  const { entries, fetchJournalEntry, user } = useAppContext();



  useEffect(() => {
    if (user) fetchJournalEntry();
  }, [user]);


  const publicEntry = entries.filter(entry => entry.visibility !== 'private');
  
  useGSAP(() => {
    const slides = document.querySelectorAll(".qc-slide");
    if (!slides.length) return;
    gsap.killTweensOf(slides);

    gsap.from(slides, {
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.1,
      clearProps: "transform",
    });
  }, [publicEntry.length]);


  return (
    <Container fluid className="qc-dashboard p-0">
  <div className="qc-greeting mb-5 mt-10 text-center">
    <h3>Hi, {user?.displayName} 👋</h3>
    <p>Let's Be Considerate</p>
  </div>

  <Badge className="qc-badge-success">Email Verified</Badge>

  <section className="qc-section">
    <h4>Public Journals to Read</h4>
    {publicEntry.length === 0 ? (
      <p className="qc-text-soft">No public journals available.</p>
    ) : (
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        breakpoints={{768:{slidesPerView:2},992:{slidesPerView:3}}}
        autoplay={{ delay: 2800, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {publicEntry.map(entry => (
          <SwiperSlide key={entry.id} className="h-100 qc-slide">
            <Card
              className="qc-card qc-card-dashboard h-100"
              onClick={() => navigate(`/journal-readOnly/${entry.id}`)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{entry.subject || "Untitled"}</Card.Title>
                <Card.Text className="qc-text-soft">{entry.content?.substring(0, 90)}...</Card.Text>
                <small className="qc-text-muted">
                  {entry.createdAtClient ? new Date(entry.createdAtClient).toLocaleDateString() : ""}
                </small>
                <div className='qc-btnss'>
                  <Button
                  className="qc-btn  mt-3"
                  onClick={e => { e.stopPropagation(); navigate(`/journal-readOnly/${entry.id}`); }}
                >Read</Button>
                </div>
                
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    )}
  </section>

  <Dashboard1 />
</Container>

  );
};

export default Dashboard;
