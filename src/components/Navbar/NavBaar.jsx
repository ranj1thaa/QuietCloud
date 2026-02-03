import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function NavBaar() {
  const { user, logOutUser, authErrorMessage } = useAppContext();
  const navigate = useNavigate();

  const [quietText, setQuietText] = useState("Welcome to your mind space");

  useGSAP(()=>{
    const tl=gsap.timeline()
    gsap.from(".qc-navbar-inner", {
      x:-20,
      y:-120,
      opacity:0,
      ease:"power1.in",
      duration:0.9,
      stagger:true
    })

    tl.to(".joun", {
      textShadow: "0px 0px 6px rgba(155,205,125,2)",
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
        
    tl.to(".qc-username",{
      y: [-6, 4, -4, 6],
      x: [-10, 4, -4, -10],
      duration: 1,
      stagger: 0.08,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      color:"#3b82f6"
    })
  })

  useEffect(() => {
    const msg = [
      "Reflect, don't scroll",
      "Depth over noise",
      "Welcome to your mind space",
      "Your thoughts are sacred",
    ];
    let i = 0;

    const interval = setInterval(() => {
      setQuietText(msg[i]);
      i = (i + 1) % msg.length;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogoutUser = async () => {
    try {
      await logOutUser();
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      toast.error(authErrorMessage(err.code));
    }
  };

  return (
    <Navbar expand="lg" className="qc-navbar" fixed="top">
      <Container className="qc-navbar-inner">
        <Navbar.Brand as={Link} to="/dashboard" className="qc-brand">
          <Image src="/logo.jpg" alt="QuietCloud" width={42}  height={42} roundedCircle/>
        </Navbar.Brand>


        <Navbar.Toggle aria-controls="qc-nav" />

        <Navbar.Collapse id="qc-nav">
        <div className="qc-quiet-text d-none d-md-block">
          {quietText}
        </div>
          <Nav className="ms-auto align-items-lg-center gap-3 qc-nav-links">
            <span className="qc-username">{user?.displayName}</span>

            <Nav.Link as={Link} to="/dashboard">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/journal-access" className="joun">
              Journal
            </Nav.Link>

            <Button className="qc-btn qc-logout" onClick={handleLogoutUser}>
              Log out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBaar;
