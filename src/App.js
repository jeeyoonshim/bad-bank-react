import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from './firebaseConfig';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Balance from './Balance';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import NavBarLoggedIn from './NavBarLoggedIn';
import NavBarLoggedOut from './NavBarLoggedOut';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        console.log(`Current logged in user: ${user.email}`) // check who is logged in
      } else {
        setUser(null);
        console.log(`Current logged in user: null`)
      }
    });
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null); 
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div>
      {user ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
      <Router>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/Register/" element={<Register />} />
              <Route path="/Logout/" element={<Logout onLogout={handleLogout} />} />
              <Route path="/Balance/" element={<Balance uid={user.uid} />} />
              <Route path="/Deposit/" element={<Deposit uid={user.uid} />} />
              <Route path="/Withdraw/" element={<Withdraw uid={user.uid} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/Register/" element={<Register />} />
              <Route path="/Login/" element={<Login />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
