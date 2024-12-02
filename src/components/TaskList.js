import React from 'react';  

const TaskList = ({ tasks }) => {  
  return (  
    <div style={{ marginTop: '50px', textAlign: 'center' }}>  
      <h1>Task List</h1>  
      <ul>  
        {tasks.map((task, index) => (  
          <li key={index}>{task.name}</li>  
        ))}  
      </ul>  
    </div>  
  );  
};  

export default TaskList;  