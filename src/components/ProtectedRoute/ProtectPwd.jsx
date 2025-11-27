import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const ProtectPwd = ({ children }) => {
  const { journalUnlocked, loading } = useAppContext();

  if (loading) return null; 

  if (!journalUnlocked) {
    return <Navigate to="/journal-access" replace />;
  }

  return children;
};
export default ProtectPwd