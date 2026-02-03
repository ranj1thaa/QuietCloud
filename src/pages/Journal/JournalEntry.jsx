import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const JournalEntry = () => {
  const navigate = useNavigate();
  const { setJournalEntry, journalLoading } = useAppContext();
  const [entry, setEntry] = useState({
    date: "",
    subject: "",
    content: "",
    dayRating: 3,
    mood: "😐",
    proudOf: "",
    regret: "",
    couldDoBetter: "",
    productivity: 5,
    happy: "",
    futureSelf: "",
    visibility: "private",
  });

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setEntry({ ...entry, [name]: type === "range" ? Number(value) : value });
  };

  const handleSubmitJournal = async (e) => {
    e.preventDefault();
    if (!entry.subject || !entry.content || !entry.mood) {
      toast.warn("Please fill subject, content, and mood");
      return;
    }

    try {
      await setJournalEntry(entry);
      toast.success("Journal saved");
      navigate("/journal-main");
    } catch {
      toast.error("Failed to save journal");
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-soft">
        <h4 className="mb-3 rose-text">📝 New Journal Entry</h4>
        <Form onSubmit={handleSubmitJournal}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" className="qc-input" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              placeholder="Today in a sentence..."
              className="qc-input"
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Write your Heart Out</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="content"
              placeholder="Write freely..."
              className="qc-input"
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rate your day (1–5)</Form.Label>
            <Form.Range min={1} max={5} name="dayRating" value={entry.dayRating} onChange={handleOnChange} />
            <small>Rating: {entry.dayRating}</small>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mood</Form.Label>
            <Form.Select name="mood" value={entry.mood} className="qc-input" onChange={handleOnChange}>
              <option value="😄">😄 Happy</option>
              <option value="🙂">🙂 Calm</option>
              <option value="😐">😐 Neutral</option>
              <option value="😔">😔 Sad</option>
              <option value="😤">😤 Frustrated</option>
              <option value="😴">😴 Tired</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>What are you proud of today?</Form.Label>
            <Form.Control type="text" name="proudOf" className="qc-input" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>What do you regret?</Form.Label>
            <Form.Control type="text" name="regret" className="qc-input" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>What could you have done differently?</Form.Label>
            <Form.Control type="text" name="couldDoBetter" className="qc-input" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Productivity level (0–10)</Form.Label>
            <Form.Range min={0} max={10} name="productivity" value={entry.productivity} onChange={handleOnChange} />
            <small>Productivity: {entry.productivity}</small>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Are you happy today?</Form.Label>
            <Form.Control type="text" name="happy" placeholder="Yes / No / Why?" className="qc-input" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message to your future self</Form.Label>
            <Form.Control as="textarea" rows={3} name="futureSelf" className="qc-input" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Visibility</Form.Label>
            <Form.Check type="radio" label="Private" name="visibility" value="private" checked={entry.visibility === "private"} onChange={handleOnChange} />
            <Form.Check type="radio" label="Public" name="visibility" value="public" checked={entry.visibility === "public"} onChange={handleOnChange} />
          </Form.Group>

          <Button disabled={journalLoading} type="submit" className="qc-btn mb-2">
            {journalLoading ? "Saving..." : "Save Entry"}
          </Button>
          <Button className="qc-btn-secondary w-100" onClick={() => navigate("/journal-main")}>
            Back
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default JournalEntry;
