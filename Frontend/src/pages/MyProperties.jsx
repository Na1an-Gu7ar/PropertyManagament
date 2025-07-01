import { useEffect, useState } from 'react';
import {
    Box, Grid, Typography, CircularProgress, Dialog, DialogTitle,
    DialogContent, TextField, DialogActions, Button,
} from '@mui/material';
import PropertyCard from '../components/PropertyCard';
import API from '../utils/api';
import CustomizedSnackbars from '../components/Snackbar';

const MyProperties = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchMyProperties = async () => {
        try {
            setLoading(true);
            const res = await API.get('/properties');
            const token = localStorage.getItem('token');
            const userData = JSON.parse(atob(token.split('.')[1]));
            const userId = userData.id;
            const myProps = res.data.filter(p => p.user._id === userId);
            setProperties(myProps);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Failed to fetch properties',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await API.delete(`/properties/${id}`);
            setProperties(properties.filter((p) => p._id !== id));
            setSnackbar({
                open: true,
                message: 'Property deleted successfully!',
                severity: 'success',
            });
        } catch (err) {
            // alert('Delete failed');
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Failed to delete property',
                severity: 'error',
            });
        }
    };

    const handleEditOpen = (property) => {
        setEditData(property);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        try {
            await API.put(`/properties/${editData._id}`, editData);
            setEditData(null);
            setSnackbar({
                open: true,
                message: 'Property updated successfully!',
                severity: 'success',
            });
            fetchMyProperties();
        } catch (err) {
            // alert('Update failed');
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Failed to update property',
                severity: 'error',
            });
        }
    };

    useEffect(() => {
        fetchMyProperties();
    }, []);

    return (
        <>
            <Box>
                <Typography variant="h4" gutterBottom>My Properties</Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2}>
                        {properties.map((property) => (
                            <Grid item xs={12} sm={6} md={4} key={property._id}>
                                <PropertyCard
                                    property={property}
                                    showActions
                                    onDelete={handleDelete}
                                    onEdit={handleEditOpen}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                <Dialog open={Boolean(editData)} onClose={() => setEditData(null)} maxWidth="sm" fullWidth>
                    <DialogTitle>Edit Property</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth margin="dense" label="Title" name="title"
                            value={editData?.title || ''} onChange={handleEditChange}
                        />
                        <TextField
                            fullWidth margin="dense" label="Description" name="description" multiline rows={2}
                            value={editData?.description || ''} onChange={handleEditChange}
                        />
                        <TextField
                            fullWidth margin="dense" label="Location" name="location"
                            value={editData?.location || ''} onChange={handleEditChange}
                        />
                        <TextField
                            fullWidth margin="dense" label="Price" name="price" type="number"
                            value={editData?.price || ''} onChange={handleEditChange}
                        />
                        <TextField
                            fullWidth margin="dense" label="Image URL" name="imageUrl"
                            value={editData?.imageUrl || ''} onChange={handleEditChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditData(null)}>Cancel</Button>
                        <Button onClick={handleEditSubmit} variant="contained">Save</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <CustomizedSnackbars
                openSnackbar={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </>
    );
};

export default MyProperties;
