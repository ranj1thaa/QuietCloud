import { Spinner } from 'react-bootstrap'
import { useAppContext } from '../../context/AppContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const {user, loading}= useAppContext()
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return user ? children : <Navigate to='/login' replace/>
}

export default ProtectedRoute
