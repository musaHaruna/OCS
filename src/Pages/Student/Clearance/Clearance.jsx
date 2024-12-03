import DashboardLayout from '../DashLayout/DashboardLayout';
import { useState } from 'react';
import './Clearance.css';
import BursaryClearance from './BursaryClearance';
import LibraryClearance from './LibraryClearance';

const Clearance = () => {
  const [menu, setMenu] = useState(0);
  const [location, setLocation] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const handleSendRequest = () => {
    setRequestSent(true);
  };

  const handleBackClick = () => {
    setMenu(0); // Reset the menu when going back
    setLocation(''); // Clear the location
    setRequestSent(false); // Reset the request status
  };

  // Render the appropriate clearance component based on the selected menu
  const renderClearanceComponent = () => {
    switch (menu) {
      case 1:
        return (
          <BursaryClearance
            location={location}
            setLocation={setLocation}
            handleSendRequest={handleSendRequest}
            requestSent={requestSent}
          />
        );
      case 6:
        return (
          <LibraryClearance
            location={location}
            setLocation={setLocation}
            handleSendRequest={handleSendRequest}
            requestSent={requestSent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout state={2}>
      <div className='amb-dash'>
        <p className='amb-head'>Clearance Inventory</p>

        {menu !== 0 && (
          <div className='back'>
            <div onClick={handleBackClick} className='back-link'>
              {'<'} Back
            </div>
          </div>
        )}

        {menu === 0 ? (
          <div className='grid-2'>
            <div className='first'>
              <div onClick={() => setMenu(1)} className='amb-card'>
                Bursary
              </div>
            </div>
            <div className='first'>
              <div onClick={() => setMenu(6)} className='amb-card'>
                Library
              </div>
            </div>
          </div>
        ) : (
          renderClearanceComponent() // Dynamically render the appropriate component
        )}
      </div>
    </DashboardLayout>
  );
};

export default Clearance;
