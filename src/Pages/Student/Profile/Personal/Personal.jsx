import { useEffect, useState } from 'react';
import '../../Dashboard/Dashboard.css';

const Personal = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the logged-in user's data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      // If no user is found in localStorage, redirect to login page
      window.location.href = '/student/login';
    }
  }, []);

  return (
    <div className='pers-contain'>
      {user ? (
        <div className='pers-info'>
          <p className='pers-header'>Personal Information</p>

          <div className='details'>
            <div className='dets-flex'>
              <p className='info'>Full Name:</p>
              <p className='answer'>{user.name}</p>
            </div>
            <div className='dets-flex'>
              <p className='info'>Matric Number:</p>
              <p className='answer'>{user.matricNumber}</p>
            </div>
            <div className='dets-flex'>
              <p className='info'>Sex:</p>
              <p className='answer'>{user.gender}</p>
            </div>
            <div className='dets-flex'>
              <p className='info'>College:</p>
              <p className='answer'>COPAS</p>{' '}
              {/* You can update this if needed */}
            </div>
            <div className='dets-flex'>
              <p className='info'>Department:</p>
              <p className='answer'>{user.department}</p>
            </div>
            <div className='dets-flex'>
              <p className='info'>Level:</p>
              <p className='answer'>400</p>{' '}
              {/* You can update this if needed */}
            </div>
            <div className='dets-flex'>
              <p className='info'>Phone No.:</p>
              <p className='answer'>{user.phone || 'Not Available'}</p>{' '}
              {/* You can add the phone number to the user object */}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Personal;
