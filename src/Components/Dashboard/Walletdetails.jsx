import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import CountUp from 'react-countup'; // Assuming you're using CountUp for animation
import { accessConstent, domainBase } from '../../helpingFile';

const WalletDetails = () => {
  const [EwalletBalance, setEwalletBalance] = useState(0);
  const [upiWalletBalance, setUpiWalletBalance] = useState(0);

  const token = localStorage.getItem(accessConstent);
  const API_ENDPOINT_UPI = `${domainBase}/apiUser/v1/userRoute/userInfo`;

  // Fetch UPI Wallet Transactions
  const fetchUpiWalletData = async () => {
    try {
      const response = await axios.get(API_ENDPOINT_UPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { EwalletBalance, upiWalletBalance } = response.data.data;
      setEwalletBalance(EwalletBalance);
      setUpiWalletBalance(upiWalletBalance);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchUpiWalletData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="static" sx={{borderRadius:'10px',background: 'linear-gradient(45deg, #00000073, #2196f3a3) !important',}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Wallet
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Grid Layout for Cards */}
      <Grid container spacing={3} sx={{ padding: 0.5,marginTop:0.5,marginBottom:3 }}>
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
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
                textAlign: 'center',
              },
            }}
          >
            <Grid container spacing={3} sx={{ padding: 0 }}>
              <Grid item xs={8}>
                <Box>
                  <Typography variant="h6">Total E-Wallet Balance</Typography>
                  <Typography variant="body1">
                    ₹<CountUp end={EwalletBalance} decimals={2} duration={2.5} />
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <img src="/images/ewallet.png" style={{ width: '50%' }} alt="E-Wallet" />
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
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
                textAlign: 'center',
              },
            }}
          >
            <Grid container spacing={3} sx={{ padding: 0 }}>
              <Grid item xs={8}>
                <Box sx={{ fontWeight: 'bold' }}>
                  <Typography variant="h6">Total UPI Wallet Balance</Typography>
                  <Typography variant="body1">
                    ₹<CountUp end={upiWalletBalance} decimals={2} duration={2.5} />
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <img src="/images/wallet.png" style={{ width: '50%' }} alt="UPI Wallet" />
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WalletDetails;
