import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const res = await axios.post('https://mern-project-q04m.onrender.com/api/auth/register', form);
      
      alert(res.data.message || "Registration Successful!");
      navigate('/login'); 
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Registration failed!";
      alert(errorMsg);
      console.error("Register Error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
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
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none' }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;