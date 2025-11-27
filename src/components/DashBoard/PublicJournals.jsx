import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectCreative, Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/effect-creative'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
const PublicJournals = () => {
  const {getAllPublicJournal}= useAppContext()
  const navigate=useNavigate()
  const [publicJournals, setPublicJournals] = useState([]); 

  useEffect(()=>{
    const fetchJournal=async()=>{
      const data = await getAllPublicJournal();
      setPublicJournals(data);
    }
    fetchJournal();
  },[])

  return (
    <Swiper
      modules={[EffectCreative, Navigation, Pagination]}
      effect='creative'
      grabCursor={true}
      navigation 
      pagination={{ clickable: true }} 
      loop={publicJournals.length > 2}
      creativeEffect={{ 
        prev: { shadow: true, translate: ['-120%', 0, -500], rotate: [0, 0, -45], scale: 0.8, }, 
        next: { shadow: true, translate: ['120%', 0, -500], rotate: [0, 0, 45], scale: 0.8, }, 
      }} 
      spaceBetween={30} 
      slidesPerView={1}
    >
      {publicJournals.map(entry => (
        <SwiperSlide key={entry.id}>
          <Card key={entry.id} className="shadow-sm" style={{ borderRadius: "12px",minHeight: "230px", padding:'20px 0 30px 60px', boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", margin:'25px 100px' }}>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2 align-items-center">
                <Card.Title className="fw-bold">{entry.title}</Card.Title>
              </div>

              <Card.Subtitle className="mb-2 text-muted small">
                By: {entry.authorName || "User"} <br />
                {entry.createdAt?.toDate().toLocaleDateString()}
              </Card.Subtitle>

              <Card.Text className="text-secondary"  style={{minHeight:'50px', maxHeight: "50px", overflow: "hidden", textOverflow: "ellipsis", margin:'30px 0 0 0'}}>
                {entry.content}
              </Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between gap-2">
              <Button variant="primary" size="sm" onClick={() => navigate(`/journal-public-open/${entry.id}`)}>
                Open
              </Button>
            </Card.Footer>
          </Card>
        </SwiperSlide>  
      ))}
    </Swiper>     
  );
}
export default PublicJournals
