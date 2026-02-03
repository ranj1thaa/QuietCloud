import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppContext } from "../../context/AuthContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const JournalPinSet = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const { setJournalPassword, logOutUser, authErrorMessage } = useAppContext();

  useGSAP(()=>{
    const tl = gsap.timeline();
    gsap.from(".qc-journal-access-card",{
      x:-120,
      opacity:0,
      duration: 1.5,
      ease: "power2.out"
    })
    tl.from(".qc-title", {
      x: -120,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    })

    tl.to(".qc-title", {
      opacity: 0,
      duration: 0.6,
      repeat: 1,
      yoyo: true,
      ease: "power1.inOut",
    });

    tl.to(".qc-btn",{
      opacity:0,
      repeat:1,
      yoyo:true
    })
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pin.length < 4) {
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

  const handleLogOut = async () => {
    try {
      await logOutUser();
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      toast.error(authErrorMessage(err.code));
    }
  };

  return (
    <div className="qc-journal-access-container">
      <Form className="qc-card qc-journal-access-card" onSubmit={handleSubmit}>
        <h3 className="qc-title text-center mb-4">Set Journal PIN</h3>

        <Form.Group className="mb-3 mt-3">
          <Form.Control type="number" placeholder="Create 4-digit PIN" value={pin}
            onChange={(e) => {
              const value = e.target.value.slice(0, 4);
              if (/^\d*$/.test(value)) setPin(value);
            }}
            className="qc-input p-3 text-center fs-5"
          />
        </Form.Group>

        <Button type="submit" className="qc-btn w-100 p-3 mb-2">
          Save PIN
        </Button>

        <Button className="qc-btn qc-btn-small w-100 btn-j" onClick={handleLogOut}>
          LogOut
        </Button>
      </Form>
    </div>
  );
};

export default JournalPinSet;
