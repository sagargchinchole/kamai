import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Snackbar,MenuItem } from "@mui/material";

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
    value: 'Reliance_Digital',
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
    value: 'MIStore',
    label: 'MI Store',
  },
];

export default function DealForm({ open, onClose, dealData, dialogTitle }) {
  const defaultDealData = {
    description: "",
    link: "",
    platform: "",
    price: "",
    returnAmt: "",
    title: "",
  };

  const [formData, setFormData] = useState(dealData || defaultDealData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
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
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Return Amount"
              variant="outlined"
              type="number"
              name="returnAmt"
              value={formData.returnAmt}
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
        <Alert severity="success">Deal created successfully!</Alert>
      </Snackbar>
    </Box>
  )
}
