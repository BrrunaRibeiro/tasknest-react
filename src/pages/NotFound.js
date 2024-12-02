import React from 'react';  
import { useNavigate } from 'react-router-dom';  

const NotFound = () => {  
  const navigate = useNavigate();  

  return (  
    <div style={{ textAlign: 'center', marginTop: '50px' }}>  
      <h1>404 - Page Not Found</h1>  
      <button  
        onClick={() => navigate('/')}  
        style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}  
      >  
        Go to Login  
      </button>  
    </div>  
  );  
};  

export default NotFound;  