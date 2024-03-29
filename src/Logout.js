import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('button pressed')
      console.log('signing out...');
      onLogout(); 
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="container mt-4 mb-4">
    <button className="btn btn-primary" onClick={handleLogout}>
      Logout
    </button>
    </div>
  );
}

export default Logout;
