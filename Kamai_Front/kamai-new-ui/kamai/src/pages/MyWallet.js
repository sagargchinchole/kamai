import { Typography, Card, CardContent,  Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import axios from 'axios';
export default function MyWallet() {

  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/wallet`,
          { headers: { Authorization: `Bearer ${token}` } });
        setWallet(response.data);
        wallet?.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(wallet.transactions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWallet();
  }, [token, wallet.transactions]);

  return (
    <Box>
      <Typography variant='h6' align="left" gutterBottom sx={{ m: 2 }}>Wallet Balance</Typography>
      <Typography variant="h4" color="primary" align="left" gutterBottom sx={{ m: 2 }}>
        <AccountBalanceWalletRoundedIcon />  ₹{wallet.balance}
      </Typography>
      <Card sx={{ m: 2 }}>
        <CardContent>
          <Typography variant="h6">
            Transaction History
          </Typography>
          <Grid container spacing={1} marginTop={2}>
            {transactions?.map((transaction) => (
              <Grid item xs={12} sm={6} md={4} key={transaction._id}>
                <Card sx={{ width: 340 }}>
                  <CardContent>
                    <Stack direction={'row'} >
                      <Box>
                        <Typography variant="body2">{transaction.description}</Typography>
                          {transaction.orderId ?
                        <Typography variant="caption" color="textSecondary">
                          Order ID: {transaction.orderId}
                        </Typography>:<></>}
                      </Box>
                      <Box sx={{ ml: 'auto' }}>
                        <Typography
                          variant="body2"
                          color={transaction.type === 'debit' ? "error" : "success"}
                        >
                          {transaction.type === 'debit' ? "-" : "+"} ₹{Math.abs(transaction.amount)}
                        </Typography>
                        <Typography 
                        variant='caption'
                        color='#d3d3d3'
                        >
                          ₹{transaction.balanceAmount}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
