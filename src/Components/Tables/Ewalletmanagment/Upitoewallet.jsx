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
  IconButton,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import { apiGet } from '../../../api/apiMethods';

const UPIToEwallet = () => {
  const [ewalletData, setEwalletData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const [searchAmount, setSearchAmount] = useState('');
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [viewAll, setViewAll] = useState(false);
  const API_ENDPOINT = `apiUser/v1/wallet/upiToEwalletTrx`;

  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    apiGet(API_ENDPOINT)
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

  const handleFilter = () => {
    let filtered = ewalletData.filter((item) => {
      const matchesAmount = searchAmount ? item.transactionAmount === parseFloat(searchAmount) : true;

      const trxDate = new Date(item.createdAt);
      trxDate.setHours(0, 0, 0, 0);

      const startDate = searchStartDate ? new Date(searchStartDate) : null;
      const endDate = searchEndDate ? new Date(searchEndDate) : null;

      if (startDate) startDate.setHours(0, 0, 0, 0);
      if (endDate) endDate.setHours(23, 59, 59, 999);

      const isStartDateOnly = startDate && !endDate && trxDate.getTime() === startDate.getTime();
      const isWithinDateRange =
        startDate && endDate && trxDate >= startDate && trxDate <= endDate;

      return matchesAmount && (!startDate && !endDate || isStartDateOnly || isWithinDateRange);
    });
    setFilteredData(filtered);
    setPage(1); 
    setViewAll(false);
  };

  useEffect(() => {
    handleFilter();
  }, [searchAmount, searchStartDate, searchEndDate]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleReset = () => {
    setSearchAmount('');
    setSearchStartDate('');
    setSearchEndDate('');
    setFilteredData(ewalletData);
    setPage(1);
    setViewAll(false);
  };

  const totalBalance = filteredData.reduce((acc, trx) => acc + trx.transactionAmount, 0).toFixed(2);
  const totalTransactions = filteredData.length;

  const paginatedData = viewAll ? filteredData : filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleExportData = () => {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const csvRows = [
      ['#', 'Type', 'Amount', 'Before Amount', 'After Amount', 'Status', 'Date'],
      ...filteredData.map((item, index) => [
        index + 1,
        item.transactionType || 'NA',
        item.transactionAmount || 'NA',
        item.beforeAmount || 'NA',
        item.afterAmount || 'NA',
        item.transactionStatus || 'NA',
        dateFormatter.format(new Date(item.createdAt)),
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'UPI_TO_EWALLET.csv');
  };

  return (
    <>
      <Grid
        sx={{
          mb: 3,
          position: isSmallScreen ? 'relative' : 'sticky',
          top: isSmallScreen ? 'auto' : 0,
          zIndex: 1000,
          paddingTop: '20px',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
        className="setdesigntofix"
      >
        <Grid container alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>UPI to E-Wallet Transactions</Typography>
          </Grid>
          <Button variant="contained" onClick={handleExportData}>Export</Button>
        </Grid>

        {/* Total Balance and Number of Transactions */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ bgcolor: '#f5f5f5', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" component="div">Total Balance</Typography>
                <Typography variant="h4" component="div" sx={{ mt: 1, color: '#4caf50' }}>₹{totalBalance}</Typography>
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
                handleFilter();
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
                handleFilter();
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
                handleFilter();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} container alignItems="center">
            <Grid item xs={6} sm={6}>
              <Button variant="outlined" onClick={handleReset} sx={{ mr: 2 }}>Reset</Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button variant="outlined" onClick={() => setViewAll(!viewAll)} sx={{ mr: 2 }}>
                {viewAll ? 'Paginated' : 'View All'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', p: 1 }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>#</strong></TableCell>
              <TableCell align="center"><strong>Type</strong></TableCell>
              <TableCell align="center"><strong>Amount</strong></TableCell>
              <TableCell align="center"><strong>Before Amount</strong></TableCell>
              <TableCell align="center"><strong>After Amount</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Date</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan="8" align="center">No Data Found</TableCell>
              </TableRow>
            ) : (
              paginatedData.map((trx, index) => (
                <TableRow key={trx._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center" sx={{color: trx.transactionType === 'Cr.' ? 'green' : trx.transactionType === 'Dr.' ? 'red' : 'inherit' }}>{trx.transactionType}</TableCell>
                  <TableCell align="center">₹{trx.transactionAmount ? trx.transactionAmount.toFixed(2) : '0.00'}</TableCell>
                  <TableCell align="center">₹{trx.beforeAmount ? trx.beforeAmount.toFixed(2) : '0.00'}</TableCell>
                  <TableCell align="center">₹{trx.afterAmount ? trx.afterAmount.toFixed(2) : '0.00'}</TableCell>
                  <TableCell align="center" sx={{color: trx.transactionStatus === 'Success' ? 'green' : 'red'}}>{trx.transactionStatus}</TableCell>
                  <TableCell align="center">{new Date(trx.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleModal(trx)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Transaction Details</DialogTitle>
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
                   <TableCell sx={{color: selectedTicket.transactionType === 'Cr.' ? 'green' : selectedTicket.transactionType === 'Dr.' ? 'red' : 'inherit' }}>{selectedTicket.transactionType}</TableCell>
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
          <Button onClick={() => setOpenModal(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

    
       {!viewAll && (
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            // color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Grid>
      )}
     
   
    </>
  );
};

export default UPIToEwallet;
