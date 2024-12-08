import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api/axiosConfig';
import styles from '../styles/TaskCreate.module.css';

// Yup schema for form validation
const schema = yup.object({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  due_date: yup.date().required('Due date is required').min(new Date(), 'Due date must be in the future'),
}).required();

const TaskCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post('/tasks/create/', data); // Assuming /tasks/create is the endpoint
      setSnackbarMessage('Task created successfully!');
      setSnackbarSeverity('success');
      reset(); // Reset form fields
      navigate('/tasks'); // Redirect to task list page
    } catch (error) {
      console.error('Error creating task:', error);
      setSnackbarMessage('Failed to create task. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };

  // Handle real-time field validation
  useEffect(() => {
    // Here we can add any additional logic if necessary based on form values.
  }, [setValue]);

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>Create New Task</Typography>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Title Field */}
        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title ? errors.title.message : ''}
          className={styles.input}
        />

        {/* Description Field */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ''}
          className={styles.input}
        />

        {/* Due Date Field */}
        <TextField
          label="Due Date"
          variant="outlined"
          fullWidth
          type="date"
          {...register('due_date')}
          error={!!errors.due_date}
          helperText={errors.due_date ? errors.due_date.message : ''}
          InputLabelProps={{
            shrink: true,
          }}
          className={styles.input}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button}
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Task'}
        </Button>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskCreate;
