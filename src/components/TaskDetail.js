import React from 'react';  

const TaskDetail = ({ task }) => {  
  return (  
    <div style={{ marginTop: '50px', textAlign: 'center' }}>  
      <h1>Task Detail</h1>  
      <p>Task Name: {task.name}</p>  
      <p>Task Description: {task.description}</p>  
    </div>  
  );  
};  

export default TaskDetail;  