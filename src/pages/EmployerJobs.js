    import React, { useEffect, useState } from "react";

    import About from "../components/about";
    import Search from "../components/Search";
    import {FaBuilding,FaUserTie,FaMoneyBillAlt,FaMapMarkerAlt,FaClipboardList} from "react-icons/fa";

    const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [visibleJobs, setVisibleJobs] = useState(5);
    const [sortType, setSortType] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
        const response = await fetch("/api/jobdata");
        const json = await response.json();

        if (response.ok) {
            setJobs(json);
            setFilteredJobs(json);
        }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        setVisibleJobs(5);
    }, [jobs]);

    const loadMoreJobs = () => {
        setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
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
            {sortedJobs()
                .slice(0, visibleJobs)
                .map((job) => (
                <div className="job-details-page">
                    <h2>{job.title}</h2>
                    <p>
                    <FaBuilding /> Company: {job.company}
                    </p>
                    <p>
                    <FaUserTie /> Position: {job.position}
                    </p>
                    <p>
                    <FaMoneyBillAlt /> Salary: {job.salary}tk
                    </p>
                    <p>
                    <FaMapMarkerAlt /> Location: {job.location}
                    </p>
                    <p>
                    <FaClipboardList /> Job Type: {job.jobtype}
                    </p>
                    <p class="details">
                    <strong>About The Job</strong>
                    <br />
                    {job.details}
                    </p>
                </div>
                ))}
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
