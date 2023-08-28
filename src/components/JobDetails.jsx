import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthcontext';

const JobDetails = ({ job }) => {
  const { user } = useAuthContext();
  const userId = user.id;

  const [isSaved, setIsSaved] = useState(false); // State to track saved status

  const addAppliedJob = async (jobId) => {
    try {
  
      // If the job is not already saved, then add it
      const addResponse = await fetch('/api/saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userId, jobid: jobId }),
      });
  
      if (addResponse.ok) {
        console.log('Applied job added successfully!');
        setIsSaved(true); // Update state to indicate job is saved
      } else {
        console.error('Failed to add applied job');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <div className="job-details">
      <h4>{job.title}</h4>
      <p><strong>Company: </strong>{job.company}</p>
      <p><strong>Position: </strong>{job.position}</p>
      <p><strong>Salary: </strong>{job.salary}tk</p>
      <p>{job.createdAt}</p>
      <Link to={`/jobs/${job._id}`}>View Details</Link>

      {/* Render the button with dynamic text and style */}
      <button
        className={`saved ${isSaved ? 'saved-active' : ''}`}
        onClick={() => addAppliedJob(job._id)}
        disabled={isSaved} // Disable button after saving
      >
        {isSaved ? 'Saved' : 'Save Job'}
      </button>
    </div>
  );
};

export default JobDetails;
