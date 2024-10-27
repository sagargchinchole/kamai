import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => (
    <div>
      <h1>Dashboard</h1>
      <Link to="/jobs">View Available Jobs</Link> {/* Link to Job Listings */}
    </div>
  );

export default Dashboard;
