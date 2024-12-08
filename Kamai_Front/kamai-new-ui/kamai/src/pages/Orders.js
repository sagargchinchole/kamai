import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from "axios";

const columns = [
  { field: 'orderId', headerName: 'Order ID', width: 150 },
  { field: 'userName', headerName: 'User', width: 150 },
  { field: 'productName', headerName: 'Product', width: 150 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'productOrderId', headerName: 'Product Order ID', width: 150},
  { field: 'trackingId', headerName: 'Tracking ID', width: 150},
  { field: 'otp', headerName: 'OTP', width: 150},
  { field: 'lastFourDigit', headerName: 'Mobile 4 Digit', width: 150},
  { field: 'acceptedDate', headerName: 'Order Date', width: 150, type:'date',
    valueFormatter: ( value) => {
      if (!value) return '';
      const date = new Date(value);
      return `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('en-US', {
        month: 'short',
      })}-${date.getFullYear()}`;
    },
   },
   { field: 'deliveryDate', headerName: 'Delivery Date', width: 150, type:'date',
    valueFormatter: ( value) => {
      if (!value) return '';
      const date = new Date(value);
      return `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('en-US', {
        month: 'short',
      })}-${date.getFullYear()}`;
    },
   }
];
// const rows= [
//   {
//     "id": "ORD10001",
//     "user": "Sagar",
//     "jobId": "64d2f5b8e123456789job001",
//     "status": "pending",
//     "productOrderId": "PROD00001",
//     "trackingId": "TRACK00001",
//     "otp": 1234,
//     "lastFourDigit": 9876,
//     "acceptedDate": "2024-12-04"
//   },
//   {
//     "id": "ORD10002",
//     "user": "Sachin",
//     "jobId": "64d2f5b8e123456789job002",
//     "status": "accepted",
//     "productOrderId": "PROD00002",
//     "trackingId": "TRACK00002",
//     "otp": 2345,
//     "lastFourDigit": 8765,
//     "acceptedDate": "2024-12-04"
//   },
//   {
//     "id": "ORD10003",
//     "user": "Yuvraj",
//     "jobId": "64d2f5b8e123456789job003",
//     "status": "confirmed",
//     "productOrderId": "PROD00003",
//     "trackingId": "TRACK00003",
//     "otp": 3456,
//     "lastFourDigit": 7654,
//     "acceptedDate": "2024-12-04"
//   },
//   {
//     "id": "ORD10004",
//     "user": "Sagar",
//     "jobId": "64d2f5b8e123456789job004",
//     "status": "shipped",
//     "productOrderId": "PROD00004",
//     "trackingId": "TRACK00004",
//     "otp": 4567,
//     "lastFourDigit": 6543,
//     "acceptedDate": "2024-12-05"
//   },
//   {
//     "id": "ORD10005",
//     "user": "Sagar",
//     "jobId": "64d2f5b8e123456789job005",
//     "status": "ofd",
//     "productOrderId": "PROD00005",
//     "trackingId": "TRACK00005",
//     "otp": 5678,
//     "lastFourDigit": 5432,
//     "acceptedDate": "2024-12-03"
//   },
//   {
//     "id": "ORD10006",
//     "user": "Sagar",
//     "jobId": "64d2f5b8e123456789job006",
//     "status": "delivered",
//     "productOrderId": "PROD00006",
//     "trackingId": "TRACK00006",
//     "otp": 6789,
//     "lastFourDigit": 4321,
//     "acceptedDate": "2024-11-04"
//   },
//   {
//     "id": "ORD10007",
//     "user": "Sagar",
//     "jobId": "64d2f5b8e123456789job007",
//     "status": "completed",
//     "productOrderId": "PROD00007",
//     "trackingId": "TRACK00007",
//     "otp": 7890,
//     "lastFourDigit": 3210,
//     "acceptedDate": "2024-11-14"
//   },
//   {
//     "id": "ORD10008",
//     "user": "Sagar",
//     "jobId": "64d2f5b8e123456789job008",
//     "status": "canceled",
//     "productOrderId": "PROD00008",
//     "trackingId": "TRACK00008",
//     "otp": 8901,
//     "lastFourDigit": 2109,
//     "acceptedDate": "2024-12-04"
//   },
//   {
//     "id": "ORD10009",
//     "user": "Sagar",
//     "jobId": "64d2f5b8e123456789job009",
//     "status": "pending",
//     "productOrderId": "PROD00009",
//     "trackingId": "TRACK00009",
//     "otp": 9012,
//     "lastFourDigit": 1098,
//     "acceptedDate": "2024-12-04"
//   },
//   {
//     "id": "ORD10010",
//     "user": "Sagar",
//     "jobId": "64d2f5b8e123456789job010",
//     "status": "accepted",
//     "productOrderId": "PROD00010",
//     "trackingId": "TRACK00010",
//     "otp": 1123,
//     "lastFourDigit": 9870,
//     "acceptedDate": "2024-12-04"
//   }
// ]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{
    hideFooter: true,
    hideToolbar: true,
  }}
/>
    </GridToolbarContainer>
  );
}

export default function Orders() {

  const token = localStorage.getItem('token');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        { headers: { Authorization: `Bearer ${token}` } });
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ margin: "1rem" }}>
      {/* <Stack direction="row" spacing={2} marginTop={2} marginBottom={2}>
        <Button variant="contained" size="small" onClick={fetchData}>
          Today
        </Button>
        <Button variant="contained" size="small" onClick={fetchData}>
          Yesterday
        </Button>
        <Button variant="contained" size="small" onClick={fetchData}>
          Custom Range
        </Button>
      </Stack> 
      
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>} */}

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          getRowId={(row) => row._id}
          slots={{
            toolbar: CustomToolbar,
          }}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
