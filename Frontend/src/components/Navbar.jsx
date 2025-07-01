import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CustomizedSnackbars from './Snackbar';
import { useState } from 'react';

const Navbar = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setSnackbar({
            open: true,
            message: 'Logged out successfully',
            severity: 'success',
        });
        navigate('/login');
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6">Rbrickks Real Estate</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        {isAuth && (
                            <>
                                <Button color="inherit" component={Link} to="/add">Add Property</Button>
                                <Button color="inherit" component={Link} to="/my-properties">My Properties</Button>
                                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                            </>
                        )}
                        {!isAuth && (
                            <>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
            <CustomizedSnackbars
                openSnackbar={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </>
    );
};

export default Navbar;
