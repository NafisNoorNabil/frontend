import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBuilding, FaUserTie, FaMoneyBillAlt, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthcontext';

const MyApplied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

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


  
  const { user } = useAuthContext();
  const userId=user.id;

  const matchingJobs = jobs.filter(job => appliedJobs.some(appliedJob => appliedJob.jobid === job._id && appliedJob.userid===userId));

  
  return (
    <div class="appliedjobs">
      <h1>My Applied Jobs</h1>
      <div className="jobs">
        <ul >
          {matchingJobs.map(job => (
            <div key={job._id} className="job-details-page">
              <h2>{job.title}</h2>
              <p><FaBuilding /> Company: {job.company}</p>
              <p><FaUserTie /> Position: {job.position}</p>
              <p><FaMoneyBillAlt /> Salary: {job.salary}tk</p>
              <p><FaMapMarkerAlt /> Location: {job.location}</p>
              <p><FaClipboardList /> Job Type: {job.jobtype}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyApplied;
