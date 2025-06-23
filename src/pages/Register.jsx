import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    city: '',
    street: '',
    number: '',
    zipcode: '',
    phone: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      address: {
        city: formData.city,
        street: formData.street,
        number: +formData.number,
        zipcode: formData.zipcode,
      },
      phone: formData.phone,
    };

    axios.post('https://fakestoreapi.com/users', payload)
      .then(() => setSuccess(true))
      .catch(() => alert("Registration failed. Try again."));
  };

  return (
    <div className="register-page">
      <h2>Create Account</h2>

      {success ? (
        <p className="success-msg">✅ You’ve registered successfully!</p>
      ) : (
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-row">
            <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="text" name="city" placeholder="City" onChange={handleChange} required />
            <input type="text" name="street" placeholder="Street" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="text" name="number" placeholder="Street No." onChange={handleChange} required />
            <input type="text" name="zipcode" placeholder="Zip Code" onChange={handleChange} required />
          </div>

          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;
