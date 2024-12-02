import React, { useEffect, useState, useCallback } from 'react';  
import { useParams } from 'react-router-dom';  
import api from '../api/axiosConfig';  
import styles from '../styles/TaskDetail.module.css'; // Import the CSS module  
import { Box, Typography } from '@mui/material';  

const TaskDetail = () => {  
  const { id } = useParams(); // Get the task ID from the URL  
  const [task, setTask] = useState(null); // State to store the task details  

  // Memoize the fetchTaskDetail function to ensure it doesn't change on re-renders  
  const fetchTaskDetail = useCallback(async () => {  
    try {  
      const response = await api.get(`/tasks/${id}/`); // Fetch task details from the API  
      setTask(response.data); // Update the task state with the fetched data  
    } catch (error) {  
      console.error('Failed to fetch task details:', error); // Log any errors  
    }  
  }, [id]); // Dependency array includes `id` because the function depends on it  

  // useEffect to call fetchTaskDetail when the component mounts or `id` changes  
  useEffect(() => {  
    fetchTaskDetail();  
  }, [fetchTaskDetail]); // Dependency array includes the memoized function  

  // Render a loading message if the task is not yet loaded  
  if (!task) {  
    return <Typography className={styles.loading}>Loading task details...</Typography>;  
  }  

  // Render the task details  
  return (  
    <Box className={styles.container}>  
      <Typography variant="h4" className={styles.title}>  
        {task.title}  
      </Typography>  
      <Typography className={styles.description}>{task.description}</Typography>  
      <Typography className={styles.meta}>Due Date: {task.due_date}</Typography>  
      <Typography className={styles.meta}>Priority: {task.priority}</Typography>  
    </Box>  
  );  
};  

export default TaskDetail;  