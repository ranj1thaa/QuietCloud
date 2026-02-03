import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppContext } from '../../context/AuthContext'
import { Button } from 'react-bootstrap'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { loginUserFromEmailAndPassword, googleUser, resetPassword, authErrorMessage } = useAppContext()

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

  const handleLoginUser = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (!email || !password) return toast.warn("Please fill all fields")

    try {
      await loginUserFromEmailAndPassword(email, password)
      toast.success("Successfully logged in")
    } catch (err) {
      toast.error(authErrorMessage(err.code))
    }
  }

  const handleGoogleUser = async () => {
    try {
      await googleUser()
      toast.success("Logged in successfully")
    } catch (err) {
      toast.error(authErrorMessage(err.code))
    }
  }

  const handleForgotPassword = async () => {
    const email = emailRef.current.value
    if (!email) return toast.warn("Enter email first")

    try {
      await resetPassword(email)
      toast.success("Password reset email sent")
    } catch (err) {
      toast.error(authErrorMessage(err.code))
    }
  }

  return (
    <div className="qc-journal-access-container">
      <div className="qc-journal-access-card">
        <h3 className="qc-title">Welcome back 🌙</h3>

        <form onSubmit={handleLoginUser} className="qc-form">
          <div className="qc-form-group">
            <label htmlFor="email" style={{color:"var(--color-text)"}}>Email</label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              placeholder="you@example.com"
              className="qc-input"
            />
          </div>

          <div className="qc-form-group">
            <label htmlFor="password" style={{color:"var(--color-text)"}}>Password</label>
            <input
              id="password"
              ref={passwordRef}
              type="password"
              placeholder="••••••••"
              className="qc-input"
            />
          </div>

          <Button type="submit" className="qc-btn w-100 mt-2" variant='success'>
            Login
          </Button>

          <div className="qc-footer-links d-flex justify-content-between mt-2">
            <Link to="/signup" className="qc-link">Create account</Link>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="qc-link"
              style={{ color: "var(--color-red)" }}
            >
              Forgot?
            </button>
          </div>

          <Button
            type="button"
            className="qc-btn-secondary w-100 mt-3"
            onClick={handleGoogleUser}
            variant="secondary"
          >
            Login with Google
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
