import { useEffect, useState } from 'react';
import DashboardLayout from '../DashLayout/DashboardLayout';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bursaryClearances, setBursaryClearances] = useState([]);
  const [libraryClearances, setLibraryClearances] = useState([]);
  const [sportsClearances, setSportsClearances] = useState([]);
  const [departmentClearances, setDepartmentClearances] = useState([]);
  const [cemetClearances, setCemetClearances] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const bursaryRequests =
      JSON.parse(localStorage.getItem('bursaryClearanceRequests')) || [];
    const libraryRequests =
      JSON.parse(localStorage.getItem('libraryClearanceRequests')) || [];
    const sportsRequests =
      JSON.parse(localStorage.getItem('sportsClearanceRequests')) || [];
    const departmentRequests =
      JSON.parse(localStorage.getItem('departmentClearanceRequests')) || [];
    const cemetRequests =
      JSON.parse(localStorage.getItem('cemetClearanceRequests')) || [];

    const filterRequests = (requests) =>
      requests.filter(
        (request) => request.matricNumber === loggedInUser?.matricNumber
      );

    setUser(loggedInUser);
    setBursaryClearances(filterRequests(bursaryRequests));
    setLibraryClearances(filterRequests(libraryRequests));
    setSportsClearances(filterRequests(sportsRequests));
    setDepartmentClearances(filterRequests(departmentRequests));
    setCemetClearances(filterRequests(cemetRequests));
  }, []);

  const allCleared =
    bursaryClearances.every((c) => c.status === 'Accepted') &&
    libraryClearances.every((c) => c.status === 'Accepted') &&
    sportsClearances.every((c) => c.status === 'Accepted') &&
    departmentClearances.every((c) => c.status === 'Accepted') &&
    cemetClearances.every((c) => c.status === 'Accepted');

  const renderClearanceSection = (title, clearances) => (
    <div>
      <p className='pers-header'>{title} Clearance Status</p>
      <div className='medical-table'>
        <div style={{ textAlign: 'center' }} className='medical-head'>
          <p className='med-head'>Clearance Type</p>
          <p className='med-head'>Receipt Numbers</p>
          <p className='med-head'>Status</p>
        </div>

        {clearances.length > 0 ? (
          clearances.map((clearance, index) => (
            <div key={index} className='medical-head'>
              <p className='med-text'>{clearance.clearanceType}</p>
              <p className='med-text'>
                {title === 'Bursary'
                  ? Object.entries(clearance.receiptNumbers || {})
                      .map(([level, receipt]) => `${level}: ${receipt}`)
                      .join(', ')
                  : clearance.receiptNumber || 'N/A'}
              </p>
              <p
                className={`med-text ${
                  clearance.status === 'Accepted' ? 'med-active' : 'med-pending'
                }`}
              >
                {clearance.status}
              </p>
            </div>
          ))
        ) : (
          <p>No {title.toLowerCase()} clearance data found.</p>
        )}
      </div>
    </div>
  );

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

        {renderClearanceSection('Bursary', bursaryClearances)}
        {renderClearanceSection('Library', libraryClearances)}
        {renderClearanceSection('Sports', sportsClearances)}
        {renderClearanceSection('Department', departmentClearances)}
        {renderClearanceSection('CEMET', cemetClearances)}

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
    </DashboardLayout>
  );
};

export default Dashboard;
