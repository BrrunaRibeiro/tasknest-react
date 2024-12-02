import React from 'react';  
import { useForm } from 'react-hook-form';  
import { yupResolver } from '@hookform/resolvers/yup';  
import * as yup from 'yup';  
import { useNavigate } from 'react-router-dom';  
import api from '../api/axiosConfig';  
import { TextField, Button, Box, Typography } from '@mui/material';  

const schema = yup.object().shape({  
  username: yup.string().required('Username is required'),  
  password: yup.string().required('Password is required'),  
});  

const Login = () => {  
  const { register, handleSubmit, formState: { errors } } = useForm({  
    resolver: yupResolver(schema),  
  });  
  const navigate = useNavigate();  

  const onSubmit = async (data) => {  
    try {  
      const response = await api.post('/auth/login/', data);  
      localStorage.setItem('token', response.data.token);  
      navigate('/dashboard');  
    } catch (error) {  
      console.error('Login failed:', error);  
    }  
  };  

  return (  
    <Box  
      display="flex"  
      flexDirection="column"  
      alignItems="center"  
      justifyContent="center"  
      minHeight="100vh"  
    >  
      <Typography variant="h4" gutterBottom>  
        Login  
      </Typography>  
      <form onSubmit={handleSubmit(onSubmit)}>  
        <TextField  
          label="Username"  
          {...register('username')}  
          error={!!errors.username}  
          helperText={errors.username?.message}  
          fullWidth  
          margin="normal"  
        />  
        <TextField  
          label="Password"  
          type="password"  
          {...register('password')}  
          error={!!errors.password}  
          helperText={errors.password?.message}  
          fullWidth  
          margin="normal"  
        />  
        <Button type="submit" variant="contained" color="primary" fullWidth>  
          Login  
        </Button>  
      </form>  
    </Box>  
  );  
};  

export default Login;  