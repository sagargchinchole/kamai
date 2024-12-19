import React, { useEffect,useState } from "react";
import Grid from '@mui/material/Grid2';
import UserProductCard from '../components/UserProductCard';
import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

const ProductList = () => {

  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/activeJobs`,
          { headers: { Authorization: `Bearer ${token}` } });
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={job._id}>
            <UserProductCard card={job} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductList;