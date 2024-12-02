import React, { useState } from 'react';  

const Register = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  

  const handleRegister = (e) => {  
    e.preventDefault();  

    // Simulate registration logic  
    alert(`User registered: ${username}`);  
  };  

  return (  
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>  
      <h1>Register</h1>  
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>  
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
          Register  
        </button>  
      </form>  
    </div>  
  );  
};  

export default Register;  