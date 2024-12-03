import logo from '../../images/logo.jpg';
import './Login.css';
import AdminIcon from '../../assets/admin';
import StudentIcon from '../../assets/stud';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='login'>
      <div className='login-body'>
        <img src={logo} alt='' className='login-logo' />
        <p className='login-head'>Modibbo Adama University Clearance System</p>
        <p className='login-sub'>Login to your portal</p>
        <div className='login-card'>
          <Link to='/student' className='login-button'>
            <StudentIcon />
            Student
          </Link>
          <Link to='/admin' className='login-button'>
            <AdminIcon />
            Admin
          </Link>
          <a href='Proreg.html' className='reg'>
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
