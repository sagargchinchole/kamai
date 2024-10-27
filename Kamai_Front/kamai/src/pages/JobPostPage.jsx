import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './JobPostPage.css'

const JobPostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [platform, setPlatform] = useState('');
  const [returnAmount, setReturnAmount] = useState('');
  const [orderAmount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePostJob = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs`,
        { title, description, link, platform, returnAmount, orderAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (error) {
      setErrorMessage('Failed to post job.');
      console.error('Error posting job:', error);
    }
  };

  return (
    <div className="post-job-container">
      <h2 className="post-job-title">Post a Job</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handlePostJob} className="post-job-form">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Product Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Order Amount"
          value={orderAmount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Return Amount"
          value={returnAmount}
          onChange={(e) => setReturnAmount(e.target.value)}
          required
        />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPostPage;
