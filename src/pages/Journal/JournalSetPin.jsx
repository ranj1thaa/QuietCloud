import { useState } from "react";
import { useAppContext} from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const JournalSetPin = () => {
  const [pin, setPin] = useState("");
  const { setJournalPassword } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pin.length !== 4) {
      toast.warn("PIN must be 4 digits.");
      return;
    }

    const ok = await setJournalPassword(pin);
    if (!ok) {
      toast.error("Failed to set PIN. Try again.");
      return;
    }

    toast.success("PIN created successfully! Login with password again");
    navigate("/journal-access");
  };

  return (
    <div style={{ display: "flex",justifyContent: "center",alignItems: "center",minHeight: "100vh",}}>
      <Form style={{width: "90%", maxWidth: "700px", minWidth: "280px", padding: "25px", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)"}} onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Set Journal PIN</h3>

        <Form.Group className="mb-3">
          <Form.Control  type="number" placeholder="Create 4-digit PIN" value={pin} onChange={(e) => { const value = e.target.value.slice(0, 4); if (/^\d*$/.test(value)) setPin(value);}} className="p-3 text-center fs-5" />
        </Form.Group>

        <Button type="submit" className="w-100 p-2" variant="success">
          Save PIN
        </Button>
      </Form>
    </div>
  );
};

export default JournalSetPin;
