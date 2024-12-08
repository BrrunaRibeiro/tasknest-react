import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Select, FormControl, InputLabel, OutlinedInput, Checkbox, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api/axiosConfig';
import styles from '../styles/TaskCreate.module.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  due_date: yup.date().required('Due date is required').min(today, 'Due date can’t be in the past'),
}).required();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const TaskCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [error, setError] = useState('');

  const [categories, setCategories] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const [users, setUsers] = useState([]);

  const priorities = ['low', 'medium', 'high'];

  const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      due_date: null,
      priority: 'medium',
      category_id: '',
      owner_ids: [],
      attachment: null
    }
  });

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories/');
      console.log('Categories response:', response.data);
      setCategories(Array.isArray(response.data.results) ? response.data.results : []);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setCategories([]);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.get('/users/');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to load users:', err);
      setUsers([]); 
    }
  };

  useEffect(() => {
    loadCategories();
    loadUsers();
  }, []);

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
      setOpenCategoryDialog(false);
      setNewCategoryName('');
      await loadCategories();
    } catch (err) {
      console.error('Failed to create category:', err);
      setCategoryError('Failed to create category. Please try again.');
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      let chosenDate = data.due_date;
      if (chosenDate instanceof Date) {
        // If the chosen date is today, set time to 23:59:59 to ensure it's in the future
        const now = new Date();
        const chosenMidnight = new Date(chosenDate.getFullYear(), chosenDate.getMonth(), chosenDate.getDate());
        if (chosenMidnight.getTime() === today.getTime()) {
          // User selected today, set the time to 23:59:59 to ensure future time
          chosenDate.setHours(23, 59, 59, 999);
          // If current time is past this, you can also check and add a few minutes
          // but since we're setting it to the end of today, it should always be in the future
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
      if (data.owner_ids && data.owner_ids.length > 0) {
        data.owner_ids.forEach((ownerId) => formData.append('owner_ids', ownerId));
      }

      const response = await api.post('/create-task/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setSnackbarMessage('Task created successfully!');
        setSnackbarSeverity('success');
        reset();
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Failed to create task. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
      setSnackbarMessage('Failed to create task. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    // Additional logic if needed
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

        {/* Due Date Field using MUI DatePicker */}
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
        {categories.length === 0 ? (
          <Box className={styles.input} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="body1" gutterBottom>
              You don't have any categories yet. At least one category is required to create a new task.
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => setOpenCategoryDialog(true)}>
              Create Category
            </Button>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" className={styles.input}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Controller
                name="category_id"
                control={control}
                defaultValue=""
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
            <Button variant="contained" color="secondary" onClick={() => setOpenCategoryDialog(true)} style={{ marginLeft: '10px' }}>
              Create Category
            </Button>
          </Box>
        )}

        {/* Owners Field */}
        <FormControl fullWidth className={styles.input}>
          <InputLabel id="owners-label">Additional Owners</InputLabel>
          <Controller
            name="owner_ids"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                {...field}
                labelId="owners-label"
                label="Additional Owners"
                multiple
                disabled={users.length === 0}
                input={<OutlinedInput label="Additional Owners" />}
                renderValue={(selected) => {
                  const selectedOwners = users.filter(user => selected.includes(user.id));
                  return selectedOwners.map(u => u.username).join(', ');
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                      width: 250,
                    },
                  },
                }}
              >
                {users.length === 0 ? (
                  <MenuItem disabled>
                    No owners available. This functionality is not currently supported.
                  </MenuItem>
                ) : (
                  users.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      <Checkbox checked={field.value.indexOf(u.id) > -1} />
                      <ListItemText primary={u.username} />
                    </MenuItem>
                  ))
                )}
              </Select>
            )}
          />
        </FormControl>

        {/* Attachment Field */}
        <Box className={styles.input}>
          <input
            type="file"
            {...register('attachment')}
            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          {errors.attachment && <p className={styles.error}>{errors.attachment.message}</p>}
        </Box>

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
          <Button onClick={handleCreateCategory} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskCreate;
