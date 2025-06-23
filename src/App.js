import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <Router>
      <header style={{ padding: '15px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
        <div>
          {token ? (
            <>
              <span style={{ marginRight: '10px' }}>?? Welcome back!</span>
              <button onClick={handleLogout} style={{ padding: '6px 12px', borderRadius: '6px' }}>Logout</button>
            </>
          ) : (
            <span style={{ fontSize: '14px', color: '#666' }}>Not logged in</span>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
