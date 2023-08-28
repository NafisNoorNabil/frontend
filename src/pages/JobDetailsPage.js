import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBookmark,FaCheck,FaBuilding, FaUserTie, FaMoneyBillAlt, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthcontext';


const JobDetailsPage = () => {
  const [isJobApplied, setIsJobApplied] = useState(false);



  const { user } = useAuthContext();
  const userId=user.id;

  const { id } = useParams();
  const jobId=id
  const addAppliedJob = async () => {
    try {
      const response = await fetch('/api/applied', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userId, jobid: jobId }),
      });

      if (response.ok) {
        console.log('Applied job added successfully!');
        setIsJobApplied(true);
        setIsPopupOpen(false);
      } else {
        console.error('Failed to add applied job');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const [jobDetails, setJobDetails] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {

    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/jobdata/${id}`);
        if (response.ok) {
          const json = await response.json();
          setJobDetails(json);
        } else {
          // Handle error here if needed
        }
      } catch (error) {
        // Handle error here if needed
      }
    };

    fetchJobDetails();
  }, [id]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUploadResume = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append('resume', file);

        const response = await fetch(`/api/uploadResume`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Handle successful upload
          console.log('Resume uploaded successfully');
        } else {
          // Handle upload error
          console.error('Error uploading resume');
        }
      } catch (error) {
        // Handle upload error
        console.error('Error uploading resume', error);
      }
    }
  };


  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isJobApplied && <div className="job-applied-header">Job applied</div>} {/* Render the header if job is applied */}
      <div className="job-details-page">
        <h2>{jobDetails.title}</h2>
        <p><FaBuilding /> Company: {jobDetails.company}</p>
      <p><FaUserTie /> Position: {jobDetails.position}</p>
      <p><FaMoneyBillAlt /> Salary: {jobDetails.salary}tk</p>
      <p><FaMapMarkerAlt /> Location: {jobDetails.location}</p>
      <p><FaClipboardList /> Job Type: {jobDetails.jobtype}</p>

      
        <p class="details"><strong>About The Job</strong><br/>{jobDetails.details}</p>
        <button className="seemore" onClick={openPopup}>Apply</button>
      </div>

      <div className="jobpostbtn">
          <Link to="/form">

          </Link>
          <button>
              <FaBookmark  /> Saved Jobs
            </button>


            <Link to="/MyApplied"><button><FaCheck  /> Jobs Applied</button></Link>

            
        </div>

      <div className={`popup-overlay ${isPopupOpen ? 'active' : ''}`} onClick={closePopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <h3>Provide Resume</h3>
          <button><input type="file" accept=".pdf" onChange={handleUploadResume}/></button>

          <button onClick={addAppliedJob}>Accept</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;