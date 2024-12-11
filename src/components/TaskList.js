import React, { useRef } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button,
  ListItemButton, FormControl, InputLabel, MenuItem, Select, Slide,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TaskList.module.css';

const TaskList = ({ tasks, filters, pagination, onFilterChange, onPageChange }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <Box className={styles.container}>
      {/* Filter Controls */}
      <Box className={styles.filters}>
        <FormControl variant="outlined" size="small" className={styles.filterControl}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filters.priority}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            label="Priority"
          >
            <MenuItem value="">All Priorities</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" className={styles.filterControl}>
          <InputLabel>State</InputLabel>
          <Select
            value={filters.state}
            onChange={(e) => onFilterChange('state', e.target.value)}
            label="State"
          >
            <MenuItem value="">All States</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Task List */}
      <Box ref={containerRef} sx={{ p: 2, height: '400px', overflow: 'hidden' }}>
        {tasks.length === 0 ? (
          <Typography className={styles.noTasksMessage}>No tasks available</Typography>
        ) : (
          <List className={styles.taskList}>
            {tasks.map((task) => (
              <Slide key={task.id} in={true} container={containerRef.current}>
                <ListItem className={styles.taskItem} disablePadding>
                  <ListItemButton onClick={() => handleTaskClick(task.id)}>
                    <ListItemText primary={task.title} secondary={task.description} />
                  </ListItemButton>
                </ListItem>
              </Slide>
            ))}
          </List>
        )}
      </Box>

      {/* Pagination Controls */}
      <Box className={styles.pagination}>
        <Button
          className={styles.paginationButton}
          disabled={pagination.page <= 1} // Disable if on the first page
          onClick={() => onPageChange(pagination.page - 1)}
        >
          Previous
        </Button>
        <Typography variant="body1">
          Page {pagination.page} of {pagination.totalPages || 1} {/* Ensure totalPages defaults to 1 */}
        </Typography>
        <Button
          className={styles.paginationButton}
          disabled={pagination.page >= 1} // Disable if on the last page
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TaskList;
