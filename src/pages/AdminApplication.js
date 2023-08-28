import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Admin.css";
import AdminNav from "../components/AdminNav";

const AdminApplication = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

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
    








    const matchedData = Object.values(groupedData);
    
    return (
        <div>
            <AdminNav />
            <div className="admin-content">
                <h1>Job Applications</h1>
                <table className="job-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Title</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchedData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.user.username}</td>
                                <td>{data.user.phone}</td>
                                <td>{data.user.email}</td>
                                <td>{data.job.title}</td>
                                <td>{data.job.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
                    }    

export default AdminApplication;
