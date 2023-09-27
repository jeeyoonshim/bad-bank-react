import React from 'react'
import { useState } from 'react';
import { auth, signInWithEmailAndPassword } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Logged in user:', user.email);
            console.log(JSON.stringify(user))
            alert(`Logged in user: ${user.email}`);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.message);
            setEmail('');
        }
    };

    return (
      <div className="container mt-4 mb-4">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label>Email address:</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value
                  )} />
              </div>
              <div className="form-group">
                  <label>Password:</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value
                  )} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    )
}


export default Login