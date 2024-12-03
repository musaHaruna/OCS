import { useState, useEffect } from 'react';

const DepartmentClearance = () => {
  const [receiptNumber, setReceiptNumber] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    matricNumber: '',
    faculty: '',
    department: '',
  });
  const [clearanceRequests, setClearanceRequests] = useState([]);
  const [clearanceStatus, setClearanceStatus] = useState('');
  const clearanceType = 'Department';

  const validReceiptNumbers = ['DEPT123', 'DEPT456', 'DEPT789'];

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUserData) {
      setUserData({
        name: storedUserData.name,
        matricNumber: storedUserData.matricNumber,
        faculty: storedUserData.faculty || '',
        department: storedUserData.department || '',
      });
    }

    const storedClearanceRequests =
      JSON.parse(localStorage.getItem('departmentClearanceRequests')) || [];
    setClearanceRequests(storedClearanceRequests);

    const currentClearance = storedClearanceRequests.find(
      (req) =>
        req.matricNumber === storedUserData?.matricNumber &&
        req.clearanceType === clearanceType
    );
    if (currentClearance) {
      setRequestSent(true);
      setClearanceStatus(currentClearance.status);
    }
  }, [clearanceType]);

  const handleSubmitReceipt = () => {
    if (validReceiptNumbers.includes(receiptNumber)) {
      const clearanceData = {
        matricNumber: userData.matricNumber,
        name: userData.name,
        faculty: userData.faculty,
        department: userData.department,
        receiptNumber,
        clearanceType,
        status: 'Pending',
      };

      const newClearanceRequests = [...clearanceRequests, clearanceData];
      localStorage.setItem(
        'departmentClearanceRequests',
        JSON.stringify(newClearanceRequests)
      );

      setClearanceRequests(newClearanceRequests);
      setRequestSent(true);
      setClearanceStatus('Pending');

      alert(`${clearanceType} clearance request has been submitted!`);
    } else {
      alert('Invalid receipt number. Please check and try again.');
    }
  };

  return (
    <div className='clearance-container'>
      <div className='clearance-header'>
        <h2>{clearanceType} Clearance</h2>
        <p>
          Complete the clearance process by providing your department receipt
          number.
        </p>
      </div>

      <div className='clearance-form'>
        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Matric Number:</strong> {userData.matricNumber}
        </p>
        <p>
          <strong>Faculty:</strong> {userData.faculty}
        </p>
        <p>
          <strong>Department:</strong> {userData.department}
        </p>

        {!requestSent ? (
          <div className='receipt-section'>
            <label>
              Receipt Number:
              <input
                type='text'
                placeholder='Enter department receipt number'
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)}
              />
            </label>

            <button
              onClick={handleSubmitReceipt}
              disabled={!receiptNumber}
              className='submit-receipt-button'
            >
              Submit Receipt Number
            </button>
          </div>
        ) : (
          <div className='confirmation-message'>
            <p>
              Your {clearanceType} clearance request has been successfully
              submitted!
            </p>
            <p>Status: {clearanceStatus}</p>
            {clearanceStatus === 'Pending' && (
              <p>
                Your clearance is still pending. Please wait for admin approval.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentClearance;
