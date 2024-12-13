import { Box, Button, Card, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
export default function MyOrderDetails() {

  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [order, setOrder] = useState({});

  const [statusMap] = useState({
    'accepted': 1,
    'confirmed': 2,
    'shipped': 3,
    'ofd': 4,
    'delivered': 5
  });

  const [TextFieldMap] = useState({
    'accepted': "Order ID",
    'confirmed': "Tracking ID ",
    'shipped': "Delivery OTP"
  });

  const steps = [
    'Accepted',
    'Confirmed',
    'Shipped',
    'Out For Delivery',
    'Delivered',
  ];

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`,
          { headers: { Authorization: `Bearer ${token}` } });
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, [token, id]);

  return (
    <Box>
      <Box sx={{ width: '90%', m: 2 }}>
        <Stepper activeStep={statusMap[order.status]} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container spacing={2} sx={{mt:2}} alignItems="center">
          {/* TextField */}
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              label={TextFieldMap[order.status]}
              variant="outlined"
              fullWidth
              sx={{
                height: '40',
                '& .MuiOutlinedInput-root': { height: '40' }, // Ensure consistent height
              }}
            />
          </Grid>

          {/* Button */}
          <Grid item xs={4}>
            <Button
              variant="contained"
              size="small"
              fullWidth
              sx={{
                height: 40, // Match TextField height
              }}
            >
              Proceed
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Card>
        
      </Card>
    </Box>
  )
}
