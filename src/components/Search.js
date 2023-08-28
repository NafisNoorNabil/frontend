import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
const Search = ({ jobs, setFilteredJobs }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter the jobs based on the search term
    const filteredJobs = jobs.filter((job) => {
      const title = job.title ? job.title.toLowerCase() : "";
      const company = job.company ? job.company.toLowerCase() : "";
      const location = job.location ? job.location.toLowerCase() : "";
      const position = job.position ? job.position.toLowerCase() : ""; // New line for searching based on position
      return (
        title.includes(searchTerm.toLowerCase()) ||
        company.includes(searchTerm.toLowerCase()) ||
        location.includes(searchTerm.toLowerCase()) ||
        position.includes(searchTerm.toLowerCase()) // New line for searching based on position
      );
    });

    // Update the filtered jobs state in the parent component
    setFilteredJobs(filteredJobs);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Job Title, Location, Keywords or Company"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit"><IoSearch /></button>
    </form>
  );
};

export default Search;
