import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const JournalCreate = () => {
  const navigate = useNavigate();
  const { setJournalEntry, loading, setLoading } = useAppContext();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.mood || !form.rating || !form.whatILearned) {
      return toast.warn("Please fill title and select mood.");
    }

    setLoading(true);
    const success = await setJournalEntry(form);
    setLoading(false);

    if (success) {
      toast.success("Journal saved!");
      navigate("/journal-main");
    } else {
      toast.error("Failed to save journal.");
    }
  };

  return (
    <div>
      <Container className="py-4">
        <Row className="justify-content-center" >
          <Col xs={12} md={10} lg={12} >
            <Card className="shadow-sm" style={{boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)", margin:'2px 100px'}}>
              <Card.Header>
                <h5 className="mb-0 p-3">✍️ Create Journal</h5>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title 📖</Form.Label>
                    <Form.Control
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      style={{padding:'8px 12px'}}
                      placeholder="Enter journal title"
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Mood 💭</Form.Label>
                        <Form.Select
                          name="mood"
                          value={form.mood}
                          onChange={handleChange}
                          style={{boxShadow:'0.2px 0.2px 0.7px black ', padding:'8px 12px'}}
                        >
                          <option value="">Select mood</option>
                          <option value="😊 Happy">😊 Happy</option>
                          <option value="😢 Sad">😢 Sad</option>
                          <option value="😠 Angry">😠 Angry</option>
                          <option value="😌 Relaxed">😌 Relaxed</option>
                          <option value="😤 Frustrated">😤 Frustrated</option>
                          <option value="😄 Excited">😄 Excited</option>
                          <option value="🤩 Amazed">🤩 Amazed</option>
                          <option value="😁 Motivated">😁 Motivated</option>
                          <option value="🙂 Content">🙂 Content</option>
                          <option value="🤗 Grateful">🤗 Grateful</option>
                          <option value="😍 Loved">😍 Loved</option>
                          <option value="😇 Peaceful">😇 Peaceful</option>
                          <option value="😴 Tired">😴 Tired</option>
                          <option value="🥱 Sleepy">🥱 Sleepy</option>
                          <option value="🤒 Sick">🤒 Sick</option>
                          <option value="🤕 Hurt">🤕 Hurt</option>
                          <option value="😖 Stressed">😖 Stressed</option>
                          <option value="😫 Overwhelmed">😫 Overwhelmed</option>
                          <option value="😩 Drained">😩 Drained</option>
                          <option value="😕 Confused">😕 Confused</option> 
                          <option value="😬 Nervous">😬 Nervous</option>
                          <option value="😟 Worried">😟 Worried</option>
                          <option value="😨 Anxious">😨 Anxious</option>
                          <option value="🥺 Emotional">🥺 Emotional</option>
                          <option value="😭 Heartbroken">😭 Heartbroken</option>
                          <option value="😒 Annoyed">😒 Annoyed</option>
                          <option value="😏 Confident">😏 Confident</option>
                          <option value="🤔 Thoughtful">🤔 Thoughtful</option>
                          <option value="🤩 Inspired">🤩 Inspired</option>
                          <option value="🙌 Proud">🙌 Proud</option>
                          <option value="🧘 Calm">🧘 Calm</option>
                          <option value="🎉 Celebratory">🎉 Celebratory</option>
                          <option value="🤝 Connected">🤝 Connected</option>
                          <option value="🌈 Hopeful">🌈 Hopeful</option>
                          <option value="💪 Strong">💪 Strong</option>
                          <option value="🧠 Focused">🧠 Focused</option>
                          <option value="📈 Productive">📈 Productive</option>
                          <option value="🤯 Mind-blown">🤯 Mind-blown</option>
                          <option value="😶 Numb">😶 Numb</option>
                          <option value="😔 Disappointed">😔 Disappointed</option>
                          <option value="🤨 Skeptical">🤨 Skeptical</option>
                          <option value="😓 Guilty">😓 Guilty</option>
                          <option value="😞 Regretful">😞 Regretful</option>
                          <option value="😤 Determined">😤 Determined</option>
                          <option value="🥹 Touching Moment">🥹 Touching Moment</option>
                          <option value="🤬 Furious">🤬 Furious</option>
                          <option value="🫠 Melting / Over it">🫠 Melting / Over it</option>
                          <option value="🫥 Feeling Invisible">🫥 Feeling Invisible</option>
                          <option value="✈️ Travelling">✈️ Travelling</option>
                          <option value="📚 Reading">📚 Reading</option>
                          <option value="😴 Lazy">😴 Lazy</option>
                          <option value="🧊 Chilling">🧊 Chilling</option>
                          <option value="❓ Not Sure">❓ Not Sure</option>
                          <option value="🤗 Comforted">🤗 Comforted</option>
                          <option value="🫡 Responsible">🫡 Responsible</option>
                          <option value="🤭 Embarrassed">🤭 Embarrassed</option>
                          <option value="🤢 Disgusted">🤢 Disgusted</option>
                          <option value="🤓 Nerdy Mood">🤓 Nerdy Mood</option>
                          <option value="🌧️ Moody">🌧️ Moody</option>
                          <option value="🫨 Shocked">🫨 Shocked</option>
                          <option value="🤠 Adventurous">🤠 Adventurous</option>
                          <option value="😎 Cool">😎 Cool</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Rate your day (0–10) 📈</Form.Label>
                        <Form.Control
                          type="number"
                          min={0}
                          max={10}
                          name="rating"
                          value={form.rating}
                          style={{boxShadow:'0.2px 0.2px 0.7px black ', padding:'8px 12px'}}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Type your heart out... 📝</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="content"
                      value={form.content}
                      style={{boxShadow:'0.2px 0.2px 0.7px black ', padding:'8px 12px'}}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>What I Learned 🕐</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="whatILearned"
                      value={form.whatILearned}
                      onChange={handleChange}
                      style={{boxShadow:'0.2px 0.2px 0.7px black ', padding:'8px 12px'}}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>What I Want to Change 𝌡</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{boxShadow:'0.2px 0.2px 0.7px black ', padding:'8px 12px'}}
                      rows={2}
                      name="whatIWantToChange"
                      value={form.whatIWantToChange}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>What Hurt Me Today 😕</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      style={{boxShadow:'0.2px 0.2px 0.7px black ', padding:'8px 12px'}}
                      name="whatHurtMe"
                      value={form.whatHurtMe}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Note for Tomorrow 🔮</Form.Label>
                    <Form.Control
                      name="noteForTomorrow"
                      value={form.noteForTomorrow}
                      onChange={handleChange}
                      style={{boxShadow:'0.2px 0.2px 0.7px black ', padding:'8px 12px'}}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Letter to Future Self</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      style={{boxShadow:'0.2px 0.2px 0.7px black ', padding:'8px 12px'}}
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
                      {loading ? "Saving..." : "Save Entry"}
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

export default JournalCreate;
