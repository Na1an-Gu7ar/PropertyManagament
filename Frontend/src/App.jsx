import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import AddProperty from './pages/AddProperty';
import MyProperties from './pages/MyProperties';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
          <Route path="/my-properties" element={<PrivateRoute><MyProperties /></PrivateRoute>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
