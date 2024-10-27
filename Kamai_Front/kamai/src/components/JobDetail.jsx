// File: src/components/JobDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './JobDetail.css'

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');  
  const [orderStatus, setOrderStatus] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        setError('Error fetching job details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleAcceptJob = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/orders',
        { jobId: job._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Job accepted! Order created.');
      window.open(response.data.jobUrl, '_blank');
      setIsAccepted(true);
      setOrderStatus('Accepted');

    } catch (error) {
      console.error(error);
      alert('Failed to accept job.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div className="job-detail-container">
      <h1 className="job-detail-title">{job.title}</h1>
      <p className="job-detail-description">{job.description}</p>
      <p className="job-detail-status">Status: {isAccepted ? 'Accepted' : 'Not Accepted'}</p>
      <button className="accept-button" onClick={handleAcceptJob} disabled={isAccepted}>
        {isAccepted ? 'Order Accepted' : 'Accept Order'}
      </button>
    </div>
  );
};

export default JobDetail;
