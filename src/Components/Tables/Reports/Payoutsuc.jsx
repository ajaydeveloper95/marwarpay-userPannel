import  { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Grid, Pagination,  } from '@mui/material';
import axios from 'axios';
import { accessConstent, domainBase } from '../../../helpingFile';



const PayoutSuccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [payoutData, setPayoutData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  // Filter and Pagination state
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const API_ENDPOINT = `${domainBase}apiUser/v1/payout/getAllPayOutSuccess`;
  const token = localStorage.getItem(accessConstent);
  const totalAmount = filteredData.reduce((total, payout) => total + payout.amount, 0);
  const totalCharges = filteredData.reduce((total, payout) => total + payout.chargeAmount, 0);
  useEffect(() => {
    
   

    axios.get(API_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setPayoutData(response.data.data || []);
        setFilteredData(response.data.data || []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the payout data!', error);
        setIsLoading(false);
      });
  }, []);

  // Filter function
  const handleFilter = () => {
    let filtered = payoutData;

    if (searchName) {
      filtered = filtered.filter(payout => payout.userInfo.memberId.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (searchDate) {
      const filterDate = new Date(searchDate).toISOString().split('T')[0];
      filtered = filtered.filter(payout => new Date(payout.createdAt).toISOString().split('T')[0] === filterDate);
    }

    setFilteredData(filtered);
    setPage(1); // Reset to first page
  };

  // Reset filters
  const handleReset = () => {
    setSearchName('');
    setSearchDate('');
    setFilteredData(payoutData);
    setPage(1); // Reset to first page
  };

  // View All function
  const handleViewAll = () => {
    setFilteredData(payoutData);
    setSearchName('');
    setSearchDate('');
    setPage(1); // Reset to first page
  };

  // Pagination handler
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  // Ensure paginatedData is an array
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
     
        <Grid container alignItems="center" sx={{ mb: 2 }}>
         
          <Grid item xs>
            <Typography variant="h5" gutterBottom>Payout Success Information</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Search by Name"
              variant="outlined"
              fullWidth
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                handleFilter();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Search by Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                handleFilter();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} container alignItems="center">
            <Button variant="outlined" fullWidth onClick={handleReset} sx={{ mr: 2 }}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={12} sm={3} container alignItems="center">
            <Button variant="outlined" fullWidth onClick={handleViewAll}>
              View All
            </Button>
          </Grid>
        </Grid>
        
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Total Amount: {totalAmount}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Total Charges: {totalCharges}</Typography>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', p: 1 }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>#</strong></TableCell>
                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Member ID</strong></TableCell>
                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Transaction ID</strong></TableCell>
                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Amount</strong></TableCell>
                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Charge Amount</strong></TableCell>
                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Final Amount</strong></TableCell>
                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Bank RRN</strong></TableCell>
                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Success Status</strong></TableCell>
                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ padding: '16px' }}>
                    <Typography variant="h6">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((payout, index) => (
                  <TableRow key={payout._id}>
                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{payout.userInfo.memberId}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{payout.trxId}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{payout.amount}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{payout.chargeAmount}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{payout.finalAmount}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{payout.bankRRN}</TableCell>
                    <TableCell
                      sx={{
                        border: '1px solid #ddd',
                        padding: '8px',
                        color: payout.isSuccess === 'Success' ? 'green' : 'red'
                      }}
                    >
                      {payout.isSuccess}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{new Date(payout.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            hideNextButton={filteredData.length === 0}
            hidePrevButton={filteredData.length === 0}
          />
        </Grid>
      
    </div>
  );
};

export default PayoutSuccess;
