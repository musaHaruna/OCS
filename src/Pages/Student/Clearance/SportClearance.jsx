const SportClearance = ({
  location,
  setLocation,
  handleSendRequest,
  requestSent,
}) => {
  return (
    <div className='medical-record'>
      <div
        onClick={() => setLocation('Joseph')}
        className={`${location === 'Joseph' ? '' : ''}`}
      >
        <div className='medical-record'>
          <p className='pers-header'>Sport Clearance:</p>
          <p>You have not been Cleared.</p>
          {requestSent ? (
            <p>Your request has been sent.</p>
          ) : (
            <div className='search-col'>
              <div onClick={handleSendRequest} className='search-view'>
                Send Request
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SportClearance;
