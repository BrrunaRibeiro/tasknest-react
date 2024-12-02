import React, { useEffect, useState } from 'react';  
import api from '../api/axiosConfig';  
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';  

const Dashboard = () => {  
  const [tasks, setTasks] = useState([]);  

  const fetchTasks = async () => {  
    try {  
      const response = await api.get('/tasks/');  
      setTasks(response.data);  
    } catch (error) {  
      console.error('Failed to fetch tasks:', error);  
    }  
  };  

  useEffect(() => {  
    fetchTasks();  
  }, []);  

  return (  
    <Box padding={4}>  
      <Typography variant="h4" gutterBottom>  
        Task Dashboards  
      </Typography>  
      <List>  
        {tasks.map((task) => (  
          <ListItem key={task.id}>  
            <ListItemText primary={task.title} secondary={task.description} />  
          </ListItem>  
        ))}  
      </List>  
    </Box>  
  );  
};  

export default Dashboard;  
