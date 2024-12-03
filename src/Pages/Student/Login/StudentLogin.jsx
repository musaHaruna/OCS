import { useState } from 'react';
import Logo from '../../../images/logo.jpg';
import '../../Login/Login.css';
import './StudentLogin.css';
import { Link, useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [matricNumber, setMatricNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Initialize student data in localStorage
  const initializeData = () => {
    const users = [
      {
        id: 1,
        matricNumber: 'CSC/18U/4423',
        password: 'password',
        name: 'John Doe',
        department: 'Computer Science',
        faculty: 'Faculty of Engineering',
        gender: 'Male',
      },
      {
        id: 2,
        matricNumber: 'CSC/18U/4424',
        password: 'password',
        name: 'Jane Smith',
        department: 'Computer Science',
        faculty: 'Faculty of Engineering',
        gender: 'Female',
      },
      {
        id: 3,
        matricNumber: 'CSC/18U/4425',
        password: 'password',
        name: 'Michael Johnson',
        department: 'Software Engineering',
        faculty: 'Faculty of Engineering',
        gender: 'Male',
      },
      {
        id: 4,
        matricNumber: 'CSC/18U/4426',
        password: 'password',
        name: 'Alice Green',
        department: 'Computer Science',
        faculty: 'Faculty of Engineering',
        gender: 'Female',
      },
      {
        id: 5,
        matricNumber: 'CSC/18U/4427',
        password: 'password',
        name: 'Bob Brown',
        department: 'Computer Science',
        faculty: 'Faculty of Engineering',
        gender: 'Male',
      },
      {
        id: 6,
        matricNumber: 'SWE/18U/4428',
        password: 'password',
        name: 'Charlie Blue',
        department: 'Software Engineering',
        faculty: 'Faculty of Engineering',
        gender: 'Male',
      },
      {
        id: 7,
        matricNumber: 'SWE/18U/4429',
        password: 'password',
        name: 'Diana Red',
        department: 'Software Engineering',
        faculty: 'Faculty of Engineering',
        gender: 'Female',
      },
      {
        id: 8,
        matricNumber: 'EEE/18U/4430',
        password: 'password',
        name: 'Edward White',
        department: 'Electrical Engineering',
        faculty: 'Faculty of Engineering',
        gender: 'Male',
      },
      {
        id: 9,
        matricNumber: 'EEE/18U/4431',
        password: 'password',
        name: 'Fiona Black',
        department: 'Electrical Engineering',
        faculty: 'Faculty of Engineering',
        gender: 'Female',
      },
    ];
    localStorage.setItem('students', JSON.stringify(users));
  };

  if (!localStorage.getItem('students')) {
    initializeData();
  }

  const handleMatricNumberChange = (event) => {
    setMatricNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    const matricPattern = /^CSC\/\d{2}[A-Z]\/\d{4}$/; // Example: CSC/18U/4423

    if (!matricNumber.match(matricPattern)) {
      setError('Matric number must be in the format CSC/XXX/XXXX.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const storedUsers = JSON.parse(localStorage.getItem('students')) || [];
    const user = storedUsers.find(
      (u) => u.matricNumber === matricNumber && u.password === password
    );

    if (user) {
      // Store the logged-in user in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login successful!');
      navigate('/student/dashboard');
    } else {
      setError('Invalid matric number or password.');
    }

    setMatricNumber('');
    setPassword('');
  };

  return (
    <div className='login'>
      <div className='login-body'>
        <div className='back'>
          <Link to='/' className='back-link'>
            {`<`} Back
          </Link>
        </div>
        <img src={Logo} alt='Logo' className='login-logo' />
        <p className='login-head'>Student Login</p>
        <form className='stud-login' onSubmit={handleSubmit}>
          {error && <p className='error-message'>{error}</p>}
          <div className='form-flex'>
            <input
              type='text'
              id='matricNumber'
              value={matricNumber}
              onChange={handleMatricNumberChange}
              required
              placeholder='Matric Number'
            />
          </div>
          <div className='form-flex'>
            <input
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder='Password'
            />
          </div>
          <button className='log-btn' type='submit'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
