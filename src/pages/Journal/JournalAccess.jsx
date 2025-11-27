import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const JournalAccess = () => {
  const [pin, setPin] = useState("");

  const { verifyJournalPassword, loading, setLoading } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pin.length !== 4) {
      toast.warn("PIN must be 4 digits");
      return;
    }

    setLoading(true);
    const isValid = await verifyJournalPassword(pin);
    setLoading(false);

    if (isValid === "NO_PASSWORD") {
      toast.info("No PIN set. Please create one.");
      navigate("/journal-set-pin");
      return;
    }

    if (isValid === "OK") {
      navigate("/journal-main");
      return;
    }

    if (isValid === "INVALID") {
      toast.error("Incorrect PIN");
      return;
    }
  };


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",minHeight: "100vh",padding: "30px"}}>
      <Form style={{width: "90%",  maxWidth: "800px", minWidth: "280px", padding: "40px", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)"}} onSubmit={handleSubmit}>
        <h3 className="text-center mb-4" style={{color:'var(--text-main)'}}>Enter Journal PIN</h3>

        <Form.Group className="mb-3" style={{marginTop:'30px'}}>
          <Form.Control type="number" placeholder="Enter 4-digit PIN"  value={pin} maxLength={4} onChange={(e) => {const value = e.target.value.slice(0, 4); if (/^\d*$/.test(value)) setPin(value)}} className="p-3 fs-5 text-center" />
        </Form.Group>

        <Button type="submit" className="w-100 p-3" disabled={loading}  variant="primary">
          {loading ? "Verifying..." : "Unlock Journal"}
        </Button>

        <Button variant="secondary" className="mt-4 w-40"onClick={()=>navigate('/journal-change-pwd')}>Change Password</Button>
      </Form>
    </div>
  );
};

export default JournalAccess