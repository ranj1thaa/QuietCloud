import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Signup() {
  const {createNewUserFromEmailAndPassword, googleUser, authErrorMessage} = useAppContext()

  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()
  const confPWDRef = useRef()

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

    .to(".qc-title", {
      opacity: 1.5,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  })

  const handleSignUpUser = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const name = nameRef.current.value
    const password = passwordRef.current.value
    const confPWD = confPWDRef.current.value

    if (!email || !name || !password || !confPWD)
      return toast.warn("Please fill all the fields")

    if (password.length < 6)
      return toast.warn("Password must be at least 6 characters")

    if (password !== confPWD)
      return toast.warn("Passwords do not match")

    try {
      await createNewUserFromEmailAndPassword(email, password, name)
      toast.success("Successfully signed up")
    } catch (err) {
      toast.error(authErrorMessage(err.code))
    }
  }

  const handleGoogleUser = async () => {
    try {
      await googleUser()
      toast.success("Signed up with Google")
    } catch (err) {
      toast.error(authErrorMessage(err.code))
    }
  }

  return (
    <div className="qc-journal-access-container" style={{ minHeight: "100vh", padding: "1rem" }}>
      <div className="qc-journal-access-card" style={{ width: "100%", maxWidth: "420px" }}>
        <h3 className="qc-title">Create your space 🌑</h3>

        <Form onSubmit={handleSignUpUser} className='qc-form"'>
          <Form.Group className="qc-form-group">
            <Form.Label style={{color:"var(--color-text)"}}>Name</Form.Label>
            <Form.Control ref={nameRef} className="qc-input" placeholder="Your name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{color:"var(--color-text)"}}>Email</Form.Label>
            <Form.Control ref={emailRef} type="email" className="qc-input" placeholder="you@example.com"/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{color:"var(--color-text)"}}>Password</Form.Label>
            <Form.Control ref={passwordRef} type="password" className="qc-input" placeholder="••••••••"/>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{color:"var(--color-text)"}}>Confirm Password</Form.Label>
            <Form.Control ref={confPWDRef} type="password" className="qc-input" placeholder="••••••••"/>
          </Form.Group>

          <Button type="submit" className="qc-btn w-100 mt-2"  variant='success'>
            Sign Up
          </Button>

          <div className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
            <Link to="/">Already have an account?</Link>
          </div>
        </Form>

        <Button
          type="button"
          variant="secondary"
          className="qc-btn-secondary w-100 mt-3"
          onClick={handleGoogleUser}
        >
          Sign up with Google
        </Button>
      </div>
    </div>
  )
}

export default Signup
