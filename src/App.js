import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthcontext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Form from './pages/Form';
import JobDetailsPage from './pages/JobDetailsPage';
import Job from './pages/JobPage';
import EmployerOrUserLogin from './pages/EmployerOrUserLogin';
import EmployerOrUserSign from './pages/EmployerOrUserSign';
import Admin from './pages/Admin';
import AdminUser from './pages/AdminUser';
import AdminJobList from './pages/AdminJobList';
import AdminLogin from './pages/AdminLogin';

import EmployLogin from './pages/EmployerLogin'
import EmploySignup  from './pages/EmployerSignup'
import EmployerJobs from './pages/EmployerJobs'

import MyApplied from './pages/MyApplied'
import MySaved from './pages/MySaved'

import AdminApplication from './pages/AdminApplication'
function App() {
  const { user } = useAuthContext();
  const isUserAdminPage = window.location.pathname === '/Admin';
  const isAdminLoginPage = window.location.pathname === '/AdminLogin';
  return (
    <div className="App">
      <BrowserRouter>
      {!isAdminLoginPage && !isUserAdminPage && <Navbar />}
      
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />


            
            <Route path="/jobs/:id" element={user ? <JobDetailsPage /> : <Navigate to="/" />} />


            <Route path="/jobpage" element={user ? <Job /> : <Navigate to="/" />} />

            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

            <Route path="/EmployerOrUserLogin" element={<EmployerOrUserLogin />} />
            <Route path="/EmployerOrUserSign" element={<EmployerOrUserSign />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/AdminApplication" element={<AdminApplication />} />
            <Route path="/AdminUser" element={<AdminUser />} />
            <Route path="/AdminJobList" element={<AdminJobList />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/employlogin" element={<EmployLogin/>} />
            <Route path="/employsignup" element={<EmploySignup  />} />
            <Route path="/EmployerJobs" element={<EmployerJobs />} />


            <Route path="/MyApplied" element={user ? <MyApplied /> : <Navigate to="/" />} />
            <Route path="/MySaved" element={user ? <MySaved /> : <Navigate to="/" />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
