import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import CustomizedSnackbars from '../components/Snackbar';

const Login = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            setSnackbar({
                open: true,
                message: 'Logged in successfully!',
                severity: 'success',
            });
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.response?.data?.msg || 'Login failed',
                severity: 'error',
            });
        }
    };

    return (
        <>
            <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth margin="normal" name="email" label="Email"
                        value={form.email} onChange={handleChange}
                    />
                    <TextField
                        fullWidth margin="normal" name="password" label="Password" type="password"
                        value={form.password} onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
                <CustomizedSnackbars
                    openSnackbar={snackbar.open}
                    message={snackbar.message}
                    severity={snackbar.severity}
                    onClose={() => { setSnackbar({ ...snackbar, open: false }) }}
                />
            </Paper>
        </>
    );
};

export default Login;
