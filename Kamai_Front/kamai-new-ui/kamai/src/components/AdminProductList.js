import React, { useEffect,useState } from "react";
import Grid from '@mui/material/Grid2';
import ProductCard from './ProductCard';
import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DealForm from "./DealForm";
import axios from "axios";

const AdminProductList = () => {

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  const title="Add New Deal"
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
      setIsOpen(false); // Close dialog if no unsaved changes
    };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
        <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Add Deal</Button>
      </Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={job._id}>
            <ProductCard card={job} />
          </Grid>
        ))}
      </Grid>

      <DealForm open={isOpen} onClose={handleClose} dialogTitle={title}/>
    </Box>
  )
}

export default AdminProductList;