import { useAppContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAppContext()

  if (authLoading) {
    return (
      <div className="qc-protected-loader">
        <div className="qc-protected-loader-inner">
          <div className="qc-protected-spinner" />
          <p className="qc-protected-text">
            Holding Your Space…
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children
}

export default ProtectedRoute
