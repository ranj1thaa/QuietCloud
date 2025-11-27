import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import LogIn from './pages/Auth/LogIn';
import Register from './pages/Auth/Register';
import Dashboard from './components/DashBoard/Dashboard';
import JournalAccess from './pages/Journal/JournalAccess'
import JournalMain from './pages/Journal/JournalMain'
import JournalCreate from './pages/Journal/JournalCreate'
import { useAppContext } from './context/AppContext';
import Header from './components/Navbar/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Publicroute from './components/PublicRoute/Publicroute';
import JournalSetPin from './pages/Journal/JournalSetPin';
import { ToastContainer } from 'react-toastify';
import JournalChangePwd from './pages/Journal/JournalChangePwd';
import ProtectPwd from './components/ProtectedRoute/ProtectPwd';
import JournalEdit from './pages/Journal/JournalEdit';
import JournalOpen from './pages/Journal/JournalOpen';
import JournalMessagecreate from './pages/Journal/JournalMessagecreate';
import BlogCreate from './components/DashBoard/BlogCreate';
import PublicJournalsOpen from './components/DashBoard/PublicJournalsOpen';
import BlogOpen from './components/DashBoard/BlogOpen';

const App = () => {
  const {user}=useAppContext()
  return (
    <div className='container_div'>
      <BrowserRouter>
      {user&&<Header/>}
        <Routes>
          <Route path='/' element={<Publicroute><LogIn/></Publicroute>}/>
          <Route path='/register' element={<Publicroute><Register/></Publicroute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path='/journal-access' element={<ProtectedRoute><JournalAccess/></ProtectedRoute>}/>
          <Route path='/journal-main' element={<ProtectedRoute><ProtectPwd><JournalMain/></ProtectPwd></ProtectedRoute>}/>
          <Route path='/journal-create' element={<ProtectedRoute><ProtectPwd><JournalCreate/></ProtectPwd></ProtectedRoute>}/>
          <Route path='/journal-set-pin' element={<ProtectedRoute><JournalSetPin/></ProtectedRoute>}/>
          <Route path='/journal-change-pwd' element={<ProtectedRoute><JournalChangePwd/></ProtectedRoute>}/>
          <Route path='/journal-edit/:id' element={<ProtectedRoute><ProtectPwd><JournalEdit/></ProtectPwd></ProtectedRoute>}/>
          <Route path='/journal-open/:id' element={<ProtectedRoute><JournalOpen/></ProtectedRoute>}/>
          <Route path='/journal-message-create' element={<ProtectedRoute><ProtectPwd><JournalMessagecreate/></ProtectPwd></ProtectedRoute>}/>
          <Route path='/blogs-create' element={<ProtectedRoute><BlogCreate/></ProtectedRoute>}/>
          <Route path='/journal-public-open/:id' element={<ProtectedRoute><PublicJournalsOpen/></ProtectedRoute>}/>
          <Route path='/blog-open/:id' element={<ProtectedRoute><BlogOpen/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}
export default App
