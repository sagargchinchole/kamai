import { Paper, Box, Typography, Tooltip } from '@mui/material'
import * as React from 'react';
import HistoryIcon from '@mui/icons-material/History';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import AccountDetails from '../components/AccountDetails';
import AddPayForm from '../components/AddPayForm';
import axios from 'axios';

export default function Payment() {
  const [wallets, setWallets] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
  const historyCols = [
    {
      field: 'date', headerName: 'Payment Date', type: 'date', width: 125,
      valueFormatter: (value) => {
        if (!value) return '';
        const date = new Date(value);
        return `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('en-IN', {
          month: 'short',
        })}-${date.getFullYear()}`;
      },
    },
    { field: 'amount', headerName: 'Amount', width: 80 },
    { field: 'accountNo', headerName: 'AccountNo', width: 125 },
    { field: 'upi', headerName: 'UPI', width: 125 },
    { field: 'paymentMode', headerName: 'Mode', width: 80 },
    { field: 'description', headerName: 'Description', width: 125 },
    ,
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<Tooltip title="Delete Transaction"><DeleteIcon color='primary' /></Tooltip>}
              label="History"
              className="textPrimary"
              onClick={()=>handleDeleteTransaction(id)}
              color="inherit"
            />
          ];
        },
      },
  ];
  
  const handleDeleteTransaction = async (id) => {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/wallets/transactions`,
      {
        data: { id: currentWalletId, transactionId: id },
        headers: { Authorization: `Bearer ${token}` },
      });
      if(response.status === 200)
      {
        alert(response.data.message);
      }
      else
      {
        alert("Something went wrong..")
      }
  };
  
  const columns = [
    { field: 'userName', headerName: 'User Name', width: 125 },
    {
      field: 'balance', headerName: 'Balance', type: 'number', width: 125,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Tooltip title="Payment History"><HistoryIcon color='primary' /></Tooltip>}
            label="History"
            className="textPrimary"
            onClick={handleHistoryClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Tooltip title="Show Account Details"><AccountBalanceIcon color='primary' /></Tooltip>}
            label="Account Details"
            onClick={() => handleDetailsClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Tooltip title="Add Payment"><CreditScoreIcon color='primary' /></Tooltip>}
            label="Pay"
            onClick={() => handlePayClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [isHistoryClicked, setIsHistoryClicked] = React.useState(false);
  const [currentWalletId, setCurrentWalletId] = React.useState('');
  const [currentUserId, setCurrentUserId] = React.useState('');

  const handleHistoryClick = (id) => async () => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/wallets/transactions`,
      { id }, { headers: { Authorization: `Bearer ${token}` } });
    setTransactions(response.data.transactions.filter(transaction => transaction.type === 'debit'));
    setIsHistoryClicked(true);
    setCurrentWalletId(id);
  };

  const handleDetailsClick = (id) => {
    setCurrentUserId(id);
    setDialogOpen(true);
  };

  const handlePayClick = (id) => {
    setCurrentWalletId(id);
    setPayFormOpen(true);
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleClose = () => setDialogOpen(false);

  const [payFormOpen, setPayFormOpen] = React.useState(false);
  const handlPayFormeClose = () => setPayFormOpen(false);

  const token = localStorage.getItem('token');
  React.useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/wallets/all`,
          { headers: { Authorization: `Bearer ${token}` } });
        setWallets(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWallets();
  }, []);

  return (
    <Paper sx={{ height: 310, m: 1, width: '99%' }}>
      <DataGrid
        rowHeight={40}
        rows={wallets}
        columns={columns}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
      />
      {isHistoryClicked ? (
        <Box>
          <Typography sx={{ ml: 1, mt: 1 }}>History</Typography>
          <DataGrid
            rowHeight={30}
            rows={transactions}
            columns={historyCols}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            getRowId={(row) => row._id}
          /></Box>) : (<></>)}
      <AccountDetails
        id={currentUserId}
        open={dialogOpen}
        onClose={handleClose}
      />
      <AddPayForm
        id={currentWalletId}
        open={payFormOpen}
        onClose={handlPayFormeClose}
      />
    </Paper>
  );
}
