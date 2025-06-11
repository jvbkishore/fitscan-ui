import { useState, useEffect } from 'react';
import './App.css';
import AuthModal from './components/AuthModal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute';
import GymOwnerDashboard from './pages/GymOwnerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import { Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
    
  
    
   

  
return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
         <Route path="/edashboard" element={<EmployeeDashboard />} />
        <Route path="/auth" element={<AuthModal />} />
        <Route path="/Odashboard" element={
                // <ProtectedRoute allowedRoles={['owner']}>
                  <GymOwnerDashboard />
                // </ProtectedRoute>
            } />
      </Routes>
    </Router>
  );

  
}

export default App;