import { useState, useEffect } from 'react';

const BursaryClearance = () => {
  const [receiptNumbers, setReceiptNumbers] = useState({
    level1: '',
    level2: '',
    level3: '',
    level4: '',
  });
  const [requestSent, setRequestSent] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    matricNumber: '',
    faculty: '',
    department: '',
  });
  const [clearanceRequests, setClearanceRequests] = useState([]);
  const [clearanceStatus, setClearanceStatus] = useState('');
  const clearanceType = 'Bursary';

  const validReceiptNumbers = [
    'RCP123',
    'RCP456',
    'RCP789',
    'RCP101',
    'RCP102',
  ];

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
      JSON.parse(localStorage.getItem('bursaryClearanceRequests')) || [];
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

  const handleReceiptNumberChange = (level, value) => {
    setReceiptNumbers((prev) => ({ ...prev, [level]: value }));
  };

  const handleSubmitReceipt = () => {
    const { level1, level2, level3, level4 } = receiptNumbers;
    const allValid = [level1, level2, level3, level4].every((receipt) =>
      validReceiptNumbers.includes(receipt)
    );

    if (allValid) {
      const clearanceData = {
        matricNumber: userData.matricNumber,
        name: userData.name,
        faculty: userData.faculty,
        department: userData.department,
        receiptNumbers,
        clearanceType,
        status: 'Pending',
      };

      const newClearanceRequests = [...clearanceRequests, clearanceData];
      localStorage.setItem(
        'bursaryClearanceRequests',
        JSON.stringify(newClearanceRequests)
      );

      setClearanceRequests(newClearanceRequests);
      setRequestSent(true);
      setClearanceStatus('Pending');

      alert(`${clearanceType} clearance request has been submitted!`);
    } else {
      alert(
        'One or more receipt numbers are invalid. Please check and try again.'
      );
    }
  };

  return (
    <div className='clearance-container'>
      <div className='clearance-header'>
        <h2>{clearanceType} Clearance</h2>
        <p>
          Complete the clearance process by providing receipt numbers for all
          levels.
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
            {['level1', 'level2', 'level3', 'level4'].map((level, index) => (
              <div key={level}>
                <label>
                  Receipt Number (Level {index + 1}):
                  <input
                    type='text'
                    placeholder={`Enter receipt for Level ${index + 1}`}
                    value={receiptNumbers[level]}
                    onChange={(e) =>
                      handleReceiptNumberChange(level, e.target.value)
                    }
                  />
                </label>
              </div>
            ))}

            <button
              onClick={handleSubmitReceipt}
              disabled={
                !receiptNumbers.level1 ||
                !receiptNumbers.level2 ||
                !receiptNumbers.level3 ||
                !receiptNumbers.level4
              }
              className='submit-receipt-button'
            >
              Submit Receipt Numbers
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

export default BursaryClearance;
