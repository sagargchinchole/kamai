import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import JobPostPage from './pages/JobPostPage';
import JobListings from './components/JobListings';
import JobDetail from './components/JobDetail';
import AdminDashboard from './components/AdminDashboard';
import OrderList from './components/OrderList';
import Logout from './components/Logout';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<JobListings />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />  {/* Add route for register page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post-job" element={<JobPostPage />} /> {/* Add route for JobPostPage */}
        <Route path="/jobs" element={<JobListings />} /> {/* Add route for JobPostPage */}
        <Route path="/admin" element={<AdminDashboard />} /> {/* Add route for JobPostPage */}
        <Route path="/jobs/:jobId" element={<JobDetail />} />
        <Route path="/orders" element={<OrderList/>}/>
        <Route path="/orders/:id" element={<OrderPage/>}/>
        <Route path="/logout" element={<Logout/>}/>
        
      </Routes>
      
      </div>
    </Router>
  );
}

export default App;
