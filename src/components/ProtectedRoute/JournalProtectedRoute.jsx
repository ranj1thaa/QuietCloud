import { useAppContext } from '../../context/AuthContext';
import { Button } from 'react-bootstrap';

const JournalProtectedRoute = ({ children }) => {
  const { isJournalUnlocked } = useAppContext();

  if (!isJournalUnlocked) {
    return (
      <div style={{display: 'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center', minHeight: '100vh',  padding: '20px', textAlign: 'center', background: 'var(--color-surface)',color: 'var(--color-text)'}}>
        <h2>🔒 Journal Locked</h2>
        <p>Please unlock your journal to continue.</p>
        <Button variant="primary" onClick={() => (window.location.href = '/journal-access')} style={{marginTop: '20px', padding: '0.6rem 1.6rem', borderRadius: 'var(--radius-pill)', fontWeight: 500}}>
          Unlock Journal
        </Button>
      </div>
    );
  }

  return children;
};

export default JournalProtectedRoute;
