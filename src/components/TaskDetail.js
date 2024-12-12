import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import styles from '../styles/TaskDetail.module.css';

import {
  Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert,
  MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  Select, FormControl, InputLabel, IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import { Dashboard } from '@mui/icons-material';

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  due_date: yup.date().required('Due date is required').min(today, 'Due date can’t be in the past'),
}).required();

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  // Snackbar states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [error, setError] = useState('');

  // Category creation dialog states
  const [categories, setCategories] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const priorities = ['low', 'medium', 'high'];

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      due_date: null,
      priority: 'medium',
      category_id: '',
      attachment: null
    }
  });

  const fetchTaskDetail = useCallback(async () => {
    try {
      const response = await api.get(`/tasks/${id}/`);
      setTask(response.data);
      const { title, description, due_date, priority, category } = response.data;

      reset({
        title: title || '',
        description: description || '',
        priority: priority || 'medium',
        due_date: due_date ? new Date(due_date) : null,
        category_id: category ? category.id : '',
        attachment: null
      });

    } catch (error) {
      console.error('Failed to fetch task details:', error);
      setSnackbarMessage('Failed to fetch task details.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [id, reset]);

  const loadCategories = async () => {
    try {
      let allCategories = [];
      let url = '/categories/';
      while (url) {
        const response = await api.get(url);
        const { results, next } = response.data;
        allCategories = [...allCategories, ...results];
        url = next; // Continue to the next page if available
      }
      setCategories(allCategories);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setSnackbarMessage('Failed to load categories.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (validImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => setAttachmentPreview({ url: reader.result, type: 'image' });
        reader.readAsDataURL(file);
      } else {
        setAttachmentPreview({ url: null, type: 'file' }); // Non-image file
      }
    }
  };

  useEffect(() => {
    fetchTaskDetail();
    loadCategories();
  }, [fetchTaskDetail]);

  // Handle Update Task
  const onUpdateTask = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      let chosenDate = data.due_date;
      if (chosenDate instanceof Date) {
        const chosenMidnight = new Date(chosenDate.getFullYear(), chosenDate.getMonth(), chosenDate.getDate());
        if (chosenMidnight.getTime() === today.getTime()) {
          // If user picked today, set the time to end of day
          chosenDate.setHours(23, 59, 59, 999);
        }
        chosenDate = chosenDate.toISOString();
      }

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      if (chosenDate) formData.append('due_date', chosenDate);
      formData.append('priority', data.priority);
      if (data.category_id) formData.append('category', data.category_id);
      if (data.attachment && data.attachment[0]) {
        formData.append('attachment', data.attachment[0]);
      }

      const response = await api.patch(`/tasks/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setSnackbarMessage('Task updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        // Refresh the task details after update
        fetchTaskDetail();
        navigate('/dashboard', { state: { refresh: true } });
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      setError('Failed to update task. Please try again.');
      setSnackbarMessage('Failed to update task. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsComplete = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch(`/tasks/${id}/`, { state: 'completed' });
      if (response.status === 200) {
        setSnackbarMessage('Task marked as complete!');
        setSnackbarSeverity('success');
        fetchTaskDetail();
        navigate('/dashboard', { state: { refresh: true } });
      }
    } catch (error) {
      console.error('Failed to mark task as complete:', error);
      setSnackbarMessage('Failed to mark task as complete.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setIsLoading(false);
    }
  };

  // Handle Delete Task
  const onDeleteTask = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.delete(`/tasks/${id}/`);
      if (response.status === 204 || response.status === 200) {
        setSnackbarMessage('Task deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      setError('Failed to delete task. Please try again.');
      setSnackbarMessage('Failed to delete task. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    setCategoryError('');
    const trimmedName = newCategoryName.trim().toLowerCase();
    const duplicate = categories.some(cat => cat.name.toLowerCase() === trimmedName);

    if (duplicate) {
      setCategoryError('This category already exists. Please choose a different name.');
      return;
    }

    try {
      await api.post('/categories/', { name: newCategoryName });
      setNewCategoryName('');
      setOpenCategoryDialog(false);
      await loadCategories(); // refresh categories
    } catch (err) {
      console.error('Failed to create category:', err);
      setCategoryError('Failed to create category. Please try again.');
    }
  };

  if (!task) {
    return <Typography className={styles.loading}>Loading task details...</Typography>;
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>Edit Task</Typography>

      <form onSubmit={handleSubmit(onUpdateTask)} className={styles.form}>

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
        <Controller
          name="due_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Due Date"
              value={field.value}
              onChange={(newValue) => field.onChange(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.due_date,
                  helperText: errors.due_date ? errors.due_date.message : '',
                  className: styles.input
                }
              }}
            />
          )}
        />

        {/* Priority Field */}
        <Controller
          name="priority"
          control={control}
          defaultValue="medium"
          render={({ field }) => (
            <Box className={styles.input}>
              <Typography variant="subtitle1" gutterBottom>
                Priority
              </Typography>
              <ToggleButtonGroup
                value={field.value}
                exclusive
                onChange={(event, newPriority) => {
                  if (newPriority !== null) {
                    field.onChange(newPriority);
                  }
                }}
                aria-label="priority"
              >
                {priorities.map(p => (
                  <ToggleButton key={p} value={p} aria-label={p + ' priority'}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              {errors.priority && <p className={styles.error}>{errors.priority.message}</p>}
            </Box>
          )}
        />

        {/* Category Field */}
          <FormControl fullWidth className={styles.input}>
            <InputLabel id="category-label">Category</InputLabel>
            <Controller
              name="category_id"
              control={control}
              // defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="category-label"
                  label="Category"
                >
                  <MenuItem value="">None</MenuItem>
                  {categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <Button
            onClick={() => setOpenCategoryDialog(true)}
            style={{ backgroundColor: '#aca3d3', color: '#fff', marginLeft: '10px' }}
            variant="contained"
          >
            Create Category
          </Button>

        {/* Attachment Field */}
        <Box className={styles.input}>
          <label htmlFor="attachment">
            <input
              id="attachment"
              type="file"
              hidden
              {...register('attachment')}
              onChange={handleAttachmentChange}
            />
            <IconButton component="span">
              <AttachFileIcon />
              <small>Add an attachment</small>
            </IconButton>
          </label>
          {attachmentPreview && attachmentPreview.type === 'image' && (
            <img
              src={attachmentPreview.url}
              alt="Attachment Preview"
              className={styles.attachmentPreview}
            />
          )}
          {attachmentPreview && attachmentPreview.type === 'file' && (
            <Typography variant="body2" color="textSecondary">
              File uploaded successfully. <br />
              <small>Preview is only available for images with format '.jpeg', '.png', '.webp'.</small>
            </Typography>
          )}
        </Box>

        {/* Actions */}
        <Box className={styles.actions}>
          <Button
            variant="contained"
            color="success"
            disabled={isLoading}
            onClick={handleMarkAsComplete}
            style={{ marginRight: '10px', backgroundColor: '#aca3d3' }}
          >
            Mark as Complete
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="white"
            disabled={isLoading || Object.keys(errors).length > 0}
            style={{ marginRight: '10px', backgroundColor: '#aca3d3', color: '#fff', border: '1px solid #fff' }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
          </Button>

          <Button
            variant="outlined"
            color="error"
            disabled={isLoading}
            onClick={onDeleteTask}
            style={{
              marginRight: '10px',
              backgroundColor: '#aca3d3', color: '#fff', border: '1px solid #fff'
            }}
          >
            Delete Task
          </Button>
        </Box>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
          {error && <div className={styles.error} style={{ marginTop: '8px' }}>{error}</div>}
        </Alert>
      </Snackbar>

      {/* Dialog for creating a new category */}
      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
        <DialogTitle>Create New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            variant="outlined"
            value={newCategoryName}
            onChange={(e) => {
              setNewCategoryName(e.target.value);
              setCategoryError('');
            }}
          />
          {categoryError && (
            <Typography variant="body2" color="error" style={{ marginTop: '8px' }}>
              {categoryError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleCreateCategory} style={{ backgroundColor: '#ccd584', color: '#fff' }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskDetail;
