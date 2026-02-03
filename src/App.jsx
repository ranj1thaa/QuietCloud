import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Signup from './pages/Auth/Signup';
import PublicRoute from './components/PublicRoute/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify'
import VerifyEmail from './pages/Auth/VerifyEmail';
import JournalAccess from './pages/JournalPWD/JournalAccess';
import JournalChangePwd from './pages/JournalPWD/JournalChangePwd';
import JournalPinSet from './pages/JournalPWD/JournalPinSet';
import AppShell from './components/Layouts/AppShell';
import Home from './pages/Home';
import JournalMain from './pages/Journal/JournalMain';
import VisionBoard from './pages/VisionBoard/VisionBoard';
import JournalEntry from './pages/Journal/JournalEntry';
import JournalProtectedRoute from './components/ProtectedRoute/JournalProtectedRoute';
import JournalEditor from './pages/Journal/JournalEditor';
import JournalRead from './pages/Journal/JournalRead';
import VisionEntry from './pages/VisionBoard/VisionEntry';
import VisionEdit from './pages/VisionBoard/VisionEdit';
import VisionRead from './pages/VisionBoard/VisionRead';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



function App() {

  return (
    <div className='cont-main'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><AppShell><Dashboard/></AppShell></ProtectedRoute>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
          <Route path='/journal-access' element={<ProtectedRoute><JournalAccess/></ProtectedRoute>}/>
          <Route path='/journal-change-pwd' element={<ProtectedRoute><JournalChangePwd/></ProtectedRoute>}/>
          <Route path='/journal-set-pin' element={<ProtectedRoute><JournalPinSet/></ProtectedRoute>}/>
          <Route path='/home' element={<ProtectedRoute><AppShell><JournalProtectedRoute><Home /></JournalProtectedRoute></AppShell></ProtectedRoute>} />
          <Route path='/journal-main' element={<ProtectedRoute><AppShell><JournalProtectedRoute><JournalMain/></JournalProtectedRoute></AppShell></ProtectedRoute>}/>
          <Route path='/journal-new-entry' element={<ProtectedRoute><AppShell><JournalProtectedRoute><JournalEntry/></JournalProtectedRoute></AppShell></ProtectedRoute>}/>
          <Route path='/journal-editor/:id' element={<ProtectedRoute><AppShell><JournalProtectedRoute><JournalEditor/></JournalProtectedRoute></AppShell></ProtectedRoute>}/>
          <Route path='/journal-readOnly/:id' element={<ProtectedRoute><AppShell><JournalRead/></AppShell></ProtectedRoute>}/>

          <Route path='/vision-board' element={<ProtectedRoute><AppShell><JournalProtectedRoute><VisionBoard/></JournalProtectedRoute></AppShell></ProtectedRoute>}/>
          <Route path='/visionboard/new' element={<ProtectedRoute><AppShell><JournalProtectedRoute><VisionEntry/></JournalProtectedRoute></AppShell></ProtectedRoute>}/>
          <Route path='/visionboard/:id' element={<ProtectedRoute><AppShell><JournalProtectedRoute><VisionEdit/></JournalProtectedRoute></AppShell></ProtectedRoute>}/>
          <Route path='/vision-board/:id' element={<ProtectedRoute><AppShell><JournalProtectedRoute><VisionRead/></JournalProtectedRoute></AppShell></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}

export default App
