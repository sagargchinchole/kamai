import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Snackbar, MenuItem } from "@mui/material";
import axios from "axios";
const platforms = [
  {
    value: 'Amazon',
    label: 'Amazon',
  },
  {
    value: 'Flipkart',
    label: 'Flipkart',
  },
  {
    value: 'Reliance Digital',
    label: 'Reliance Digital',
  },
  {
    value: 'Jiomart',
    label: 'Jiomart',
  },
  {
    value: 'Croma',
    label: 'Croma',
  },
  {
    value: 'Mi Store',
    label: 'Mi Store',
  },
];

export default function DealForm({ open, onClose, dealData, dialogTitle }) {
  const defaultDealData = {
    description: "",
    link: "",
    platform: "",
    orderAmount: "",
    returnAmount: "",
    title: "",
    _id:""
  };

  const [formData, setFormData] = useState(dealData || defaultDealData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log(formData);

  const handleSubmit = async (e) => {

    const token = localStorage.getItem('token');
    e.preventDefault();
    const title = formData.title;
    const description = formData.description;
    const link = formData.link;
    const platform = formData.platform;
    const returnAmount = formData.returnAmount;
    const orderAmount = formData.orderAmount;
    if (dialogTitle.includes("Add New Deal")) {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs`,
        { title, description, link, platform, returnAmount, orderAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201)
        setOpenSnackbar(true);
    }
    else {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs/${formData._id}`,
        { title, description, link, platform, returnAmount, orderAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200)
        setOpenSnackbar(true);
    }
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
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <form id="create-deal-form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              label="Deal Title"
              variant="outlined"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Platform"
              variant="outlined"
              select
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required

            >{platforms.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </TextField>
            <TextField
              fullWidth
              margin="dense"
              label="Order Amount"
              variant="outlined"
              type="number"
              name="orderAmount"
              value={formData.orderAmount}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Return Amount"
              variant="outlined"
              type="number"
              name="returnAmount"
              value={formData.returnAmount}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Product Link"
              variant="outlined"
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </form>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button type="submit" form="create-deal-form" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">{`Deal ${dialogTitle.includes("Add New Deal")? 'created' : 'updated'} successfully!`}</Alert>
      </Snackbar>
    </Box>
  )
}
