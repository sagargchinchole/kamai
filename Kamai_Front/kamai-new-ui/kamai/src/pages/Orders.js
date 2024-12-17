import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from "axios";
import { Alert, Button, Snackbar, Stack } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

const columns = [
  { field: 'orderId', headerName: 'Order ID', width: 150 },
  { field: 'userName', headerName: 'User', width: 150 },
  { field: 'productName', headerName: 'Product', width: 150 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'productOrderId', headerName: 'Product Order ID', width: 150 },
  { field: 'trackingId', headerName: 'Tracking ID', width: 150 },
  { field: 'otp', headerName: 'OTP', width: 150 },
  { field: 'lastFourDigit', headerName: 'Mobile 4 Digit', width: 150 },
  {
    field: 'acceptedDate', headerName: 'Order Date', width: 150, type: 'date',
    valueFormatter: (value) => {
      if (!value) return '';
      const date = new Date(value);
      return `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('en-US', {
        month: 'short',
      })}-${date.getFullYear()}`;
    },
  },
  {
    field: 'deliveryDate', headerName: 'Delivery Date', width: 150, type: 'date',
    valueFormatter: (value) => {
      if (!value) return '';
      const date = new Date(value);
      return `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('en-US', {
        month: 'short',
      })}-${date.getFullYear()}`;
    },
  }
];

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
  const defualtFormData = {
    name: "",
    email: "",
    password: "",
    mobile: ""
  }

  const token = localStorage.getItem('token');
  const [orders, setOrders] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [formData, setFormData] = useState(defualtFormData);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  const handleRowSelection = (ids) => {
    const selectedRowData = orders.find((row) => row._id === ids[0]);
    setSelectedRow(selectedRowData);
  };

  const handleEditClick = () => {
    if (selectedRow) {
      setFormData(selectedRow); // Pre-fill form with row data
      setOpen(true); // Open dialog
    }
  };

  const handleMarkDeliver = async () => {
    if (selectedRow) {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        { id: selectedRow._id, status: "delivered", deliveryDate: Date.now() },
        { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) {
        setOpenSnackbar(true);
        setSnackbarMsg(response.data.message);
      }
    }
  };

  const handleMarkCancel = async () => {
    if (selectedRow) {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        { id: selectedRow._id, status: "cancelled" }, { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) {
        setOpenSnackbar(true);
        setSnackbarMsg(response.data.message);
      }
    }
  }

  return (
    <Box sx={{ margin: "1rem" }}>
      <Stack direction={'row'} spacing={1}>
        <Button
          size='small'
          variant="contained"
          color="primary"
          disabled={!selectedRow}
          onClick={() => handleEditClick}
          startIcon=<ModeEditIcon />
        >
          Edit
        </Button>
        <Button
          size='small'
          variant="contained"
          color="primary"
          disabled={!selectedRow}
          onClick={() => handleMarkDeliver()}
          startIcon=<DoneAllRoundedIcon />
        >
          Mark Delivered
        </Button>
        <Button
          size='small'
          variant="contained"
          color="primary"
          disabled={!selectedRow}
          onClick={() => handleMarkCancel()}
          startIcon=<DoDisturbAltIcon />
        >
          Mark Cancelled
        </Button>
      </Stack>
      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSizeOptions={[10, 15, 20]} // Custom options for rows per page
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          pagination
          sx={{ border: 0 }}
          getRowId={(row) => row._id}
          slots={{
            toolbar: CustomToolbar,
          }}
          density={'compact'}

          onRowSelectionModelChange={handleRowSelection}
        />
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">{snackbarMsg}</Alert>
      </Snackbar>
    </Box>
  );
}
