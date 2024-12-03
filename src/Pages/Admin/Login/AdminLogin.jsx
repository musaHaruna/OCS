// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Logo from '../../../images/logo.jpg';
import '../../Login/Login.css';
import '../../Student/Login/StudentLogin.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize admin credentials in localStorage if not present
    const adminData = JSON.parse(localStorage.getItem('adminCredentials'));
    if (!adminData) {
      localStorage.setItem(
        'adminCredentials',
        JSON.stringify({ username: 'admin', password: 'admin123' })
      );
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError(''); // Clear error when user starts typing
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    const storedAdmin = JSON.parse(localStorage.getItem('adminCredentials'));

    if (
      storedAdmin &&
      username === storedAdmin.username &&
      password === storedAdmin.password
    ) {
      // Successful login
      setUsername('');
      setPassword('');
      navigate('/admin/dashboard'); // Navigate to admin dashboard
    } else {
      // Failed login
      setError('Invalid username or password.');
    }
  };

  return (
    <div className='login'>
      <div className='login-body'>
        <div className='back'>
          <Link to='/' className='back-link'>
            {`<`} Back
          </Link>
        </div>
        <img src={Logo} alt='' className='login-logo' />
        <p className='login-head'>Admin Login</p>
        <form className='stud-login' onSubmit={handleSubmit}>
          <div className='form-flex'>
            <input
              type='text'
              id='username'
              value={username}
              onChange={handleUsernameChange}
              placeholder='Username'
              required
            />
          </div>
          <div className='form-flex'>
            <input
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              placeholder='Password'
              required
            />
          </div>
          {error && <p className='error-message'>{error}</p>}
          <button className='log-btn' type='submit'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
