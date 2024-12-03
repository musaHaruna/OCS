import { useEffect, useState } from 'react';
import DashboardLayout from '../DashLayout/DashboardLayout';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bursaryClearances, setBursaryClearances] = useState([]);
  const [libraryClearances, setLibraryClearances] = useState([]);

  useEffect(() => {
    // Fetch user and clearance data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const bursaryRequests =
      JSON.parse(localStorage.getItem('bursaryClearanceRequests')) || [];
    const libraryRequests =
      JSON.parse(localStorage.getItem('libraryClearanceRequests')) || [];

    // Filter clearances related to the logged-in user
    const userBursaryClearances = bursaryRequests.filter(
      (request) => request.matricNumber === loggedInUser?.matricNumber
    );

    const userLibraryClearances = libraryRequests.filter(
      (request) => request.matricNumber === loggedInUser?.matricNumber
    );

    setUser(loggedInUser);
    setBursaryClearances(userBursaryClearances);
    setLibraryClearances(userLibraryClearances);
  }, []);

  // Check if all clearances are "Accepted"
  const allCleared =
    bursaryClearances.length > 0 &&
    libraryClearances.length > 0 &&
    bursaryClearances.every((clearance) => clearance.status === 'Accepted') &&
    libraryClearances.every((clearance) => clearance.status === 'Accepted');

  const handlePrint = () => {
    if (allCleared) {
      window.print();
    }
  };

  return (
    <DashboardLayout state={1}>
      <div className='student-dash'>
        {user ? (
          <div className='dash-welcome'>
            <div className='welcome-info'>
              <p className='student-name'>{user.name}</p>
              <p className='student-level'>{user.matricNumber}</p>
            </div>
            <div style={{ textAlign: 'center' }} className='welcome-state'>
              {allCleared ? 'All Clearances Completed' : 'Pending Clearances'}
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <div className='medical-record'>
          <p className='pers-header'>Bursary Clearance Status</p>
          <div className='medical-table'>
            <div style={{ textAlign: 'center' }} className='medical-head'>
              <p className='med-head'>Clearance Type</p>
              <p className='med-head'>Receipt Numbers</p>
              <p className='med-head'>Status</p>
            </div>

            {bursaryClearances.length > 0 ? (
              bursaryClearances.map((clearance, index) => (
                <div key={index} className='medical-head'>
                  <p className='med-text'>{clearance.clearanceType}</p>
                  <p className='med-text'>
                    {clearance.receiptNumbers
                      ? Object.values(clearance.receiptNumbers).join(', ')
                      : 'N/A'}
                  </p>
                  <p
                    className={`med-text ${
                      clearance.status === 'Accepted'
                        ? 'med-active'
                        : 'med-pending'
                    }`}
                  >
                    {clearance.status}
                  </p>
                </div>
              ))
            ) : (
              <p>No bursary clearance data found.</p>
            )}
          </div>

          <p className='pers-header'>Library Clearance Status</p>
          <div className='medical-table'>
            <div style={{ textAlign: 'center' }} className='medical-head'>
              <p className='med-head'>Clearance Type</p>
              <p className='med-head'>Receipt Number</p>
              <p className='med-head'>Status</p>
            </div>

            {libraryClearances.length > 0 ? (
              libraryClearances.map((clearance, index) => (
                <div key={index} className='medical-head'>
                  <p className='med-text'>{clearance.clearanceType}</p>
                  <p className='med-text'>{clearance.receiptNumber || 'N/A'}</p>
                  <p
                    className={`med-text ${
                      clearance.status === 'Accepted'
                        ? 'med-active'
                        : 'med-pending'
                    }`}
                  >
                    {clearance.status}
                  </p>
                </div>
              ))
            ) : (
              <p>No library clearance data found.</p>
            )}
          </div>

          <div className='print-button-container'>
            <button
              className='print-btn'
              onClick={handlePrint}
              disabled={!allCleared}
            >
              Print Clearance Form
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
