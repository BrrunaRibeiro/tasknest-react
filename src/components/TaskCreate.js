import React, { useState } from 'react';  

const TaskCreate = () => {  
  const [task, setTask] = useState('');  

  const handleCreateTask = (e) => {  
    e.preventDefault();  

    // Simulate task creation logic  
    alert(`Task created: ${task}`);  
    setTask('');  
  };  

  return (  
    <div style={{ marginTop: '50px', textAlign: 'center' }}>  
      <h1>Create Task</h1>  
      <form onSubmit={handleCreateTask}>  
        <input  
          type="text"  
          placeholder="Task Name"  
          value={task}  
          onChange={(e) => setTask(e.target.value)}  
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}  
        />  
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>  
          Create  
        </button>  
      </form>  
    </div>  
  );  
};  

export default TaskCreate;  