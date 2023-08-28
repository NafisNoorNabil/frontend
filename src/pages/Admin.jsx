import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Admin.css";
import { FaUserTie,  FaBriefcase,FaRegFileAlt } from 'react-icons/fa';

import AdminNav from "../components/AdminNav";

function Admin() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchJobs();  // Call the function to fetch jobs as well
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

  const fetchJobs = () => {
    axios.get('/api/jobdata')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  };

  const userCount = users.length;
  const jobCount= jobs.length;
  const [appliedJobs, setAppliedJobs] = useState([]);




  useEffect(() => {
      const fetchAppliedJobs = async () => {
          try {
              const response = await axios.get("/api/applied/");
              setAppliedJobs(response.data.appliedJobs);
          } catch (error) {
              console.error("Error fetching applied jobs:", error);
          }
      };

      fetchAppliedJobs();
  }, []);

  useEffect(() => {
      const fetchJobs = async () => {
          try {
              const response = await fetch("/api/jobdata");
              if (response.ok) {
                  const json = await response.json();
                  setJobs(json);
              } else {
                  console.error("Error fetching jobs:", response.statusText);
              }
          } catch (error) {
              console.error("Error fetching jobs:", error);
          }
      };

      fetchJobs();
  }, []);

  useEffect(() => {
      fetchUsers();
  }, []);
  const groupedData = {};
  appliedJobs.forEach((appliedJob) => {
      const user = users.find((user) => user._id === appliedJob.userid);
      const job = jobs.find((job) => job._id === appliedJob.jobid);
  
      if (user && job) {
          const key = `${user._id}-${job._id}`;
          if (!groupedData[key]) {
              groupedData[key] = { user, job };
          }
      }
  });
  


// Assuming you have already populated the groupedData object

const count = Object.keys(groupedData).length;


  
  return (
    <div >

      <AdminNav />
      <h1 className='dashboard'>Dashboard</h1>
      <div className='adminuser-content'>
        
        <div className="user-count">
            <h2><FaUserTie /></h2>
          <h2>Total Users</h2>
          <p>{userCount}</p>
        </div>

        <div className="user-count">
            <h2><FaBriefcase /></h2>
          <h2>Total Jobs </h2>
          <p>{jobCount}</p>
        </div>
        <div className="user-count">
            <h2> <FaRegFileAlt /></h2>
          <h2>Applications </h2>
          <p>{count}</p>
        </div>
        
      </div>
    </div>
  );
}
export default Admin;
