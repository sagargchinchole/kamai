import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Snackbar,MenuItem } from "@mui/material";

const modes = [
  {
    value: 'cdm',
    label: 'CDM',
  },
  {
    value: 'imps',
    label: 'IMPS',
  },
  {
    value: 'upi',
    label: 'UPI',
  }
];

export default function AddPayForm({ open, onClose, userId }) {
  const defaultPayData = {
    accountNo: "",
    upi: "",
    date: "",
    amount: "",
    mode: ""
  };

  const [formData, setFormData] = useState(defaultPayData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>"Add Payment Details"</DialogTitle>
        <DialogContent>
          <form id="add-payment" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              label="Account Number"
              variant="outlined"
              name="accountNo"
              value={formData.accountNo}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="UPI"
              variant="outlined"
              name="upi"
              value={formData.upi}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Amount"
              variant="outlined"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Payment Date"
              variant="outlined"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Payment Mode"
              variant="outlined"
              select
              type="text"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required

            >{modes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </TextField>
          </form>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button type="submit" form="add-payment" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">Payment added successfully!</Alert>
      </Snackbar>
    </Box>
  )
}