import { useAppContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const { user, authLoading } = useAppContext()

  if (authLoading) {
    return (
      <div className="public-route-loader">
        <div className="public-route-spinner-wrapper">
          <div className="public-route-spinner" />
          <p className="public-route-text">Entering Quietly…</p>
        </div>
      </div>
    )
  }

  return user ? <Navigate to="/dashboard" replace /> : children
}

export default PublicRoute
