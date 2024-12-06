import React, { useEffect, useState } from 'react';  
import api from '../api/axiosConfig';  
import styles from '../styles/Dashboard.module.css';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';  

const Dashboard = () => {  
  const [tasks, setTasks] = useState([]);  

  const fetchTasks = async () => {  
    try {  
      const response = await api.get('/tasks/');
      console.log("Fetched tasks:", response.data);  // Log the response data to check the structure

      if (Array.isArray(response.data)) {
        setTasks(response.data);  // Only set if it's an array
      } else {
        console.error('Expected an array of tasks, but got:', response.data);
      }
    } catch (error) {  
      console.error('Failed to fetch tasks:', error);  
    }  
  };  

  useEffect(() => {  
    fetchTasks();  
  }, []);  

  return (  
    <Box className={styles.container}>  
      <Typography variant="h4" className={styles.title}>  
        Task Dashboard  
      </Typography>  
      {tasks.length === 0 ? (  
        <Typography className={styles.noTasksMessage}>  
          No tasks available. Start by creating a new task!  
        </Typography>  
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

export default Dashboard;
