import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/axiosConfig';
import TaskList from '../components/TaskList';
import styles from '../styles/Dashboard.module.css';
import { Box, Typography, Button } from '@mui/material';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    priority: '',
    state: '',
    category: '',
  });

  // Fetch tasks with updated filters and pagination
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: pagination.page,
        page_size: pagination.pageSize,
        ...filters,
      };

      const response = await api.get('/tasks/', { params });
      setTasks(response.data.results); // Assuming 'results' holds task data
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.total_pages, // Assuming 'total_pages' exists in response
      }));
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to fetch tasks. Please check your connection or try again.');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize, filters]);

  // Update data when filters or pagination changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
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
      />
    </Box>
  );
};

export default Dashboard;
