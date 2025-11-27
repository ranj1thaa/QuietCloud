import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const JournalOpen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJournalEntry } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);

      const allEntries = (await getJournalEntry()) || [];
      const selected = allEntries.find(e => e.id === id);

      if (!selected) {
        setLoading(false);    
        navigate("/journal-main", { replace: true });
        return;
      }

      setEntry(selected);
      setLoading(false);
    };

    fetchEntry();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="text-center mt-5">
        <p>Entry not found</p>
        <Button onClick={() => navigate("/journal-main")}>Back</Button>
      </div>
    );
  } 

  return (
    <div style={{ padding: "20px",paddingBottom: "60px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)"}} className="journal-opens">
      <Button variant="secondary" className="mb-3" onClick={() => navigate("/journal-main")}>
        Back to Journals
      </Button>

      <Card className="shadow-sm" style={{ boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.4)"}} >
        <Card.Header>
          <h4>{entry.title}</h4>
          <small className="text-muted">
            Mood: {entry.mood} | Rating: {entry.rating} | {entry.isPublic ? "Public" : "Private"}
          </small>
        </Card.Header>
        <Card.Body>
          <h4><strong>Content:</strong></h4>
          <p>{entry.content}</p><br />
          {entry.whatILearned && <p><strong>What I Learned:</strong><br />{entry.whatILearned}</p>}
          {entry.whatIWantToChange && <p><strong>What I Want to Change:</strong><br />{entry.whatIWantToChange}</p>}
          {entry.whatHurtMe && <p><strong>What Hurt Me Today:</strong><br />{entry.whatHurtMe}</p>}
          {entry.noteForTomorrow && <p><strong>Note for Tomorrow:</strong><br />{entry.noteForTomorrow}</p>}
          {entry.letterToFutureSelf && <p><strong>Letter to Future Self:</strong><br />{entry.letterToFutureSelf}</p>}
        </Card.Body>
      </Card>
      <Button variant="secondary" className="mt-3" onClick={() => navigate("/journal-main")}>
        Back to Journals
      </Button>
    </div>
  );
};

export default JournalOpen;
