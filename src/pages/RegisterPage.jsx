// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5020/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data._id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email
        }));
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-800 ">
      <form onSubmit={handleSubmit} className="dark:bg-gray-900  p-8 rounded-lg shadow-md w-110  hover:shadow-gray-950 transition-shadow duration-300">
        <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-500 text-2xl">First Name</label>
          <input
            type="text"
            placeholder='Enter your first name'
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-2xl">Last Name</label>
          <input
            type="text"
            placeholder='Enter your last name'
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-2xl">Email</label>
          <input
            type="email"
            placeholder='Enter your email'
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-2xl">Password</label>
          <input
            type="password"
            placeholder='Enter your password'
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;