import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Tooltip} from "@mui/material";
import Grid from "@mui/material/Grid2"
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function AccountDetails({ open, onClose, accountDetails }) {
  const { accountNo, ifsc, accountName, upi } = accountDetails;

  const handleCopy = (value) => {
    console.log(value)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value)
    }
    alert(`Copied to clipboard: ${value}`);
  };

  return (
    <Box>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{accountDetails.accountName}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} container alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <strong>Account No:</strong> {accountNo || "N/A"}
              </Typography>
              {accountNo && (
                <Tooltip title="Copy Account No">
                  <IconButton onClick={() => handleCopy(accountNo)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <strong>IFSC:</strong> {ifsc || "N/A"}
              </Typography>
              {ifsc && (
                <Tooltip title="Copy IFSC">
                  <IconButton onClick={() => handleCopy(ifsc)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <strong>Account Name:</strong> {accountName || "N/A"}
              </Typography>
              {accountName && (
                <Tooltip title="Copy Account Name">
                  <IconButton onClick={() => handleCopy(accountName)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <strong>UPI:</strong> {upi || "N/A"}
              </Typography>
              {upi && (
                <Tooltip title="Copy UPI">
                  <IconButton onClick={() => handleCopy(upi)}>
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
