// SearchResults.js
import React from "react";
import { useLocation } from "react-router-dom";
import JobDetails from "../components/JobDetails";

const SearchResults = ({ jobs }) => { // Receive the jobs data as a prop
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("term");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-results">
      <h2>Search Results for "{searchTerm}"</h2>
      <div className="jobs">
        {filteredJobs.map((job) => (
          <JobDetails key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
