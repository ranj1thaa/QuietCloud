import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const JournalMain = () => {
  const { journalLoading, user, entries, fetchJournalEntry, deleteJournalEntry } =
    useAppContext();
  const navigate = useNavigate();

  const [searchDate, setSearchDate] = useState("");
  const [searchMood, setSearchMood] = useState("");

  useEffect(() => {
    fetchJournalEntry();
  }, [user]);

  const handleDeleteBtn = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteJournalEntry(id);
      fetchJournalEntry();
    }
  };

  const filteredEntry = entries.filter((entry) => {
    const matchesDate = searchDate
      ? entry.date?.slice(0, 10) === searchDate ||
        entry.createdAtClient?.slice(0, 10) === searchDate
      : true;
    const matchesMood = searchMood ? entry.mood === searchMood : true;
    return matchesDate && matchesMood;
  });

  return (
    <Container className="my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-2">
        <h2 className="qc-title">Your Journal</h2>
        <div className="d-flex gap-2 flex-wrap">
          <Button className="qc-btn" onClick={() => navigate("/journal-new-entry")}>
            + New Entry
          </Button>
          <Button className="qc-btn-secondary" onClick={() => navigate("/home")}>
            Back
          </Button>
        </div>
      </div>

      <Row className="mb-4 g-3">
        <Col xs={12} md={4}>
          <input
            type="date"
            className="qc-input"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </Col>
        <Col xs={12} md={4}>
          <select
            className="qc-input"
            value={searchMood}
            onChange={(e) => setSearchMood(e.target.value)}
          >
            <option value="">All moods</option>
            <option value="😄">😄 Happy</option>
            <option value="🙂">🙂 Calm</option>
            <option value="😐">😐 Neutral</option>
            <option value="😔">😔 Sad</option>
            <option value="😤">😤 Frustrated</option>
            <option value="😴">😴 Tired</option>
          </select>
        </Col>
        <Col xs={12} md={4}>
          <Button
            className="qc-btn-secondary w-100"
            onClick={() => {
              setSearchDate("");
              setSearchMood("");
            }}
          >
            Clear Filters
          </Button>
        </Col>
      </Row>

      {journalLoading ? (
        <p>Loading entries...</p>
      ) : entries.length === 0 ? (
        <p>No entries yet. Click "New Entry" to start.</p>
      ) : (
        <Swiper
  modules={[Navigation]}
  navigation
  spaceBetween={20}
  slidesPerView={1}
  breakpoints={{
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
>
  {filteredEntry.map((entry) => (
    <SwiperSlide key={entry.id}>
      <Card
        className="qc-card-dashboard"
        onClick={() => navigate(`/journal-editor/${entry.id}`)}
        style={{ height: "100%" }}
      >
        <Card.Body>
          <Card.Title className="rose-text">
            {entry.subject || "Untitled"}
          </Card.Title>

          <Card.Text className="qc-text">
            {entry.content?.substring(0, 80)}...
          </Card.Text>

          <Card.Text className="qc-text">
            Mood: {entry.mood}
          </Card.Text>

          <small className="text-muted">
            {entry.createdAtClient
              ? new Date(entry.createdAtClient).toLocaleString()
              : ""}
          </small>

          <div className="d-flex gap-2 mt-3 flex-wrap">
            <Button
              className="qc-btn-secondary flex-1"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/journal-editor/${entry.id}`);
              }}
            >
              Edit
            </Button>

            <Button
              className="qc-btn flex-1"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBtn(entry.id);
              }}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </SwiperSlide>
  ))}
</Swiper>

      )}
    </Container>
  );
};

export default JournalMain;
