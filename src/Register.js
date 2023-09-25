import { useState } from 'react';
import React from 'react';
import { auth, createUserWithEmailAndPassword } from './firebaseConfig';
import { saveUserDataToDatabase } from './firebaseDatabase.js'; 

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await saveUserDataToDatabase(user.uid, {
              email: email,
              password: password,
              balance: 0 // Initial balance 0
            });

            console.log('User registered successfully:', user);
            alert(`User registered successfully: ${user.email}`);
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email address:</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)
                     } />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)
                     } />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </>
    )
}

export default Register;
