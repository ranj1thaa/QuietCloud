import React, { useState } from "react";
import { useAppContext } from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const JournalAccess = () => {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  
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
  
  const { authLoading, verifyJournalPassword, setIsJournalUnlocked, setAuthLoading, logOutUser, authErrorMessage,} = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pin.length < 4) {
      toast.warn("PIN must be 4 digits");
      return;
    }

    setAuthLoading(true);

    const isValid = await verifyJournalPassword(pin);
    setAuthLoading(false);

    if (isValid === "NO_PASSWORD") {
      toast.info("No PIN set. Please create one.");
      navigate("/journal-set-pin");
      return;
    }

    if (isValid === "OK") {
      setIsJournalUnlocked(true);
      navigate("/home");
      return;
    }

    if (isValid === "INVALID") {
      toast.error("Incorrect PIN");
      return;
    }
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
        <h3 className="qc-title text-center mb-4">Enter Journal PIN</h3>

        <Form.Group className="mb-3 mt-3">
          <Form.Control type="password" placeholder="Enter 4-digit PIN" value={pin} maxLength={4} className="qc-input p-3 fs-5 text-center"
            onChange={(e) => {
              const value = e.target.value.slice(0, 4);
              if (/^\d*$/.test(value)) setPin(value);
            }}
          />
        </Form.Group>

        <Button type="submit" className="qc-btn w-100 p-3" disabled={authLoading}>
          {authLoading ? "Verifying..." : "Unlock Journal"}
        </Button>

        <div className="qc-journal-access-btns">
          <Button className="qc-btn qc-btn-small btn-j2" onClick={() => navigate("/journal-change-pwd")}>
            Change Password
          </Button>
          <Button  className="qc-btn qc-btn-small btn-j" onClick={handleLogOut}>
            Logout
          </Button>
          <Button className="qc-btn qc-btn-small btn-j1" onClick={() => navigate("/dashboard")}>
            Go To Home
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JournalAccess;
