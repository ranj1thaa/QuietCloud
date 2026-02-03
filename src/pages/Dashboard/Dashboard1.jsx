import { Row, Col, Card } from 'react-bootstrap';
import Articles from '../../services/Articles';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination} from "swiper/modules";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/dashboard1.css"

const Dashboard1 = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
  gsap.from(".qc-article-slide", {
    opacity: 0,
    y: 60,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".box",
      start: "top 80%",
      toggleActions: "play none none none",
      once: true,     
      markers: false,
    },
  });
}, []);


  return (
    <section className="qc-section mt-5 box">
      <h4>🌱 Read Something Meaningful Today</h4>
      <p className="qc-text-soft mb-4">
        Gentle reads to support reflection, growth, and emotional clarity.
      </p>

      <Swiper
        direction="vertical"
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={24}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        style={{ height: "250px" }}   
      >
        {Articles.map((article, index) => (
          <SwiperSlide key={index} className="qc-article-slide">
            <Card className="qc-article-card h-100">
              <Card.Body>
                <Card.Title>{article.Title}</Card.Title>
                <Card.Text className="qc-text-soft">
                  {article.Content}
                </Card.Text>
              </Card.Body>

              <Card.Footer className="qc-card-footer">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qc-link"
                >
                  Read more →
                </a>
              </Card.Footer>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Dashboard1;
