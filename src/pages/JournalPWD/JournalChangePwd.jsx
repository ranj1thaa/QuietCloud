import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppContext } from "../../context/AuthContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const JournalChangePwd = () => {
  const [pinOld, setPinOld] = useState("");
  const [pinNew, setPinNew] = useState("");
  const [pinConf, setPinConf] = useState("");
  const { changeJournalPassword, logOutUser, authErrorMessage } = useAppContext();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!pinNew || !pinOld) return toast.warn("Please fill all fields");
      if (pinNew.length < 4 || pinOld.length < 4)
        return toast.warn("PIN must be 4 digits");
      if (pinNew !== pinConf) return toast.warn("New PINs do not match");

      const { ok, reason } = await changeJournalPassword(pinOld, pinNew);
      if (ok) {
        toast.success("PIN changed");
        navigate("/journal-access");
      } else {
        if (reason === "INVALID") toast.error("Old PIN incorrect");
        else toast.error("Failed to change PIN");
      }
    } catch (err) {
      toast.error("Something went wrong");
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
        <h3 className="qc-title text-center mb-4">Change Journal PIN</h3>

        <Form.Group className="mb-3 mt-3">
          <Form.Control type="number" placeholder="Enter Your Old PIN" value={pinOld}
            onChange={(e) => {
              const value = e.target.value.slice(0, 4);
              if (/^\d*$/.test(value)) setPinOld(value);
            }}
            className="qc-input p-3 text-center fs-5"
          />
        </Form.Group>

        <div className="d-flex gap-2 mb-3 flex-column flex-md-row">
          <Form.Group style={{ flex: 1 }}>
            <Form.Control type="number"  placeholder="New PIN"  value={pinNew}
              onChange={(e) => {
                const value = e.target.value.slice(0, 4);
                if (/^\d*$/.test(value)) setPinNew(value);
              }}
              className="qc-input p-3 text-center fs-5"
            />
          </Form.Group>

          <Form.Group style={{ flex: 1 }}>
            <Form.Control type="number"  placeholder="Confirm PIN" value={pinConf}
              onChange={(e) => {
                const value = e.target.value.slice(0, 4);
                if (/^\d*$/.test(value)) setPinConf(value);
              }}
              className="qc-input p-3 text-center fs-5"
            />
          </Form.Group>
        </div>

        <Button type="submit" className="qc-btn w-100 p-3 mb-2">
          Change PIN
        </Button>

        <div className="d-flex gap-2 flex-wrap justify-content-between mt-3">
          <Button className="qc-btn qc-btn-small w-100 w-md-45 btn-j1"  variant="info" onClick={() => navigate("/journal-access")}>
            Go Back
          </Button>
          <Button className="qc-btn qc-btn-small w-100 w-md-45 btn-j" variant="warning" onClick={handleLogOut}>
            Logout
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JournalChangePwd;
