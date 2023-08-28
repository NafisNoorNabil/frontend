import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Admin.css";

import AdminNav from "../components/AdminNav";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('/api/user')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const deleteUser = (userId) => {
    axios.delete(`/api/user/${userId}`)
      .then(response => {
        console.log('User deleted successfully');
        fetchUsers(); // Refresh the user list after deletion
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };



  return (
    <div>
      <AdminNav />
      <div className="admin-content">
        <h1>User Information</h1>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>
  
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
