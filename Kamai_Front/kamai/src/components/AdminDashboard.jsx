// File: src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsAndUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUserRole(userResponse.data.role);

        if (userResponse.data.role !== 'admin') {
          navigate('/dashboard'); // Redirect if not admin
          return;
        }

        const jobsResponse = await axios.get('http://localhost:5000/api/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersResponse = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setJobs(jobsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      }
    };

    fetchJobsAndUsers();
  }, []);

  const deleteJob = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      setError('Failed to delete job');
      console.error(error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}

      <section>
        <h2>Manage Jobs</h2>
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <button onClick={() => deleteJob(job._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Manage Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <p>{user.name} - {user.email}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
