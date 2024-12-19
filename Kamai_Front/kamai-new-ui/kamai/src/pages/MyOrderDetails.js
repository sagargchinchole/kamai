import { Box, Button, Card, CardContent, Stack, Step, StepButton, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { useNavigate, useParams } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function MyOrderDetails() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const session = JSON.parse(localStorage.getItem('session'));

  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [inputValue, setInputValue] = useState('');

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
  }, []);

  const handleSave = async (currentStatus) => {
    const payload = {};
    if (currentStatus === 'accepted') {
      payload.productOrderId = inputValue;
      payload.status = "confirmed";
    } else if (currentStatus === 'confirmed') {
      payload.shippingId = inputValue;
      payload.status = "shipped";
    } else if (currentStatus === 'shipped') {
      const fields = inputValue.split('-');
      if(fields.size === 2) {
        payload.mobileLast4Digits = fields[1]
      }
      payload.otp = fields[0];
      payload.status = "ofd";
    }
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`, payload,
      { headers: { Authorization: `Bearer ${token}` } });
    window.location.reload();
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Box>
      <Card sx={{ m: 1 }}>
        <Box sx={{ width: '90%', m: 1 }}>
          <Stepper activeStep={statusMap[order.status]} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepButton color="inherit">
                {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          {(order.status === 'delivered' || order.status === "ofd") ? <></> :
          <Stack direction={'column'} spacing={0.5}>
            <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
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
                  value={inputValue}
                  onChange={handleInputChange}
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
                  onClick={() => handleSave(order.status)}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
            {order.status === 'shipped' && (
              <Typography variant='caption'>
                Enter the otp and mobile last 4 digit separated by '-' <br/>(e.g. 123456-4477)
              </Typography>
            )}
            </Stack>
          }
        </Box>
      </Card>
      <Card sx={{ m: 1 }}>
        <CardContent>
          <Stack direction={'column'} spacing={1}>
            <Stack direction={'row'} spacing={2}>
              <img src={order.image} height='50' width='100' ></img>
              <Typography>
                {order.name}
              </Typography>
              <img src={`/assets/${order?.platform?.toLowerCase().replace(/\s+/g, '')}.png`} height='30' width='70' ></img>
            </Stack>
            <Typography variant='caption'><b>Order Id: {order.orderId}</b></Typography>
            <Typography variant='caption'><b>Status: {order.status?.toUpperCase()}</b></Typography>

          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ m: 1 }}>
        <CardContent>
          <Typography variant='h6'>Delivery Details</Typography>
          <Stack direction={'column'} spacing={1} sx={{ ml: 3, mt: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant='body2'>{session?.user?.name} tz </Typography>
              <CopyToClipboard text={`${session?.user?.name} tz`}>
                <ContentCopyIcon fontSize='small' />
              </CopyToClipboard>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant='body2'>Nikki Girlz Hostel</Typography>
              <CopyToClipboard text='Nikki Girlz Hostel'>
                <ContentCopyIcon fontSize='small' />
              </CopyToClipboard>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant='body2'>Bazaar Samiti</Typography>
              <CopyToClipboard text='Bazaar Samiti'>
                <ContentCopyIcon fontSize='small' />
              </CopyToClipboard>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant='body2'>Near Rajeev Ranjan Classes</Typography>
              <CopyToClipboard text='Near Rajeev Ranjan Classes'>
                <ContentCopyIcon fontSize='small' />
              </CopyToClipboard>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant='body2'>800016</Typography>
              <CopyToClipboard text='800016'>
                <ContentCopyIcon fontSize='small' />
              </CopyToClipboard>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ m: 1 }}>
        <CardContent>
          <Typography variant='h6'>Earning Details</Typography>
          <Grid container xs={4} spacing={1} sx={{ mt: 1 }}>
            <Card sx={{ width: 150 }}>
              <CardContent>
                <Stack direction={'row'}>
                  <Box maxWidth={'100'}>
                    <Typography variant='body2'>You'll spend</Typography>
                    <Typography>{order.orderAmount}</Typography>
                  </Box>
                  <ArrowCircleDownIcon sx={{ mt: 2, ml: 2 }} color='warning' />
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ width: 150 }}>
              <CardContent>
                <Stack direction={'row'}>
                  <Box maxWidth={'100'}>
                    <Typography variant='body2'>You'll get</Typography>
                    <Typography>{order.returnAmount}</Typography>
                  </Box>
                  <ArrowCircleUpIcon sx={{ mt: 2, ml: 2 }} color='info' />
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ width: 150 }}>
              <CardContent>
                <Stack direction={'row'}>
                  <Box maxWidth={'100'}>
                    <Typography variant='body2'>You'll earn</Typography>
                    <Typography>{order.returnAmount - order.orderAmount}</Typography>
                  </Box>
                  <ArrowCircleUpIcon sx={{ mt: 2, ml: 2 }} color='success' />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
