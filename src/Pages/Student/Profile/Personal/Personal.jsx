import { useEffect, useState } from 'react';
import '../../Dashboard/Dashboard.css';

const Personal = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editPhone, setEditPhone] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setEditPhone(loggedInUser.phone || '');
    } else {
      window.location.href = '/student/login';
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditPhone(e.target.value);
  };

  const handleSave = () => {
    const updatedUser = { ...user, phone: editPhone };
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

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
              <p className='answer'>COPAS</p>
            </div>

            <div className='dets-flex'>
              <p className='info'>Department:</p>
              <p className='answer'>{user.department}</p>
            </div>

            <div className='dets-flex'>
              <p className='info'>Level:</p>
              <p className='answer'>400</p>
            </div>

            <div className='dets-flex'>
              <p className='info'>Phone No.:</p>
              {isEditing ? (
                <input
                  type='text'
                  value={editPhone}
                  onChange={handleInputChange}
                  className='answer-input'
                />
              ) : (
                <p className='answer'>{user.phone || 'Not Available'}</p>
              )}
            </div>
          </div>

          <div className='edit-buttons'>
            {isEditing ? (
              <>
                <button className='save-btn' onClick={handleSave}>
                  Save
                </button>
                <button className='cancel-btn' onClick={handleEditToggle}>
                  Cancel
                </button>
              </>
            ) : (
              <button className='edit-btn' onClick={handleEditToggle}>
                Edit Phone Number
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Personal;
