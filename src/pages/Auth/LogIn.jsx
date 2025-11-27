import { useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

function Login() {
  const {logInUser, googleUser, loading, setLoading}=useAppContext()
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate=useNavigate()

  const handleLogInUser=async(e)=>{
    e.preventDefault()
    const email=emailRef.current.value
    const password=passwordRef.current.value
    if(!email || !password){
      return toast.warn("Please Fill All Fields")
    }
    try{
      setLoading(true)
      await logInUser(email, password)
      toast.success("Logged in successfully")
      navigate('/dashboard')
    }catch(err){
      toast.error(err.message,'Something went wrong')
    }finally{
      setLoading(false)
    }
  }

  const handlegoogleUser=async()=>{
    try{
      await googleUser()
      toast.success("Logged in successful")
      navigate('/dashboard')
    }catch{
      toast.error("Something went wrong")
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', width: '100%', backdropFilter: 'blur(4px)'}}>
      <h1 style={{fontSize: '46px', fontWeight: '500', marginBottom: '5px', color: '#06263A', textShadow: '0px 3px 10px rgba(255,255,255,0.6)', letterSpacing: '1.2px', marginTop:'40px'}}>
        Qu<span className='spnas'>i</span>et Cloud <span className='spnas'>🌥️</span>
      </h1>

      <p style={{ fontSize: '19px', marginBottom: '25px', color:'var(--logo-tagline)', fontWeight: '100'}}>
        Let's Make Each Day Count
      </p>

      <Form style={{width: '90%', maxWidth: '800px', padding: '20px',borderRadius: '8px',boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',textAlign: 'center'}} onSubmit={handleLogInUser}>
        <Form.Text muted style={{ fontSize: '18px' }}>
          Please Login...
        </Form.Text>

        <Form.Group as={Row} className="mb-3 mt-4">
          <Form.Label column xs={12} sm={3} className="p-2">
            Email
          </Form.Label>
          <Col xs={12} sm={9}>
            <Form.Control placeholder="Enter your email" className="p-3" ref={emailRef} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={12} sm={3} className="p-2">
            Password
          </Form.Label>
          <Col xs={12} sm={9}>
            <Form.Control type="password" placeholder="Enter Password" className="p-3" ref={passwordRef} />
          </Col>
        </Form.Group>
        <Button variant="primary" className="mt-3 w-40 btn-login-register" type='submit'>Login</Button>
        <div style={{textAlign:'left'}}>
          <Link to='/register' className='have-dont-acc'>Doesn't have account?</Link>
        </div>
        
        <Button variant="secondary" className="mt-3 w-60 google-user" onClick={handlegoogleUser}>Login With Google?</Button>
      </Form>
    </div>
  );
}

export default Login;
