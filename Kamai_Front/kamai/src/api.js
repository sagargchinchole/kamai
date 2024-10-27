import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const fetchJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs`);
  return response.data;
};
