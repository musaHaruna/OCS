import { useState, useEffect } from 'react';
import AdDashboardLayout from '../DashLayout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import './Request.css'; // Ensure this file contains relevant styling

const Request = () => {
  const navigate = useNavigate();
  const [groupedRequests, setGroupedRequests] = useState([]);

  // Fetch and group clearance requests by matricNumber
  useEffect(() => {
    const bursaryRequests =
      JSON.parse(localStorage.getItem('bursaryClearanceRequests')) || [];
    const libraryRequests =
      JSON.parse(localStorage.getItem('libraryClearanceRequests')) || [];

    // Combine and group requests by matricNumber
    const combinedRequests = [...bursaryRequests, ...libraryRequests];
    const grouped = combinedRequests.reduce((acc, request) => {
      const existing = acc.find(
        (item) => item.matricNumber === request.matricNumber
      );

      if (existing) {
        existing.clearances.push({
          clearanceType: request.clearanceType,
          receiptNumbers: request.receiptNumbers || {},
          status: request.status,
        });
      } else {
        acc.push({
          matricNumber: request.matricNumber,
          name: request.name,
          faculty: request.faculty,
          department: request.department,
          clearances: [
            {
              clearanceType: request.clearanceType,
              receiptNumbers: request.receiptNumbers || {},
              status: request.status,
            },
          ],
        });
      }
      return acc;
    }, []);

    setGroupedRequests(grouped);
  }, []);

  // Handle Accept Action
  const handleAccept = (matricNumber, clearanceType) => {
    const updatedRequests = groupedRequests.map((student) => {
      if (student.matricNumber === matricNumber) {
        student.clearances = student.clearances.map((clearance) => {
          if (clearance.clearanceType === clearanceType) {
            clearance.status = 'Accepted';
          }
          return clearance;
        });
      }
      return student;
    });

    setGroupedRequests(updatedRequests);
    updateLocalStorage(updatedRequests);
  };

  // Handle Deny Action
  const handleDeny = (matricNumber, clearanceType) => {
    const updatedRequests = groupedRequests.map((student) => {
      if (student.matricNumber === matricNumber) {
        student.clearances = student.clearances.map((clearance) => {
          if (clearance.clearanceType === clearanceType) {
            clearance.status = 'Denied';
          }
          return clearance;
        });
      }
      return student;
    });

    setGroupedRequests(updatedRequests);
    updateLocalStorage(updatedRequests);
  };

  // Update localStorage for bursary and library
  const updateLocalStorage = (updatedRequests) => {
    const bursaryRequests = [];
    const libraryRequests = [];

    updatedRequests.forEach((student) => {
      student.clearances.forEach((clearance) => {
        const baseData = {
          matricNumber: student.matricNumber,
          name: student.name,
          faculty: student.faculty,
          department: student.department,
          clearanceType: clearance.clearanceType,
          receiptNumbers: clearance.receiptNumbers,
          status: clearance.status,
        };

        if (clearance.clearanceType === 'Bursary') {
          bursaryRequests.push(baseData);
        } else if (clearance.clearanceType === 'Library') {
          libraryRequests.push(baseData);
        }
      });
    });

    localStorage.setItem(
      'bursaryClearanceRequests',
      JSON.stringify(bursaryRequests)
    );
    localStorage.setItem(
      'libraryClearanceRequests',
      JSON.stringify(libraryRequests)
    );
  };

  return (
    <AdDashboardLayout state={2}>
      <div className='ad-searchs'>
        <p className='student-name'>Clearance Requests</p>

        {groupedRequests.length > 0 ? (
          groupedRequests.map((student, index) => (
            <div className='search-welcome' key={index}>
              <div className='welcome-info'>
                <p className='student-name'>{student.name}</p>
                <p className='student-level'>{student.matricNumber}</p>
                <p className='student-department'>{student.department}</p>
                <p className='student-faculty'>{student.faculty}</p>
              </div>

              <div className='clearance-list'>
                {student.clearances.map((clearance, idx) => (
                  <div className='clearance-card' key={idx}>
                    <div className='clearance-header'>
                      <p>{clearance.clearanceType} Clearance</p>
                      <span
                        className={`status ${clearance.status.toLowerCase()}`}
                      >
                        {clearance.status}
                      </span>
                    </div>

                    {/* Display receipt numbers for Bursary and Library */}
                    {clearance.receiptNumbers &&
                      Object.keys(clearance.receiptNumbers).length > 0 && (
                        <div className='receipt-info'>
                          <strong>Receipt Numbers:</strong>
                          <ul>
                            {Object.entries(clearance.receiptNumbers).map(
                              ([level, receipt], idx) => (
                                <li key={idx}>
                                  <strong>{level.toUpperCase()}:</strong>{' '}
                                  {receipt}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    <div className='clearance-actions'>
                      <button
                        className='accept-btn'
                        onClick={() =>
                          handleAccept(
                            student.matricNumber,
                            clearance.clearanceType
                          )
                        }
                        disabled={clearance.status === 'Accepted'}
                      >
                        Accept
                      </button>
                      <button
                        className='deny-btn'
                        onClick={() =>
                          handleDeny(
                            student.matricNumber,
                            clearance.clearanceType
                          )
                        }
                        disabled={clearance.status === 'Denied'}
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No clearance requests available.</p>
        )}
      </div>
    </AdDashboardLayout>
  );
};

export default Request;
