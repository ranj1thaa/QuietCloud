import React, { useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AuthContext'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
const VisionBoard = () => {
  const navigate = useNavigate()
  const { visionsList, fetchVisionBoards, user, deleteVisionBoard } = useAppContext()

  useEffect(() => {
    if (!user) return
    fetchVisionBoards()
  }, [user])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Board?")) {
      await deleteVisionBoard(id)
      fetchVisionBoards()
    }
  }

  return (
    <Container className="vision-container">
      <div className="vision-header flex-col md:flex-row md:items-center gap-2 mb-4">
        <h2>🌫️ Vision Board</h2>
        <div className="flex gap-2 flex-wrap">
          <Button className="qc-btn" onClick={() => navigate('/visionboard/new')}>+ New Vision Period</Button>
          <Button className="qc-btn-outline" onClick={() => navigate('/home')}>Back</Button>
        </div>
      </div>

      {visionsList.length === 0 && (
        <p className="text-center text-muted mt-20">
          No vision periods yet. Create one to begin 🌱
        </p>
      )}

      <Swiper modules={[Navigation]}
  navigation
  spaceBetween={20}
  slidesPerView={1}
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
  {visionsList.map((board) => (
    <SwiperSlide key={board.id}>
      <Card className="vision-card h-100 p-4">
        <Card.Body className="d-flex flex-column justify-between">
          <Card.Title className="vision-card-title">
            {board.title}
          </Card.Title>

          <Card.Text className="vision-card-text">
            {board.intention}
          </Card.Text>

          <small className="vision-card-date">
            Target: {board.targetDate}
          </small>

          <div className="vision-card-actions mt-3">
            <Button
              className="btn-edit"
              onClick={() => navigate(`/visionboard/${board.id}`)}
            >
              Edit
            </Button>

            <Button
              className="btn-delete"
              onClick={() => handleDelete(board.id)}
            >
              Delete
            </Button>

            <Button
              className="btn-read"
              onClick={() => navigate(`/vision-board/${board.id}`)}
            >
              Read
            </Button>
          </div>
        </Card.Body>
      </Card>
    </SwiperSlide>
  ))}
</Swiper>

    </Container>
  )
}

export default VisionBoard
