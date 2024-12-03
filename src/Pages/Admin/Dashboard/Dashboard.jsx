import React, { useEffect, useState } from 'react';
import AdDashboardLayout from '../DashLayout/DashboardLayout';
import './AdDash.css';
import { useNavigate } from 'react-router-dom';

const AdDashboard = () => {
  const navigate = useNavigate();
  const [studentsData, setStudentsData] = useState([]);
  const [bursaryRequests, setBursaryRequests] = useState([]);
  const [libraryRequests, setLibraryRequests] = useState([]);

  useEffect(() => {
    // Fetch students and clearance requests from localStorage
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const storedBursary =
      JSON.parse(localStorage.getItem('bursaryClearanceRequests')) || [];
    const storedLibrary =
      JSON.parse(localStorage.getItem('libraryClearanceRequests')) || [];

    setStudentsData(storedStudents);
    setBursaryRequests(storedBursary);
    setLibraryRequests(storedLibrary);
  }, []);

  // Helper function to group data by faculty and department
  const groupByFacultyAndDepartment = (students) => {
    const grouped = {};

    students.forEach((student) => {
      const { faculty, department } = student;

      if (!grouped[faculty]) grouped[faculty] = {};
      if (!grouped[faculty][department]) grouped[faculty][department] = [];

      grouped[faculty][department].push(student);
    });

    return grouped;
  };

  const calculateClearanceStatus = (requests) => {
    return requests.reduce(
      (acc, req) => {
        acc.total += 1;
        req.status === 'Pending' ? acc.pending++ : acc.completed++;
        return acc;
      },
      { total: 0, pending: 0, completed: 0 }
    );
  };

  const groupedStudents = groupByFacultyAndDepartment(studentsData);

  // Calculate totals
  const totalStudents = studentsData.length;
  const totalFaculties = Object.keys(groupedStudents).length;
  const totalDepartments = Object.values(groupedStudents).reduce(
    (acc, departments) => acc + Object.keys(departments).length,
    0
  );

  return (
    <AdDashboardLayout state={1}>
      <div className='ad-flex'>
        <div className='dash-welcome'>
          <div className='welcome-info'>
            <p className='student-name'>Welcome Admin.</p>
            <p className='student-level'>Admin Number: 001</p>
          </div>
        </div>

        <div className='grid-3'>
          <div
            onClick={() => navigate('/admin/students/new')}
            className='ad-card'
          >
            <p>Total Students: {totalStudents}</p>
          </div>

          <div onClick={() => navigate('/admin/students')} className='ad-card'>
            <p>Total Faculties: {totalFaculties}</p>
          </div>

          <div onClick={() => navigate('/admin/students')} className='ad-card'>
            <p>Total Departments: {totalDepartments}</p>
          </div>
        </div>

        <div className='faculty-summary'>
          {Object.entries(groupedStudents).map(([faculty, departments]) => (
            <div key={faculty} className='faculty-section'>
              <h3 className='faculty-title'>{faculty}</h3>
              {Object.entries(departments).map(([department, students]) => {
                const bursaryStatus = calculateClearanceStatus(
                  bursaryRequests.filter(
                    (req) =>
                      req.department === department && req.faculty === faculty
                  )
                );
                const libraryStatus = calculateClearanceStatus(
                  libraryRequests.filter(
                    (req) =>
                      req.department === department && req.faculty === faculty
                  )
                );

                return (
                  <div key={department} className='department-section'>
                    <h4 className='department-title'>{department}</h4>
                    <p>Total Students: {students.length}</p>
                    <div className='clearance-summary'>
                      <div>
                        <h5>Bursary Clearance</h5>
                        <p>Total Requests: {bursaryStatus.total}</p>
                        <p>Pending: {bursaryStatus.pending}</p>
                        <p>Completed: {bursaryStatus.completed}</p>
                      </div>
                      <div>
                        <h5>Library Clearance</h5>
                        <p>Total Requests: {libraryStatus.total}</p>
                        <p>Pending: {libraryStatus.pending}</p>
                        <p>Completed: {libraryStatus.completed}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </AdDashboardLayout>
  );
};

export default AdDashboard;