
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';

const columns = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'mobile', headerName: 'Mobile', width: 180 },
  { field: 'upi', headerName: 'UPI', width: 180 },
  { field: 'accountNo', headerName: 'Account Number', width: 220 },
  { field: 'ifsc', headerName: 'IFSC Code', width: 150 },
];

const rows = [
  {
    "name": "John Doe",
    "email": "john@outlook.com",
    "mobile": "+91-9276396460",
    "upi": "john@upi",
    "accountNo": "100000123456789",
    "ifsc": "HDFC0001234",
    "id": 1
  },
  {
    "name": "Jane Smith",
    "email": "jane@yahoo.com",
    "mobile": "+91-7570490397",
    "upi": "jane@upi",
    "accountNo": "100000234567890",
    "ifsc": "SBI0002345",
    "id": 2
  },
  {
    "name": "Michael Brown",
    "email": "mike@hotmail.com",
    "mobile": "+91-8146542447",
    "upi": "mike@upi",
    "accountNo": "100000345678901",
    "ifsc": "ICICI0003456",
    "id": 3
  },
  {
    "name": "Emily Davis",
    "email": "emily@yahoo.com",
    "mobile": "+91-8359771110",
    "upi": "emily@upi",
    "accountNo": "100000456789012",
    "ifsc": "AXIS0004567",
    "id": 4
  },
  {
    "name": "David Wilson",
    "email": "david@outlook.com",
    "mobile": "+91-7650598523",
    "upi": "david@upi",
    "accountNo": "100000567890123",
    "ifsc": "PNB0005678",
    "id": 5
  },
  {
    "name": "Sarah Moore",
    "email": "sarah@outlook.com",
    "mobile": "+91-9847937545",
    "upi": "sarah@upi",
    "accountNo": "100000678901234",
    "ifsc": "BOB0006789",
    "id": 6
  },
  {
    "name": "James Taylor",
    "email": "james@outlook.com",
    "mobile": "+91-8767393992",
    "upi": "james@upi",
    "accountNo": "100000789012345",
    "ifsc": "YES0007890",
    "id": 7
  },
  {
    "name": "Linda Harris",
    "email": "linda@yahoo.com",
    "mobile": "+91-7030848147",
    "upi": "linda@upi",
    "accountNo": "100000890123456",
    "ifsc": "BOM0008901",
    "id": 8
  },
  {
    "name": "Robert Clark",
    "email": "robert@hotmail.com",
    "mobile": "+91-9074126907",
    "upi": "robert@upi",
    "accountNo": "100000901234567",
    "ifsc": "KOTAK0009012",
    "id": 9
  },
  {
    "name": "Patricia Lewis",
    "email": "patricia@hotmail.com",
    "mobile": "+91-7697664990",
    "upi": "patricia@upi",
    "accountNo": "100000012345678",
    "ifsc": "IDBI0000123",
    "id": 10
  }
]

export default function Users() {

  const [dlgTitle, setDlgTitle] = useState();
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () =>() => {
    setOpen(false);
    setFormData({});
  };
  const handleSave = () =>() => {
    console.log('Updated Data:', formData);
    setOpen(false);
  };

  const handleInputChange = (e)=>() => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = ()=>() => {
    if (selectedRow) {
      setFormData(selectedRow); // Pre-fill form with row data
      setDlgTitle("Edit User");
      setOpen(true); // Open dialog
    }
  };

  const handleAddClick = () =>() => {
      setDlgTitle("Add User");
      setOpen(true); // Open dialog
    };

  const handleRowSelection = (ids) =>() =>  {
    const selectedRowData = rows.find((row) => row.id === ids[0]);
    setSelectedRow(selectedRowData);
  };

  return (
    <Box sx={{ margin: "1rem" }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedRow}
          onClick={handleEditClick}
          startIcon=<ModeEditIcon />
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          startIcon=<AddIcon />
        >
          Add
        </Button>
      </Stack>
      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          onRowSelectionModelChange={handleRowSelection}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dlgTitle}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={formData.email || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Mobile"
            name="mobile"
            fullWidth
            value={formData.mobile || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="UPI"
            name="upi"
            fullWidth
            value={formData.upi || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Account Number"
            name="accountNo"
            fullWidth
            value={formData.accountNo || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="IFSC Code"
            name="ifsc"
            fullWidth
            value={formData.ifsc || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
