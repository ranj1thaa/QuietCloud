import { sendEmailVerification } from "firebase/auth";
import { useAppContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const VerifyEmail = () => {
  const { user, logOutUser, authErrorMessage } = useAppContext();
  const navigate = useNavigate();

  
  const resendVerification = async () => {
    try {
      await sendEmailVerification(user);
      toast.success("Verification email sent again");
    } catch (err) {
      toast.error(authErrorMessage(err.code));
    }
  };

  const refreshUser = async () => {
    try {
      await user.reload();
      toast.success("Email verified successfully");
      navigate("/dashboard");
    } catch {
      toast.warn("Please verify your email first");
    }
  };

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
    <div className="qc-verify-container">
      <div className="qc-verify-card">
        <h2 className="qc-title">Verify your email 🌙</h2>

        <p className="qc-verify-text">
          A verification link has been sent to
        </p>

        <p className="qc-verify-email">{user?.email}</p>

        <div className="qc-verify-actions">
          <button className="qc-btn" onClick={resendVerification}>
            Resend Email
          </button>

          <button className="qc-btn qc-btn-outline" onClick={refreshUser}>
            I’ve Verified
          </button>

          <button
            className="qc-btn qc-btn-danger"
            onClick={handleLogoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
