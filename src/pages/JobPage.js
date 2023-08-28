import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobDetails from "../components/JobDetails";
import About from "../components/about";
import Search from "../components/Search";
import { FaBookmark,FaCheck } from 'react-icons/fa';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs
  const [visibleJobs, setVisibleJobs] = useState(4); // Number of jobs to display initially
  const [sortType, setSortType] = useState(null); // Sorting type: "title", "salary", or "location"

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("/api/jobdata");
      const json = await response.json();

      if (response.ok) {
        setJobs(json);
        setFilteredJobs(json); // Initialize filtered jobs with all jobs on first load
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // When jobs change, reset the visibleJobs state to the initial value (5)
    setVisibleJobs(5);
  }, [jobs]);

  const loadMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5); // Increase the number of visible jobs by 5
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const sortedJobs = () => {
    let sorted = [...filteredJobs];
    if (sortType === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "salary") {
      sorted.sort((a, b) => b.salary - a.salary);
    }
    return sorted;
  };

  return (
    <div>
      <div className="home">
        <div className="filtersection">
          <Search jobs={jobs} setFilteredJobs={setFilteredJobs} />
          <div className="sort-options">
            <span>Sort By: </span>
            <select value={sortType} onChange={handleSortChange}>
              <option value="">Recently Added</option>
              <option value="title">Title</option>
              <option value="salary">Salary</option>
            </select>
        </div>
        </div>

        <div className="jobs">
          {sortedJobs().slice(0, visibleJobs).map((job) => (
            <JobDetails key={job._id} job={job} />
          ))}
        </div>
        <div className="jobpostbtn">
          <Link to="/form">

          </Link>
          
          <Link to="/MySaved"><button><FaBookmark  /> Saved Jobs</button></Link>
          <Link to="/MyApplied"><button><FaCheck  /> Jobs Applied</button></Link>


        </div>

        {visibleJobs < sortedJobs().length && (
          <button className="seemore" onClick={loadMoreJobs}>
            See More
          </button>
        )}
        <About />
      </div>
    </div>
  );
};

export default Home;
