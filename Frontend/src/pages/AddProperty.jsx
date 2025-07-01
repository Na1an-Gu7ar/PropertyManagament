import { useState } from 'react';
import {
    Box, TextField, Typography, Button, Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import CustomizedSnackbars from '../components/Snackbar';

const AddProperty = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        imageUrl: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/properties', form);
            // alert('Property added successfully!');
            setSnackbar({
                open: true,
                message: 'Property added successfully!',
                severity: 'success',
            });
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            // alert(err.response?.data?.message || 'Failed to add property');
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Failed to add property',
                severity: 'error',
            });
        }
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
            <Typography variant="h5" gutterBottom>Add New Property</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Title" name="title" value={form.title}
                    onChange={handleChange} fullWidth margin="normal" required
                />
                <TextField
                    label="Description" name="description" value={form.description}
                    onChange={handleChange} fullWidth margin="normal" multiline rows={3}
                />
                <TextField
                    label="Location" name="location" value={form.location}
                    onChange={handleChange} fullWidth margin="normal" required
                />
                <TextField
                    label="Price (₹)" name="price" type="number" value={form.price}
                    onChange={handleChange} fullWidth margin="normal" required
                />
                <TextField
                    label="Image URL" name="imageUrl" value={form.imageUrl}
                    onChange={handleChange} fullWidth margin="normal"
                    placeholder="https://..."
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Add Property
                </Button>
            </Box>
            <CustomizedSnackbars
                openSnackbar={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
            />
        </Paper>
    );
};

export default AddProperty;
