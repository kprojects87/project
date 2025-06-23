import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [token, setToken] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('https://fakestoreapi.com/auth/login', credentials)
            .then(res => {
                const token = res.data.token;
                setToken(token);
                localStorage.setItem('token', token);
                setError('');
            })
            .catch(() => {
                setError('Invalid username or password');
            });
    };

    return (
        <div className="login-page">
            <h2>Login to Your Account</h2>

            {token ? (
                <p className="success-msg">✅ Logged in successfully!</p>
            ) : (
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                    {error && <p className="error-msg">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default Login;
