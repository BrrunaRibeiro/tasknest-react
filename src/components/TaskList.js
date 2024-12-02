import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import api from '../api/axiosConfig';  
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';  

const TaskList = () => {  
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array  
  const [loading, setLoading] = useState(true); // Add a loading state  
  const [error, setError] = useState(null); // Add an error state  
  const navigate = useNavigate(); // For navigation  

  const fetchTasks = async () => {  
    try {  
      const response = await api.get('/tasks/'); // Fetch tasks from the API  
      setTasks(response.data); // Set the tasks state with the fetched data  
    } catch (err) {  
      console.error('Failed to fetch tasks:', err);  
      setError('Failed to fetch tasks'); // Set an error message  
    } finally {  
      setLoading(false); // Stop the loading spinner  
    }  
  };  

  useEffect(() => {  
    fetchTasks(); // Fetch tasks when the component mounts  
  }, []);  

  if (loading) {  
    return <Typography>Loading tasks...</Typography>; // Show a loading message while fetching  
  }  

  if (error) {  
    return <Typography color="error">{error}</Typography>; // Show an error message if fetching fails  
  }  

  return (  
    <Box padding={4}>  
      <Typography variant="h4" gutterBottom>  
        Task List  
      </Typography>  
      {tasks.length === 0 ? ( // Check if there are no tasks  
        <Box>  
          <Typography>No tasks available</Typography>  
          <Box marginTop={2}>  
            {/* Options for the user */}  
            <Button  
              variant="contained"  
              color="primary"  
              onClick={() => navigate('/tasks/create')} // Navigate to the TaskCreate page  
              style={{ marginRight: '10px' }}  
            >  
              Create a Task  
            </Button>  
            <Button  
              variant="outlined"  
              color="secondary"  
              onClick={() => navigate('/dashboard')} // Navigate back to the Dashboard  
            >  
              Go to Dashboard  
            </Button>  
          </Box>  
        </Box>  
      ) : (  
        <List>  
          {tasks.map((task) => (  
            <ListItem key={task.id}>  
              <ListItemText primary={task.title} secondary={task.description} />  
            </ListItem>  
          ))}  
        </List>  
      )}  
    </Box>  
  );  
};  

export default TaskList;  