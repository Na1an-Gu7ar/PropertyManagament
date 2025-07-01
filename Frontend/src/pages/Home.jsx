import { useEffect, useState } from 'react';
import {
    TextField, Grid, Typography, Box, CircularProgress
} from '@mui/material';
import API from '../utils/api';
import PropertyCard from '../components/PropertyCard';
import CustomizedSnackbars from '../components/Snackbar';

const Home = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const res = await API.get(`/properties?search=${search}`);
            setProperties(res.data);
        } catch (err) {
            // alert('Failed to load properties');
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Failed to load properties',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [search]);

    return (
        <>
            <Box>
                <Typography variant="h4" gutterBottom>Explore Properties</Typography>
                <TextField
                    fullWidth placeholder="Search by title or location"
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 3 }}
                />
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2}>
                        {(properties || properties.length > 0) ? properties.map((property) => (
                            <Grid item xs={12} sm={6} md={4} key={property._id}>
                                <PropertyCard property={property} />
                            </Grid>
                        )) : (
                            <Typography variant="h6" color="textSecondary" sx={{ width: '100%', textAlign: 'center' }}>
                                No properties found
                            </Typography>
                        )
                        }
                    </Grid>
                )}
                <CustomizedSnackbars
                    openSnackbar={snackbar.open}
                    message={snackbar.message}
                    severity={snackbar.severity}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                />
            </Box>
        </>
    );
};

export default Home;
