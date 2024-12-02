import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';  

const Login = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();  

  const handleLogin = (e) => {  
    e.preventDefault();  

    // Simulate login logic  
    if (username === 'admin' && password === 'password') {  
      localStorage.setItem('token', 'dummy-token'); // Save a dummy token  
      navigate('/dashboard'); // Redirect to the dashboard  
    } else {  
      alert('Invalid username or password');  
    }  
  };  

  return (  
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>  
      <h1>Login</h1>  
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>  
        <input  
          type="text"  
          placeholder="Username"  
          value={username}  
          onChange={(e) => setUsername(e.target.value)}  
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}  
        />  
        <input  
          type="password"  
          placeholder="Password"  
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}  
        />  
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>  
          Login  
        </button>  
      </form>  
    </div>  
  );  
};  

export default Login;  