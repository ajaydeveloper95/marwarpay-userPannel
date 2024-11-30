import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid,
  Pagination,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions
} from '@mui/material';
import axios from 'axios';
import { accessConstent, domainBase } from '../../../helpingFile';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

const Mywallet = () => {
  const [ewalletData, setEwalletData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Filter and Pagination state
  const [searchAmount, setSearchAmount] = useState('');
  const [searchStartDate, setSearchStartDate] = useState(''); 
  const [searchEndDate, setSearchEndDate] = useState(''); 
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [viewAll, setViewAll] = useState(false);
  const API_ENDPOINT = `${domainBase}apiUser/v1/wallet/eWalletTrx`;
  const token = localStorage.getItem(accessConstent);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  useEffect(() => {
    axios.get(API_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setEwalletData(response.data.data);
        setFilteredData(response.data.data);
       
      })
      .catch(error => {
        console.error('There was an error fetching the eWallet data!', error);
       
      });
  }, []);


  const handleModal = (ticket = null) => {
    setSelectedTicket(ticket);
    setOpenModal(!!ticket);
  };

 
  // Filter function
  const handleFilter = () => {
    let filtered = ewalletData.filter((item) => {
      const matchesAmount = searchAmount ? item.transactionAmount === parseFloat(searchAmount) : true;

      const trxDate = new Date(item.createdAt);
      trxDate.setHours(0, 0, 0, 0); // Normalize to midnight for accurate date comparison

      const startDate = searchStartDate ? new Date(searchStartDate) : null;
    const endDate = searchEndDate ? new Date(searchEndDate) : null;

    if (startDate) startDate.setHours(0, 0, 0, 0);
    if (endDate) endDate.setHours(23, 59, 59, 999); // Inclusive of the entire end day

    // Date filter logic
    const isStartDateOnly = startDate && !endDate && trxDate.getTime() === startDate.getTime();
    const isWithinDateRange =
      startDate && endDate && trxDate >= startDate && trxDate <= endDate;

      return matchesAmount && (!startDate && !endDate || isStartDateOnly || isWithinDateRange);
  });
  setFilteredData(filtered);
  setPage(1); // Reset to the first page when filtering
  setViewAll(false); 
};
useEffect(() => {
  handleFilter(); // Call filter function on state changes
}, [searchAmount, searchStartDate, searchEndDate]);

  // Reset filters
  const handleReset = () => {
    setSearchAmount('');
    setSearchStartDate(''); // Reset start date
    setSearchEndDate(''); // Reset end date
    setFilteredData(ewalletData);
    setPage(1);
    setViewAll(false);
  };

  // Pagination handler
  const handlePageChange = (event, value) => {
    setPage(value);
  };

 
 
  // Calculate total balance and number of transactions
  const totalBalance = filteredData.reduce((acc, trx) => acc + trx.transactionAmount, 0).toFixed(2);
  const totalTransactions = filteredData.length;

  // Paginated data
  const paginatedData = viewAll ? filteredData : filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
    <Grid sx={{
    mb: 3,
    position: 'sticky', 
    top: 0,             
    zIndex: 1000, 
    paddingTop:'20px',
    overflow:'hidden' ,     
    backgroundColor: 'white', 
  }}>
      <Grid container alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs>
          <Typography variant="h4" gutterBottom>E-Wallet Transactions</Typography>
        </Grid>
      </Grid>

      {/* Total Balance and Number of Transactions */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ bgcolor: '#f5f5f5', borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" component="div">Total Balance</Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1, color: '#4caf50' }}>₹{Number(totalBalance).toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ bgcolor: '#f5f5f5', borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" component="div">Total Transactions</Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>{totalTransactions}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Search by Amount"
            type="number"
            variant="outlined"
            fullWidth
            value={searchAmount}
            onChange={(e) => {
              setSearchAmount(e.target.value);
              handleFilter(); // Call filter on change
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={searchStartDate}
            onChange={(e) => {
              setSearchStartDate(e.target.value);
              handleFilter(); // Call filter on change
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={searchEndDate}
            onChange={(e) => {
              setSearchEndDate(e.target.value);
              handleFilter(); // Call filter on change
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} container alignItems="center">
          <Button variant="outlined" fullWidth onClick={handleReset} sx={{ mr: 2 }}>
            Reset
          </Button>
        </Grid>
      </Grid>
</Grid>
      <TableContainer component={Paper} sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', p: 1 }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>#</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Type</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Amount</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Before Amount</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>After Amount</strong></TableCell>
              
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Status</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Date</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Action</strong></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">No data available</TableCell>
              </TableRow>
            ) : (
              paginatedData.map((trx, index) => (
                <TableRow key={index}>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', color: trx.transactionType === 'Cr.' ? 'green' : trx.transactionType === 'Dr.' ? 'red' : 'inherit' }}>{trx.transactionType}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{trx.transactionAmount}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{trx.beforeAmount}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{trx.afterAmount}</TableCell>
                
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', color: trx.transactionStatus === 'Success' ? 'green' : 'red'}}>{trx.transactionStatus}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{new Date(trx.createdAt).toLocaleString()}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                    <IconButton onClick={() => handleModal(trx)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredData.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
      />
       <Dialog open={openModal} onClose={() => handleModal(null)} maxWidth="md" fullWidth>
        <DialogTitle>E-Wallet Details</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Field</strong></TableCell>
                    <TableCell><strong>Details</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 
                  <TableRow>
                    <TableCell><strong>Transaction Type</strong></TableCell>
                    <TableCell>{selectedTicket.transactionType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Transaction Amount</strong></TableCell>
                    <TableCell>{Number(selectedTicket.transactionAmount).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Before Amount</strong></TableCell>
                    <TableCell>{Number(selectedTicket.beforeAmount).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>After Amount</strong></TableCell>
                    <TableCell>{Number(selectedTicket.afterAmount).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell>{selectedTicket.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Transaction Status</strong></TableCell>
                    <TableCell sx={{color: selectedTicket.transactionStatus === 'Success' ? 'green' : 'red'}}>{selectedTicket.transactionStatus}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Initiate At</strong></TableCell>
                    <TableCell>{new Date(selectedTicket.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Success At</strong></TableCell>
                    <TableCell>{new Date(selectedTicket.updatedAt).toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModal(null)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Mywallet;
