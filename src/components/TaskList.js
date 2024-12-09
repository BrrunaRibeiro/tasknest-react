import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TaskList.module.css';

const TaskList = ({ tasks, filters, pagination, onFilterChange, onPageChange }) => {
  const navigate = useNavigate();

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <Box className={styles.container}>
      {/* Filter Controls */}
      <Box className={styles.filters}>
        <select
          name="priority"
          onChange={(e) => onFilterChange('priority', e.target.value)}
          value={filters.priority}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="state"
          onChange={(e) => onFilterChange('state', e.target.value)}
          value={filters.state}
        >
          <option value="">All States</option>
          <option value="open">Open</option>
          <option value="completed">Completed</option>
        </select>
      </Box>

      {/* Task List */}
      {tasks.length === 0 ? (
        <Typography className={styles.noTasksMessage}>No tasks available</Typography>
      ) : (
        <List className={styles.taskList}>
          {tasks.map((task) => (
            <ListItem key={task.id} className={styles.taskItem} disablePadding>
              <ListItemButton onClick={() => handleTaskClick(task.id)}>
                <ListItemText primary={task.title} secondary={task.description} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      {/* Pagination Controls */}
      <Box className={styles.pagination}>
        <Button
          disabled={pagination.page === 1}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          Previous
        </Button>
        <Typography variant="body1">
          Page {pagination.page} of {pagination.totalPages}
        </Typography>
        <Button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TaskList;
