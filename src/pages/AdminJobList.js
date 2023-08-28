import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Admin.css";
import AdminNav from "../components/AdminNav";

const AdminJobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from the server
    axios.get('/api/jobdata') // Change the URL to match your API endpoint
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/jobdata/${id}`); // Change the URL to match your delete endpoint
      if (response.status === 200) {
        // Remove the deleted job from the state
        setJobs(jobs.filter(job => job._id !== id));
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  // 
  return (
    <div>
      <AdminNav />
      <div className="admin-content">
        <h1>Job List</h1>
        <table className="job-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Salary</th>
              <th>Type</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.salary}tk</td>
                <td>{job.jobtype}</td>
                <td>{job.location}</td>
                <td>
                  <button onClick={() => handleDelete(job._id)}>Delete</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobList;
