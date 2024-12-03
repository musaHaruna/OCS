import { useEffect, useState } from 'react';
import DashboardLayout from '../DashLayout/DashboardLayout';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [clearances, setClearances] = useState([]);

  useEffect(() => {
    // Fetch user and clearance data from localStorage or mock data
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const bursaryRequests =
      JSON.parse(localStorage.getItem('bursaryClearanceRequests')) || [];
    const libraryRequests =
      JSON.parse(localStorage.getItem('libraryClearanceRequests')) || [];

    // Combine clearances related to the logged-in user
    const userClearances = [...bursaryRequests, ...libraryRequests].filter(
      (request) => request.matricNumber === loggedInUser.matricNumber
    );

    setUser(loggedInUser);
    setClearances(userClearances);
  }, []);

  const allCleared = clearances.every(
    (clearance) => clearance.status === 'Accepted'
  );

  const handlePrint = () => {
    window.print();
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

            <div className='welcome-state'>
              {allCleared ? 'All Clearances Completed' : 'Pending Clearances'}
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <div className='medical-record'>
          <p className='pers-header'>Clearance Status</p>

          <div className='medical-table'>
            <div className='medical-head'>
              <p className='med-head'>Clearance Type</p>
              <p className='med-head'>Receipt Number</p>
              <p className='med-head'>Status</p>
            </div>

            {clearances.length > 0 ? (
              clearances.map((clearance, index) => (
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
              <p>No clearance data found.</p>
            )}
          </div>

          {allCleared && (
            <div className='print-button-container'>
              <button className='print-btn' onClick={handlePrint}>
                Print Clearance Form
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
