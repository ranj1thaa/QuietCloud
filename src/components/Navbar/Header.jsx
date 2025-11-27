import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { TypeAnimation } from 'react-type-animation';
import { CiCirclePlus } from "react-icons/ci";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Header() {
  const { logOut } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  useGSAP(()=>{
    let tl=gsap.timeline()
    tl.from('.head-logo',{
      y:'-80px',
      duration:0.6,
    })
    tl.from('.typed-one',{
      y:'-80px',
      duration:0.6,
    })
    tl.from('.nav-r',{
      y:'-80px',
      duration:0.4,
    })
    tl.from('.log-r',{
      y:'-80px',
      duration:0.4,
    })
  })
  const handleLogOut = async () => {
    await logOut();
    toast.success('Logout Successful');
    navigate('/login');
  };

  const journalLock=location.pathname==='/journal-main' || location.pathname ==='/journal-create'
  const journalMain = location.pathname === '/journal-main'

  return (
    <Navbar expand="lg" style={{width:'100%'}} className="bg-body-tertiary py-3 fixed-top navbar-custom" >
      <Container className="d-flex justify-content-between align-items-center head-all" >
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center me-lg-4 gap-x-30">
          <Navbar.Brand as={Link} to="/dashboard" className="fw-bold fs-5 me-lg-3 font-stretch-180 head-logo">
            Qu<span className='spnas'>i</span>et Cloud <span className='spnas'>🌥️</span>
          </Navbar.Brand>
          <div className="mt-1 mt-lg-0 font-stretch-140% typed-one">
            <TypeAnimation
              sequence={[
                "Your Quiet Space in a Noisy World", 1500,
                "Your Mental Space, Digitally Safe", 1500,
                "You Matter", 1500,
                "Where Your Thoughts Find Home", 1500,
                "Your Mind. Your Journal. Your Journey.", 1500,
                "Turn Thoughts into Clarity", 1500,
                "Your Voice Matters", 1500
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{
                fontSize: '14px',
                color: 'var(--logo-accent)',
                fontWeight: 600,
                whiteSpace: 'normal',
                display: 'block'
              }}
            />
          </div>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center ">
            <Nav.Link as={Link} to="/dashboard" className="mb-2 mb-lg-0 me-lg-2 text-base nav-r">
              Home
            </Nav.Link>

            {!journalMain && (
              <Nav.Link as={Link} to="/journal-access" className="mb-2 mb-lg-0 me-lg-4 nav-r" style={{ whiteSpace: 'nowrap' }}>
                Your Journal
              </Nav.Link>
            )}

            {journalMain && (
              <Nav.Link as={Link} to="/journal-create" className="mb-2 mb-lg-0 me-lg-2 plus-icon">
                <CiCirclePlus size={30} />
              </Nav.Link>
            )}
            {journalLock && (
              <Button variant="outline-danger" onClick={()=>navigate('/journal-access')} className="w-100 w-lg-auto mt-2 mt-lg-1" style={{marginRight:'20px'}}>
                LOCK
              </Button> 
            )}

            <Button
              variant="outline-danger"
              onClick={handleLogOut}
              className="w-100 w-lg-auto mt-2 mt-lg-0 log-r"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
