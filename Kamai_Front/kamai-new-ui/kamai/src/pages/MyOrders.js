import { Box, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard';
import axios from 'axios';
import Orders from './Orders';


const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/myOrders`,
          { headers: { Authorization: `Bearer ${token}` } });
        setMyOrders(response.data);
        console.log(Orders)
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Orders
      </Typography>
      <Grid2 sm={12} lg={12} xl={12} container spacing={0.5}>
        {myOrders.map((order) => (
          <OrderCard order={order} />
        ))}
      </Grid2>
    </Box>
  )
};
export default MyOrders;