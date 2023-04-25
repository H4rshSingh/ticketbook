import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from './Component/Alert';
import Login from './Component/Login';
import Navbar from "./Component/Navbar";
import Signup from './Component/Signup';
import LoadingBar from 'react-top-loading-bar'
import BookTicket from './Component/BookTicket';
import Home from './Component/Home';
import Tickets from './Component/Tickets';
import AdminLogin from './Component/admin/AdminLogin';
import AdminTicket from './Component/admin/AdminTicket';
import AdminUser from './Component/admin/AdminUser';
import AdminPanel from './Component/admin/AdminPanel';


function App() {
  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)
  const [progress, setProgress] = useState(0)

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    }
    else {
      setMode('light');
    }
  }

  const showAlert = (message, bgColor, textColor, msgType) => {
    setAlert({
      msg: message,
      bgColor: bgColor,
      textColor: textColor,
      msgType: msgType

    })
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }
  return (
    <div>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <LoadingBar height={3} color='#f11946' progress={progress}/>
          <div className={`${mode === 'dark' ? 'bg-[#15202B] border-b border-gray-600' : 'bg-[#F9F9F9]'} min-h-screen pt-12 md:pt-16 pb-6`}>
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Home setProgress={setProgress}  showAlert={showAlert} mode={mode}/>} />
              <Route exact path="/login" element={<Login mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
              <Route exact path="/bookticket" element={<BookTicket mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
              <Route exact path="/myticket" element={<Tickets mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup mode={mode} setProgress={setProgress} showAlert={showAlert} />} />

              {/* admin */}
              <Route exact path="/adminlogin" element={<AdminLogin setProgress={setProgress} mode={mode} showAlert={showAlert} />} />
              <Route exact path="/adminuser" element={<AdminUser setProgress={setProgress}mode={mode} showAlert={showAlert} />} />
              <Route exact path="/adminticket" element={<AdminTicket setProgress={setProgress} mode={mode} showAlert={showAlert} />} />
              <Route exact path="/adminpanel" element={<AdminPanel setProgress={setProgress} mode={mode} showAlert={showAlert} />} />
              <Route path="*" element={<h1 className="text-center text-2xl font-bold text-red-500">404 Not Found</h1>} />
            </Routes>
          </div>

        </Router>
    </div>
  );
}

export default App;
