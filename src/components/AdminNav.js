import React from 'react'; // Don't forget to import React
import { Link } from 'react-router-dom';
import "../styles/AdminNav.css";

const AdminNav = () => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className='logo'>
          <img src="logo.png" alt="" />
        </div>
        <h1>Admin Panel</h1>
        <ul className="admin-links">
        
          <Link to="/AdminUser"><li>Users</li></Link>
          <Link to="/AdminApplication"><li>Applications</li></Link>
          <Link to="/AdminJobList"><li>Job Listings</li></Link>
          <Link to="/Admin"><li>Analytics</li></Link>
        </ul>
      </div>
    </div>
  );
}

export default AdminNav; // Don't forget to export the component
