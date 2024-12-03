import React, { useState, useEffect } from 'react';
import AdDashboardLayout from '../DashLayout/DashboardLayout';
import './Student.css';
import AdStudentIcon from '../../../assets/adstud';
import { useNavigate } from 'react-router-dom';

const AdStudent = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load students from localStorage
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
    setFilteredStudents(storedStudents);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value) {
      const filtered = students.filter(
        (student) =>
          student.matricNumber.toLowerCase().includes(value) ||
          student.name.toLowerCase().includes(value)
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  };

  // Open modal with student details
  const handleView = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <AdDashboardLayout state={3}>
      <div className='ad-stud'>
        <div className='ad-search'>
          <p className='student-name'>Student Search</p>
          <div className='ad-nav'>
            <div className='search-bar'>
              <AdStudentIcon />
              <input
                type='text'
                placeholder='Enter Matric Number or Name'
                value={searchTerm}
                onChange={handleSearchChange}
                className='mat-ad'
              />
            </div>
          </div>

          <h3>Search Results</h3>
          {filteredStudents.length === 0 ? (
            <p>No results found</p>
          ) : (
            filteredStudents.map((student) => (
              <div key={student.id} className='search-welcome'>
                <div className='welcome-info'>
                  <p className='student-name'>{student.name}</p>
                  <p className='student-level'>{student.matricNumber}</p>
                </div>
                <div className='search-col'>
                  <div
                    onClick={() => handleView(student)}
                    className='search-view'
                  >
                    View
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for viewing student details */}
        {showModal && selectedStudent && (
          <div className='modal-overlay'>
            <div className='modal-content'>
              <h2>Student Details</h2>
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>Matric Number:</strong> {selectedStudent.matricNumber}
              </p>
              <p>
                <strong>Department:</strong> {selectedStudent.department}
              </p>
              <p>
                <strong>Faculty:</strong> {selectedStudent.faculty}
              </p>
              <p>
                <strong>Gender:</strong> {selectedStudent.gender}
              </p>
              <button className='close-btn' onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdDashboardLayout>
  );
};

export default AdStudent;
