import { Paper, Box, Typography, Tooltip } from '@mui/material'
import * as React from 'react';
import HistoryIcon from '@mui/icons-material/History';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import {
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import AccountDetails from '../components/AccountDetails';
import AddPayForm from '../components/AddPayForm';

const paymentRows = [
  {
    "username": "Alice Johnson",
    "balance": 150.25,
    "id": "1"
  },
  {
    "username": "Bob Smith",
    "balance": 1200.50,
    "id": "2"
  },
  {
    "username": "Charlie Davis",
    "balance": 87.40,
    "id": "3"
  },
  {
    "username": "Diana Moore",
    "balance": 405.00,
    "id": "4"
  },
  {
    "username": "Edward Brown",
    "balance": 935.75,
    "id": "5"
  }
];

const historyCols = [
  { field: 'paymentDate', headerName: 'Payment Date', type: 'date', width: 125, 
    valueFormatter: ( value) => {
    if (!value) return '';
    const date = new Date(value);
    return `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('en-US', {
      month: 'short',
    })}-${date.getFullYear()}`;
  }, },
  { field: 'amount', headerName: 'Amount', width: 80 },
  { field: 'accountNo', headerName: 'AccountNo', width: 125 },
  { field: 'upi', headerName: 'UPI', width: 125 },
  { field: 'mode', headerName: 'Mode', width: 80 },
]

const historyRow = [
{
  "paymentDate": "2024-12-01",
  "amount": 500.00,
  "accountNo": "1234567890",
  "upi": null,
  "mode": "CDM",
  "id":10
},
{
  "paymentDate": "2024-12-02",
  "amount": 1200.50,
  "accountNo": null,
  "upi": "alice@upi",
  "mode": "UPI",
  "id":20
},
{
  "paymentDate": "2024-12-03",
  "amount": 750.00,
  "accountNo": "9876543210",
  "upi": null,
  "mode": "IMPS",
  "id":30
},
{
  "paymentDate": "2024-12-04",
  "amount": 300.75,
  "accountNo": null,
  "upi": "bob@upi",
  "mode": "UPI",
  "id":40
},
{
  "paymentDate": "2024-12-05",
  "amount": 1000.00,
  "accountNo": "1122334455",
  "upi": null,
  "mode": "CDM",
  "id":50
}
]

const accountDetails = {
  accountNo: "1234567890",
  ifsc: "HDFC0001234",
  accountName: "John Doe",
  upi: "john@upi",
};

export default function Payment() {
  const columns = [
    { field: 'username', headerName: 'User Name', width: 125 },
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
            onClick={handleDetailsClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Tooltip title="Add Payment"><CreditScoreIcon color='primary' /></Tooltip>}
            label="Pay"
            onClick={handlePayClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [isHistoryClicked, setIsHistoryClicked] = React.useState(false);
  
  const handleHistoryClick = (id) => () => {
    setIsHistoryClicked(true);
  };
  const handleDetailsClick = (id) => () => { 
    setIsHistoryClicked(false);
    setDialogOpen(true)
  };

  const handlePayClick = (id) => () => {
    setPayFormOpen(true)
   };

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleClose = () => setDialogOpen(false);
  
  const [payFormOpen, setPayFormOpen] = React.useState(false);
  const handlPayFormeClose = () => setPayFormOpen(false);

  return (
    <Paper sx={{ height: 310, m: 1, width: '99%' }}>
      <DataGrid
        rowHeight={40}
        rows={paymentRows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
      />
      {isHistoryClicked ? (<Box><Typography sx={{ml:1, mt:1}}>History</Typography><DataGrid
        rowHeight={30}
        rows={historyRow}
        columns={historyCols}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
      /></Box>) : (<></>) }
      <AccountDetails 
      open={dialogOpen}
      onClose={handleClose}
      accountDetails={accountDetails}
      />
      <AddPayForm
      open={payFormOpen}
      onClose={handlPayFormeClose}
      />

    </Paper>
  );
}
