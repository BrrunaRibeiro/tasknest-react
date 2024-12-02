import React, { useState } from 'react';  
import styles from '../styles/TaskCreate.module.css'; // Import the CSS module  
import { Box, Typography, TextField, Button } from '@mui/material';  

const TaskCreate = () => {  
  const [title, setTitle] = useState('');  
  const [description, setDescription] = useState('');  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    console.log('Task Created:', { title, description });  
    // Add API call to create a task  
  };  

  return (  
    <Box className={styles.container}>  
      <Typography variant="h4" className={styles.title}>  
        Create a New Task  
      </Typography>  
      <form onSubmit={handleSubmit} className={styles.form}>  
        <TextField  
          label="Task Title"  
          variant="outlined"  
          fullWidth  
          value={title}  
          onChange={(e) => setTitle(e.target.value)}  
          className={styles.input}  
        />  
        <TextField  
          label="Task Description"  
          variant="outlined"  
          fullWidth  
          multiline  
          rows={4}  
          value={description}  
          onChange={(e) => setDescription(e.target.value)}  
          className={styles.input}  
        />  
        <Button type="submit" variant="contained" color="primary" className={styles.button}>  
          Create Task  
        </Button>  
      </form>  
    </Box>  
  );  
};  

export default TaskCreate;  