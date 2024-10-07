import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import { accessConstent, domainBase } from '../../helpingFile';
import PaymentIcon from '@mui/icons-material/Payment'; // Icon for UPI
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Icon for eWallet
import CountUp from 'react-countup';
const WalletDetails = () => {
  const [upiBalance, setUpiBalance] = useState(0);
  const [eWalletBalance, setEWalletBalance] = useState(0);
  const token = localStorage.getItem(accessConstent);
  const API_ENDPOINT_UPI = `${domainBase}apiUser/v1/wallet/upiWalletTrx`;
  const API_ENDPOINT_EWALLET = `${domainBase}apiUser/v1/wallet/eWalletTrx`;

  // Fetch UPI Wallet Transactions
  const fetchUpiWalletData = async () => {
    try {
      const response = await axios.get(API_ENDPOINT_UPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('UPI Wallet Response:', response.data);
      if (Array.isArray(response.data.data)) {
        const totalAmount = response.data.data.reduce(
          (total, trx) => total + trx.transactionAmount,
          0
        );
        setUpiBalance(totalAmount);
      } else {
        console.error('UPI wallet data is not in the expected format.');
      }
    } catch (error) {
      console.error('Error fetching UPI wallet data:', error);
    }
  };

  // Fetch E-Wallet Transactions
  const fetchEWalletData = async () => {
    try {
      const response = await axios.get(API_ENDPOINT_EWALLET, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('E-Wallet Response:', response.data);
      if (Array.isArray(response.data.data)) {
        const totalAmount = response.data.data.reduce(
          (total, trx) => total + trx.transactionAmount,
          0
        );
        setEWalletBalance(totalAmount);
      } else {
        console.error('E-Wallet data is not in the expected format.');
      }
    } catch (error) {
      console.error('Error fetching E-Wallet data:', error);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchUpiWalletData();
    fetchEWalletData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="static" sx={{borderRadius:'10px',background: 'linear-gradient(45deg, #00000073, #2196f3a3) !important',}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Wallet Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Grid Layout for Cards */}
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* E-Wallet Balance */}
        <Grid item xs={6}>
          <Paper
            className="clrchnge"
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
              '&:hover': {
                transform: 'scale(1.05)', // Increased scale on hover
                transition: 'transform 0.2s ease-in-out',textAlign:'center',
              },
            }}
          >
            <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={8}>
            <Box
              sx={{
                // display: 'flex',
                // justifyContent: 'space-between',
                // alignItems: 'center',

              }}
            >
              <Typography variant="h6">Total E-Wallet Balance</Typography>
              ₹<CountUp end={eWalletBalance} duration={2.5}/>
              {/* Increased icon size */}
            </Box>
            </Grid>
            <Grid item xs={4}>
           
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
             <AccountBalanceWalletIcon sx={{ fontSize: 48, marginLeft: 1 }} />{' '}
            </Typography>
            </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* UPI Wallet Balance */}
        <Grid item xs={6}>
          <Paper
            className="clrchnge"
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
              '&:hover': {
                transform: 'scale(1.05)', // Increased scale on hover
                transition: 'transform 0.2s ease-in-out', textAlign:'center',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Total UPI Wallet Balance</Typography>
              <PaymentIcon sx={{ fontSize: 48, marginLeft: 1 }} />{' '}
              {/* Increased icon size */}
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              ₹<CountUp end={upiBalance} duration={2.5}/>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WalletDetails;
