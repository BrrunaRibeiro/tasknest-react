import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import api from '../api/axiosConfig';  
import styles from '../styles/TaskList.module.css'; // Import the CSS module  
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';  

const TaskList = () => {  
  const [tasks, setTasks] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const navigate = useNavigate();  

  const fetchTasks = async () => {  
    try {  
      setLoading(true);  
      setError(null);  
      const response = await api.get('/tasks/');  
      setTasks(response.data);  
    } catch (err) {  
      console.error('Failed to fetch tasks:', err);  
      setError('Failed to fetch tasks. Please check your connection or try again.');  
    } finally {  
      setLoading(false);  
    }  
  };  

  useEffect(() => {  
    fetchTasks();  
  }, []);  

  if (loading) {  
    return <Typography className={styles.loading}>Loading tasks...</Typography>;  
  }  

  if (error) {  
    return (  
      <Box className={styles.errorContainer}>  
        <Typography className={styles.errorMessage} variant="h6" gutterBottom>  
          {error}  
        </Typography>  
        <Box className={styles.buttonGroup}>  
          <Button variant="contained" color="primary" onClick={fetchTasks}>  
            Try Again  
          </Button>  
          <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>  
            Back to Start  
          </Button>  
        </Box>  
      </Box>  
    );  
  }  

  return (  
    <Box className={styles.container}>  
      <Typography variant="h4" className={styles.title}>  
        Task List  
      </Typography>  
      {tasks.length === 0 ? (  
        <Box className={styles.noTasksContainer}>  
          <Typography className={styles.noTasksMessage}>No tasks available</Typography>  
          <Box className={styles.buttonGroup}>  
            <Button variant="contained" color="primary" onClick={() => navigate('/tasks/create')}>  
              Create a Task  
            </Button>  
            <Button variant="outlined" color="secondary" onClick={() => navigate('/dashboard')}>  
              Go to Dashboard  
            </Button>  
          </Box>  
        </Box>  
      ) : (  
        <List className={styles.taskList}>  
          {tasks.map((task) => (  
            <ListItem key={task.id} className={styles.taskItem}>  
              <ListItemText primary={task.title} secondary={task.description} />  
            </ListItem>  
          ))}  
        </List>  
      )}  
    </Box>  
  );  
};  

export default TaskList;  
