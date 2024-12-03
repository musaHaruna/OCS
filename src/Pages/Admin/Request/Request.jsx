import { useState, useEffect } from 'react';
import AdDashboardLayout from '../DashLayout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import './Request.css';

const Request = () => {
  const navigate = useNavigate();
  const [groupedRequests, setGroupedRequests] = useState([]);

  useEffect(() => {
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

    const combinedRequests = [
      ...bursaryRequests,
      ...libraryRequests,
      ...sportsRequests,
      ...departmentRequests,
      ...cemetRequests,
    ];

    const grouped = combinedRequests.reduce((acc, request) => {
      const existing = acc.find(
        (item) => item.matricNumber === request.matricNumber
      );

      if (existing) {
        existing.clearances.push({
          clearanceType: request.clearanceType,
          receiptNumbers:
            request.clearanceType === 'Bursary' ? request.receiptNumbers : null,
          receiptNumber:
            request.clearanceType !== 'Bursary' ? request.receiptNumber : null,
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
              receiptNumbers:
                request.clearanceType === 'Bursary'
                  ? request.receiptNumbers
                  : null,
              receiptNumber:
                request.clearanceType !== 'Bursary'
                  ? request.receiptNumber
                  : null,
              status: request.status,
            },
          ],
        });
      }
      return acc;
    }, []);

    setGroupedRequests(grouped);
  }, []);

  const handleAccept = (matricNumber, clearanceType) => {
    const updatedRequests = groupedRequests.map((student) => {
      if (student.matricNumber === matricNumber) {
        student.clearances = student.clearances.map((clearance) => {
          if (clearance.clearanceType === clearanceType)
            clearance.status = 'Accepted';
          return clearance;
        });
      }
      return student;
    });

    setGroupedRequests(updatedRequests);
    updateLocalStorage(updatedRequests);
  };

  const handleDeny = (matricNumber, clearanceType) => {
    const updatedRequests = groupedRequests.map((student) => {
      if (student.matricNumber === matricNumber) {
        student.clearances = student.clearances.map((clearance) => {
          if (clearance.clearanceType === clearanceType)
            clearance.status = 'Denied';
          return clearance;
        });
      }
      return student;
    });

    setGroupedRequests(updatedRequests);
    updateLocalStorage(updatedRequests);
  };

  const updateLocalStorage = (updatedRequests) => {
    const clearanceTypes = [
      'Bursary',
      'Library',
      'Sports',
      'Department',
      'CEMET',
    ];
    const updatedData = {};

    clearanceTypes.forEach((type) => {
      updatedData[type] = [];
    });

    updatedRequests.forEach((student) => {
      student.clearances.forEach((clearance) => {
        const clearanceData = {
          matricNumber: student.matricNumber,
          name: student.name,
          faculty: student.faculty,
          department: student.department,
          clearanceType: clearance.clearanceType,
          status: clearance.status,
        };

        if (clearance.clearanceType === 'Bursary') {
          clearanceData.receiptNumbers = clearance.receiptNumbers;
        } else {
          clearanceData.receiptNumber = clearance.receiptNumber;
        }

        updatedData[clearance.clearanceType].push(clearanceData);
      });
    });

    clearanceTypes.forEach((type) => {
      localStorage.setItem(
        `${type.toLowerCase()}ClearanceRequests`,
        JSON.stringify(updatedData[type])
      );
    });
  };

  return (
    <AdDashboardLayout state={2}>
      <div className='ad-searchs'>
        <p className='student-name'>Clearance Requests</p>

        {groupedRequests.length > 0 ? (
          groupedRequests.map((student, index) => (
            <div
              style={{ flexDirection: 'column' }}
              className='search-welcome'
              key={index}
            >
              <div className='welcome-info'>
                <p className='student-name'>{student.name}</p>
                <p className='student-level'>{student.matricNumber}</p>
                <p className='student-department'>{student.department}</p>
                <p className='student-faculty'>{student.faculty}</p>
              </div>

              <div style={{ width: '70%' }} className='clearance-list'>
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

                    <div className='receipt-info'>
                      <strong>
                        Receipt{' '}
                        {clearance.clearanceType === 'Bursary'
                          ? 'Numbers'
                          : 'Number'}
                        :
                      </strong>
                      {clearance.clearanceType === 'Bursary' &&
                      clearance.receiptNumbers ? (
                        <ul>
                          {Object.entries(clearance.receiptNumbers).map(
                            ([level, receipt], idx) => (
                              <li style={{ listStyle: 'none' }} key={idx}>
                                <strong>{level.toUpperCase()}:</strong>{' '}
                                {receipt}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>{clearance.receiptNumber}</p>
                      )}
                    </div>

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
