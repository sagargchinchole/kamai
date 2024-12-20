import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2"
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from 'axios';

export default function AccountDetails({ open, onClose, id }) {

  const [bankDetails, setBankDetails] = useState({});
  const handleCopy = (value) => {
    console.log(value)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value)
    }
    alert(`Copied to clipboard: ${value}`);
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (open) {
      const fetchProfile = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/userProfile`,
            { walletId: id }, { headers: { Authorization: `Bearer ${token}` } });
          setBankDetails(response.data);

        } catch (error) {
          console.log(error);
        }
      }
      fetchProfile();
    }
  }, [open, id, token]);

  return (
    <Box>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{bankDetails.accountName}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} container alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <strong>Account No:</strong> {bankDetails.accountNo || "N/A"}
              </Typography>
              {bankDetails.accountNo && (
                <Tooltip title="Copy Account No">
                  <IconButton onClick={() => handleCopy(bankDetails.accountNo)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <strong>IFSC:</strong> {bankDetails.ifsc || "N/A"}
              </Typography>
              {bankDetails.ifsc && (
                <Tooltip title="Copy IFSC">
                  <IconButton onClick={() => handleCopy(bankDetails.ifsc)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <strong>Account Name:</strong> {bankDetails.accountName || "N/A"}
              </Typography>
              {bankDetails.accountName && (
                <Tooltip title="Copy Account Name">
                  <IconButton onClick={() => handleCopy(bankDetails.accountName)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <strong>UPI:</strong> {bankDetails.upi || "N/A"}
              </Typography>
              {bankDetails.upi && (
                <Tooltip title="Copy UPI">
                  <IconButton onClick={() => handleCopy(bankDetails.upi)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
