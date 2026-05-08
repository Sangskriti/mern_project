import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    
    const res = await axios.post('http://localhost:5000/api/auth/login', form);

    
    if (res.data && res.data.token) {
      console.log("Login Successful, Token received!");
    
      login(res.data.token); 
      
      
      navigate('/');
    } else {
      alert("Unexpected response from server.");
    }

  } catch (err) {
    
    console.error("Login Error:", err);

    if (err.response) {
      
      alert("Login failed: " + (err.response.data.error || "Invalid credentials"));
    } else if (err.request) {
      
      alert("No response from server. Check if Backend is running at port 5000.");
    } else {
      
      alert("An error occurred: " + err.message);
    }
  }
};

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Username" 
            required
            style={{ width: '100%', padding: '8px' }}
            onChange={e => setForm({...form, username: e.target.value})} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password" 
            placeholder="Password" 
            required
            style={{ width: '100%', padding: '8px' }}
            onChange={e => setForm({...form, password: e.target.value})} 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;