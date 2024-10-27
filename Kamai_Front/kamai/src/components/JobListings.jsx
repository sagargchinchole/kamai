// File: src/pages/JobListings.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './JobListing.css';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

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
  
  /*const handleAcceptJob = async (job) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        { jobId: job._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Job accepted! Order created.');
      window.open(response.data.jobUrl, '_blank');
      setIsAccepted(true);

    } catch (error) {
      console.error(error);
      alert('Failed to accept job.');
    }
  };*/
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
              </Link>
              <p>{job.description}</p>
              <p>Order Amount: <b>{job.orderAmount}</b></p>
              <p>Return Amount: <b>{job.returnAmount}</b></p>
              <p>Earning: <b>{job.returnAmount - job.orderAmount}</b></p>
              {/*<button className="accept-button" onClick={handleAcceptJob(job)} disabled={isAccepted}>
                {isAccepted ? 'Order Accepted' : 'Accept Order'}
              </button>*/}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobListings;
