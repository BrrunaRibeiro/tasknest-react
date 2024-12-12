import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axiosConfig';
import TaskList from '../components/TaskList';
import styles from '../styles/Dashboard.module.css';
import { Box, Typography, Button, Snackbar, Alert, Dialog, DialogActions, DialogTitle } from '@mui/material';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Track selected task for confirmation
  const [actionType, setActionType] = useState(''); // 'delete' or 'complete'
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    priority: '',
    state: 'open', // Default filter to show only open tasks
    category: '',
  });

  const location = useLocation();

  // Fetch tasks with updated filters and pagination
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
  
      let allTasks = [];
      let url = '/tasks/';
      let params = {
        ...filters,
      };
  
      if (!params.priority) delete params.priority;
      if (!params.state) delete params.state;
  
      // Load all tasks across pages
      while (url) {
        const response = await api.get(url, { params });
        const { results, next } = response.data; // Assuming 'results' and 'next' exist in API response
        allTasks = [...allTasks, ...results];
        url = next; // Continue to the next page if available
      }
  
      setTasks(allTasks); // Combine all tasks
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to fetch tasks. Please check your connection or try again.');
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
    // Handle delete task
  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      const response = await api.delete(`/tasks/${selectedTask.id}/`);
      if (response.status === 204 || response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id)); // Remove task locally
        setSnackbarMessage('Task deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Failed to delete task:', err);
      setSnackbarMessage('Failed to delete task. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setOpenDialog(false);
      setSelectedTask(null);
      setActionType('');
    }
  };

  // Handle mark task as completed
  const handleMarkComplete = async () => {
    if (!selectedTask) return;
    try {
      const response = await api.patch(`/tasks/${selectedTask.id}/`, { state: 'done' });
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === selectedTask.id ? { ...task, state: 'done' } : task
          )
        ); // Update task locally
        setSnackbarMessage('Task marked as completed!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        fetchTasks(); // Refresh the task list after update
      }
    } catch (err) {
      console.error('Failed to mark task as complete:', err);
      setSnackbarMessage('Failed to update task. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setOpenDialog(false);
      setSelectedTask(null);
      setActionType('');
    }
  };

  // Show confirmation dialog
  const showConfirmationDialog = (task, action) => {
    setSelectedTask(task);
    setActionType(action); // 'delete' or 'complete'
    setOpenDialog(true);
  };

  // Update data when filters, pagination, or navigation state changes
  useEffect(() => {
    if (location.state?.refresh) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
    fetchTasks();
  }, [fetchTasks, location.state?.refresh]);

  // Handle filter updates
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setPagination((prev) => ({
      ...prev,
      page: 1, // Reset to the first page when filters change
    }));
  };

  // Handle pagination updates
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  if (loading) {
    return (
      <Box className={styles.container}>
        <Typography variant="h4" className={styles.title}>
          Task Dashboard
        </Typography>
        <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={styles.container}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button variant="contained" color="primary" onClick={fetchTasks}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Task Dashboard
      </Typography>
      <TaskList
        tasks={tasks}
        filters={filters}
        pagination={pagination}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        onDeleteTask={(task) => showConfirmationDialog(task, 'delete')}
        onMarkComplete={(task) => showConfirmationDialog(task, 'complete')}
      />
      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {actionType === 'delete'
            ? 'Are you sure you want to delete this task?'
            : 'Are you sure you want to mark this task as completed?'}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={actionType === 'delete' ? handleDeleteTask : handleMarkComplete}
            color={actionType === 'delete' ? 'error' : 'primary'}
            variant="contained"
          >
            {actionType === 'delete' ? 'Delete' : 'Mark as Complete'}
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="inherit" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
