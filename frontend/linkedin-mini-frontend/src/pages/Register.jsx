import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', bio: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/auth/register', form);
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2" required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="border p-2" required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="border p-2" required />
        <input name="bio" placeholder="Short Bio" onChange={handleChange} className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
      </form>
    </div>
  );
};

export default Register;
