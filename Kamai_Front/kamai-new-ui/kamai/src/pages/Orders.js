import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'user', headerName: 'User', width: 150 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'trackingId', headerName: 'Tracking ID', width: 150},
  { field: 'acceptedDate', headerName: 'Delivery Date', width: 150, type:'date',
    valueFormatter: ( value) => {
      if (!value) return '';
      const date = new Date(value);
      return `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('en-US', {
        month: 'short',
      })}-${date.getFullYear()}`;
    },

   }
];
const rows= [
  {
    "id": "ORD10001",
    "user": "Sagar",
    "jobId": "64d2f5b8e123456789job001",
    "status": "pending",
    "productOrderId": "PROD00001",
    "trackingId": "TRACK00001",
    "otp": 1234,
    "lastFourDigit": 9876,
    "acceptedDate": "2024-12-04"
  },
  {
    "id": "ORD10002",
    "user": "Sachin",
    "jobId": "64d2f5b8e123456789job002",
    "status": "accepted",
    "productOrderId": "PROD00002",
    "trackingId": "TRACK00002",
    "otp": 2345,
    "lastFourDigit": 8765,
    "acceptedDate": "2024-12-04"
  },
  {
    "id": "ORD10003",
    "user": "Yuvraj",
    "jobId": "64d2f5b8e123456789job003",
    "status": "confirmed",
    "productOrderId": "PROD00003",
    "trackingId": "TRACK00003",
    "otp": 3456,
    "lastFourDigit": 7654,
    "acceptedDate": "2024-12-04"
  },
  {
    "id": "ORD10004",
    "user": "Sagar",
    "jobId": "64d2f5b8e123456789job004",
    "status": "shipped",
    "productOrderId": "PROD00004",
    "trackingId": "TRACK00004",
    "otp": 4567,
    "lastFourDigit": 6543,
    "acceptedDate": "2024-12-05"
  },
  {
    "id": "ORD10005",
    "user": "Sagar",
    "jobId": "64d2f5b8e123456789job005",
    "status": "ofd",
    "productOrderId": "PROD00005",
    "trackingId": "TRACK00005",
    "otp": 5678,
    "lastFourDigit": 5432,
    "acceptedDate": "2024-12-03"
  },
  {
    "id": "ORD10006",
    "user": "Sagar",
    "jobId": "64d2f5b8e123456789job006",
    "status": "delivered",
    "productOrderId": "PROD00006",
    "trackingId": "TRACK00006",
    "otp": 6789,
    "lastFourDigit": 4321,
    "acceptedDate": "2024-11-04"
  },
  {
    "id": "ORD10007",
    "user": "Sagar",
    "jobId": "64d2f5b8e123456789job007",
    "status": "completed",
    "productOrderId": "PROD00007",
    "trackingId": "TRACK00007",
    "otp": 7890,
    "lastFourDigit": 3210,
    "acceptedDate": "2024-11-14"
  },
  {
    "id": "ORD10008",
    "user": "Sagar",
    "jobId": "64d2f5b8e123456789job008",
    "status": "canceled",
    "productOrderId": "PROD00008",
    "trackingId": "TRACK00008",
    "otp": 8901,
    "lastFourDigit": 2109,
    "acceptedDate": "2024-12-04"
  },
  {
    "id": "ORD10009",
    "user": "Sagar",
    "jobId": "64d2f5b8e123456789job009",
    "status": "pending",
    "productOrderId": "PROD00009",
    "trackingId": "TRACK00009",
    "otp": 9012,
    "lastFourDigit": 1098,
    "acceptedDate": "2024-12-04"
  },
  {
    "id": "ORD10010",
    "user": "Sagar",
    "jobId": "64d2f5b8e123456789job010",
    "status": "accepted",
    "productOrderId": "PROD00010",
    "trackingId": "TRACK00010",
    "otp": 1123,
    "lastFourDigit": 9870,
    "acceptedDate": "2024-12-04"
  }
]

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
  // const [rows, setRows] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const fetchData = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     // Replace this with your actual API endpoint
  //     const response = await fetch('https://jsonplaceholder.typicode.com/users');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.json();

  //     // Transform the data to match the table schema
  //     const transformedData = data.map((user, index) => ({
  //       id: user.id,
  //       firstName: user.name.split(' ')[0],
  //       lastName: user.name.split(' ')[1] || '',
  //       age: Math.floor(Math.random() * 50) + 20, // Random age for demo
  //     }));

  //     setRows(transformedData);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(); // Fetch data when the component mounts
  // }, []);

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
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          slots={{
            toolbar: CustomToolbar,
          }}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
