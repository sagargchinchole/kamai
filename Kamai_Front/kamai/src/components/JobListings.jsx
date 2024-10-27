// File: src/pages/JobListings.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './JobListing.css';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/activeJobs`);
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="job-list-container">
      <div className="job-list">
        <h2>Active Deals</h2>
        <ul>
          {jobs.map((job) => (
            <div className="job-card">
              <Link to={`/jobs/${job._id}`}>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobListings;
