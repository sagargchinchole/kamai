import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Import Grid2
import axios from 'axios';

const BankDetailsPage = () => {
  const [bankDetails, setBankDetails] = useState({
    bank: '',
    accountNo: '',
    accountName: '',
    ifsc: '',
    upi: '',
  });

  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  const handleSave = async () => {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/profile`, bankDetails,
      { headers: { Authorization: `Bearer ${token}` } });
      if(response.status === 200)
      {
        setIsEditing(false);
      }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/profile`,
          { headers: { Authorization: `Bearer ${token}` } });

          if (Object.values(response.data).every((value) => !value)) {
            // If all values are empty, enable editing mode
            setIsEditing(true);
          } else {
            setBankDetails(response.data);
            setIsEditing(false);
          }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, []);

  return (
    <Card sx={{ maxWidth: 600, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {isEditing ? 'Add/Edit Bank Details' : 'Bank Details'}
        </Typography>
        <Grid container spacing={2}>
          {isEditing ? (
            <>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bank"
                  value={bankDetails.bank}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="accountNumber"
                  value={bankDetails.accountNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Account Name"
                  name="accountName"
                  value={bankDetails.accountName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="IFSC Code"
                  name="ifsc"
                  value={bankDetails.ifsc}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="UPI ID"
                  name="upi"
                  value={bankDetails.upi}
                  onChange={handleChange}
                />
              </Grid>
            </>
          ) : (
            <Grid xs={12}>
              <Typography><strong>Bank Name:</strong> {bankDetails.bank}</Typography>
              <Typography><strong>Account Number:</strong> {bankDetails.accountNo}</Typography>
              <Typography><strong>Account Name:</strong> {bankDetails.accountName}</Typography>
              <Typography><strong>IFSC Code:</strong> {bankDetails.ifsc}</Typography>
              <Typography><strong>UPI ID:</strong> {bankDetails.upi}</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions>
        {isEditing ? (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BankDetailsPage;
