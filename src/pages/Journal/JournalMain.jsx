import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaLock, FaLockOpen, FaTrash, FaEdit } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import JournalAnalytics from "../Analytics/JournalAnalytics";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const JournalMain = () => {
  const { getJournalEntry, deleteJournalEntry, user, entries, setEntries } =useAppContext();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  const fetchEntries = async () => {
    setLoading(true);
    const data = await getJournalEntry();
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    fetchEntries();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteJournalEntry(id);
      fetchEntries();
    }
  };

  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = a.createdAt ? a.createdAt.toDate() : new Date(0);
    const dateB = b.createdAt ? b.createdAt.toDate() : new Date(0);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredEntries = sortedEntries.filter((e) => {
    const term = search.toLowerCase();
    const dateString = e.createdAt
      ? e.createdAt.toDate().toLocaleDateString().toLowerCase()
      : "";

    return (
      (e.title || "").toLowerCase().includes(term) ||
      (e.mood || "").toLowerCase().includes(term) ||
      (e.content || "").toLowerCase().includes(term) ||
      (e.rating || "").toString().toLowerCase().includes(term) ||
      dateString.includes(term)
    );
  });

  return (
    <div  style={{ padding: "40px", paddingTop:'40px', boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)", margin:'2px 100px'}}>
      <h2 className="mb-4 text-center">Your  Entries 📝</h2>
      <Link to='/journal-message-create' className="pub-msg">Type public Message</Link>

      <div className="d-flex flex-column flex-md-row mb-4 gap-3 mt-4">
        <input type="text" placeholder="Search journals..."  className="form-control p-3"  value={search} onChange={(e) => setSearch(e.target.value)}/>

        <select className="form-control  p-3" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort By</option>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center">
          <p>No matching entries. Try searching something else.</p>
          <Button onClick={() => navigate("/journal-create")}>
            Create Journal Entry
          </Button>
        </div>
      ) : (
          <>
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
              {filteredEntries.map((entry) => (
                <SwiperSlide key={entry.id}>
                  <Card key={entry.id} className="shadow-sm" style={{ borderRadius: "12px", minHeight: "190px",padding: "40px", marginTop:'2px', paddingTop:'40px', boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)"}}>
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2 align-items-center">
                        <Card.Title className="fw-bold">{entry.title}</Card.Title>
                        {entry.isPublic ? (
                          <FaLockOpen size={16} color="black" />
                        ) : (
                          <FaLock size={16} color="gray" />
                        )}
                      </div>

                      <Card.Subtitle className="mb-2 text-muted small">
                        Mood: {entry.mood} | Rating: {entry.rating} <br />
                        Date:{" "}
                        {entry.createdAt?.toDate().toLocaleDateString(undefined, {day: "numeric",month: "short", year: "numeric",})}
                      </Card.Subtitle>

                      <Card.Text className="text-secondary" style={{minHeigh:'30px',maxHeight: "20px", overflow: "hidden", textOverflow: "ellipsis",}}>
                        {entry.content}
                      </Card.Text>
                    </Card.Body>

                    <Card.Footer className="d-flex gap-3 mt-6">
                      <Button variant="primary" size="sm" onClick={() => navigate(`/journal-open/${entry.id}`)} style={{marginTop:'20px', width:'80px', display:'flex', justifyContent:'center',alignItems:'center', padding:'10px'}}>
                          Open
                      </Button>
                      <Button variant="warning" size="sm" onClick={() => navigate(`/journal-edit/${entry.id}`)} style={{marginTop:'20px', width:'80px', display:'flex', gap:3,alignItems:'center', padding:'10px'}}>
                        <FaEdit /> Edit
                      </Button>

                      <Button variant="danger" size="sm" onClick={() => handleDelete(entry.id)} style={{marginTop:'20px', width:'80px', display:'flex', gap:3,alignItems:'center', padding:'10px', marginLeft:'25px'}}>
                        <FaTrash /> Delete
                      </Button>
                    </Card.Footer>
                  </Card>
                </SwiperSlide>
              
              ))}
            </Swiper>
           
            <div className="mt-5" style={{ boxShadow: "0px 4px 1px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)", padding: "20px", borderRadius: "12px", marginBottom:'10px'}}>
              <JournalAnalytics />
            </div>
          </>
      )}
    </div>
  );
};

export default JournalMain;
